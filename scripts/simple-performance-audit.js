#!/usr/bin/env node

/**
 * Simplified Performance Audit Script
 * 
 * This script runs basic performance checks and generates a report
 * without requiring Lighthouse or Chrome dependencies.
 * 
 * Usage:
 * - Run a development server first (npm run dev)
 * - Then run: node scripts/simple-performance-audit.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BUDGET_FILE = path.join(process.cwd(), 'lighthouse-budget.json');
const REPORT_DIR = path.join(process.cwd(), 'reports');
const DIST_DIR = path.join(process.cwd(), 'dist');

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// Format timestamp for filename
const getTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
};

// Helper function to format file sizes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Analyze bundle size
function analyzeBundleSize() {
  console.log('\n📊 Bundle Size Analysis');
  console.log('='.repeat(50));

  if (!fs.existsSync(DIST_DIR)) {
    console.log('❌ Dist directory not found. Run "npm run build" first.');
    return null;
  }

  const analysis = {
    totalSize: 0,
    jsSize: 0,
    cssSize: 0,
    imageSize: 0,
    fontSize: 0,
    files: []
  };

  function analyzeDirectory(dir, relativePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const fullRelativePath = path.join(relativePath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath, fullRelativePath);
      } else {
        const size = stat.size;
        analysis.totalSize += size;
        
        const ext = path.extname(file).toLowerCase();
        if (['.js', '.mjs'].includes(ext)) {
          analysis.jsSize += size;
        } else if (['.css'].includes(ext)) {
          analysis.cssSize += size;
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'].includes(ext)) {
          analysis.imageSize += size;
        } else if (['.woff', '.woff2', '.ttf', '.eot', '.otf'].includes(ext)) {
          analysis.fontSize += size;
        }
        
        analysis.files.push({
          path: fullRelativePath,
          size: size,
          type: ext.slice(1) || 'other'
        });
      }
    });
  }

  analyzeDirectory(DIST_DIR);

  // Sort files by size (largest first)
  analysis.files.sort((a, b) => b.size - a.size);

  console.log(`📁 Total bundle size: ${formatBytes(analysis.totalSize)}`);
  console.log(`📜 JavaScript: ${formatBytes(analysis.jsSize)}`);
  console.log(`🎨 CSS: ${formatBytes(analysis.cssSize)}`);
  console.log(`🖼️ Images: ${formatBytes(analysis.imageSize)}`);
  console.log(`🔤 Fonts: ${formatBytes(analysis.fontSize)}`);

  // Show largest files
  console.log('\n🔍 Largest files:');
  analysis.files.slice(0, 10).forEach((file, index) => {
    console.log(`  ${index + 1}. ${file.path} - ${formatBytes(file.size)}`);
  });

  return analysis;
}

// Check performance budget
function checkPerformanceBudget(analysis) {
  if (!analysis) return;

  console.log('\n💰 Performance Budget Check');
  console.log('='.repeat(50));

  if (!fs.existsSync(BUDGET_FILE)) {
    console.log('⚠️ No performance budget file found.');
    return;
  }

  try {
    const budget = JSON.parse(fs.readFileSync(BUDGET_FILE, 'utf8'));
    const resourceBudgets = budget.resources || [];
    
    let budgetPassed = true;

    resourceBudgets.forEach(resourceBudget => {
      const { resourceType, budget: limit } = resourceBudget;
      let actualSize = 0;
      let status = '✅';

      switch (resourceType) {
        case 'script':
          actualSize = analysis.jsSize;
          break;
        case 'stylesheet':
          actualSize = analysis.cssSize;
          break;
        case 'image':
          actualSize = analysis.imageSize;
          break;
        case 'font':
          actualSize = analysis.fontSize;
          break;
        case 'total':
          actualSize = analysis.totalSize;
          break;
        default:
          return;
      }

      const limitBytes = limit * 1024; // Budget is in KB
      if (actualSize > limitBytes) {
        status = '❌';
        budgetPassed = false;
      }

      const percentage = ((actualSize / limitBytes) * 100).toFixed(1);
      console.log(`${status} ${resourceType}: ${formatBytes(actualSize)} / ${formatBytes(limitBytes)} (${percentage}%)`);
    });

    if (budgetPassed) {
      console.log('\n🎉 All performance budgets passed!');
    } else {
      console.log('\n⚠️ Some performance budgets exceeded!');
    }

  } catch (error) {
    console.log(`❌ Error reading budget file: ${error.message}`);
  }
}

// Generate performance report
function generateReport(analysis) {
  const timestamp = getTimestamp();
  const reportPath = path.join(REPORT_DIR, `performance-report-${timestamp}.json`);
  
  const report = {
    timestamp: new Date().toISOString(),
    bundleAnalysis: analysis,
    recommendations: generateRecommendations(analysis)
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📋 Report saved to: ${reportPath}`);
}

// Generate performance recommendations
function generateRecommendations(analysis) {
  const recommendations = [];

  if (analysis.jsSize > 300 * 1024) { // 300KB
    recommendations.push({
      type: 'warning',
      message: 'JavaScript bundle is large. Consider code splitting and lazy loading.',
      priority: 'high'
    });
  }

  if (analysis.cssSize > 50 * 1024) { // 50KB
    recommendations.push({
      type: 'warning',
      message: 'CSS bundle is large. Consider critical CSS extraction.',
      priority: 'medium'
    });
  }

  if (analysis.imageSize > 500 * 1024) { // 500KB
    recommendations.push({
      type: 'info',
      message: 'Consider optimizing images with next-gen formats (WebP, AVIF).',
      priority: 'medium'
    });
  }

  const largeJSFiles = analysis.files.filter(f => 
    ['js', 'mjs'].includes(f.type) && f.size > 100 * 1024
  );

  if (largeJSFiles.length > 0) {
    recommendations.push({
      type: 'info',
      message: `Large JS files detected: ${largeJSFiles.map(f => f.path).join(', ')}`,
      priority: 'medium'
    });
  }

  return recommendations;
}

// Main execution
async function main() {
  console.log('🚀 Starting Performance Audit...');
  console.log('=' .repeat(50));

  try {
    const analysis = analyzeBundleSize();
    checkPerformanceBudget(analysis);
    generateReport(analysis);
    
    console.log('\n✅ Performance audit completed!');
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

// Run the audit
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { analyzeBundleSize, checkPerformanceBudget, generateReport };
