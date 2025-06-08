#!/usr/bin/env node

/**
 * Script to check bundle size against a performance budget
 * Run with: node scripts/check-performance-budget.js
 */

const fs = require('fs');
const path = require('path');
// Simple color formatting without chalk dependency
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Configuration
const BUDGET_FILE = path.join(process.cwd(), 'lighthouse-budget.json');
const STATS_FILE = path.join(process.cwd(), 'dist', 'stats.json');

// Helper functions to format file sizes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Main execution
try {  // Read the budget file
  if (!fs.existsSync(BUDGET_FILE)) {
    console.error(colors.red('Error: Performance budget file not found.'));
    console.log(colors.yellow(`Expected at: ${BUDGET_FILE}`));
    console.log(colors.yellow('Run "npm run analyze" first to generate stats.'));
    process.exit(1);
  }

  const budget = JSON.parse(fs.readFileSync(BUDGET_FILE, 'utf8'));
  
  // Read the stats file
  if (!fs.existsSync(STATS_FILE)) {
    console.error(colors.red('Error: Bundle stats file not found.'));
    console.log(colors.yellow(`Expected at: ${STATS_FILE}`));
    console.log(colors.yellow('Run "npm run analyze" first to generate stats.'));
    process.exit(1);
  }
  
  const stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  
  console.log(colors.blue('🔍 Checking bundle size against performance budget...'));
  console.log('');
    // Extract the resource budget limits
  const budgetConfig = budget[0]; // Lighthouse budget is an array
  const resourceBudgets = budgetConfig.resourceSizes || [];
  const scriptBudget = resourceBudgets.find(r => r.resourceType === 'script')?.budget || 0;
  const styleBudget = resourceBudgets.find(r => r.resourceType === 'stylesheet')?.budget || 0;
  const imageBudget = resourceBudgets.find(r => r.resourceType === 'image')?.budget || 0;
  const fontBudget = resourceBudgets.find(r => r.resourceType === 'font')?.budget || 0;
  const totalBudget = resourceBudgets.find(r => r.resourceType === 'total')?.budget || 0;
  
  // Convert KB to bytes for comparison (budget is in KB)
  const scriptBudgetBytes = scriptBudget * 1024;
  const styleBudgetBytes = styleBudget * 1024;
  const imageBudgetBytes = imageBudget * 1024;
  const fontBudgetBytes = fontBudget * 1024;
  const totalBudgetBytes = totalBudget * 1024;
  
  // Calculate total bundle size
  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;
  let imageSize = 0;
  let fontSize = 0;
    // Analyze asset sizes by type
  if (stats.assets) {
    stats.assets.forEach(asset => {
      const size = asset.size;
      totalSize += size;
      
      if (asset.name.endsWith('.js')) {
        jsSize += size;
      } else if (asset.name.endsWith('.css')) {
        cssSize += size;
      } else if (/\.(png|jpe?g|gif|svg|webp)$/.test(asset.name)) {
        imageSize += size;
      } else if (/\.(woff2?|eot|ttf|otf)$/.test(asset.name)) {
        fontSize += size;
      }
    });
  }
  // Check budgets and display results
  console.log(colors.bold('📊 Bundle Size Analysis:'));
  console.log('');
  // JavaScript budget check
  if (scriptBudgetBytes > 0) {
    const jsStatus = jsSize <= scriptBudgetBytes ? colors.green('✓ PASS') : colors.red('✗ FAIL');
    console.log(`${jsStatus} JavaScript: ${formatBytes(jsSize)} (Budget: ${formatBytes(scriptBudgetBytes)})`);
    if (jsSize > scriptBudgetBytes) {
      console.log(colors.red(`  Exceeded by: ${formatBytes(jsSize - scriptBudgetBytes)}`));
    }
  } else {
    console.log(colors.gray(`JavaScript: ${formatBytes(jsSize)} (No budget set)`));
  }

  // CSS budget check
  if (styleBudgetBytes > 0) {
    const cssStatus = cssSize <= styleBudgetBytes ? colors.green('✓ PASS') : colors.red('✗ FAIL');
    console.log(`${cssStatus} CSS: ${formatBytes(cssSize)} (Budget: ${formatBytes(styleBudgetBytes)})`);
    if (cssSize > styleBudgetBytes) {
      console.log(colors.red(`  Exceeded by: ${formatBytes(cssSize - styleBudgetBytes)}`));
    }
  } else {
    console.log(colors.gray(`CSS: ${formatBytes(cssSize)} (No budget set)`));
  }

  // Image budget check
  if (imageBudgetBytes > 0) {
    const imageStatus = imageSize <= imageBudgetBytes ? colors.green('✓ PASS') : colors.red('✗ FAIL');
    console.log(`${imageStatus} Images: ${formatBytes(imageSize)} (Budget: ${formatBytes(imageBudgetBytes)})`);
    if (imageSize > imageBudgetBytes) {
      console.log(colors.red(`  Exceeded by: ${formatBytes(imageSize - imageBudgetBytes)}`));
    }
  } else {
    console.log(colors.gray(`Images: ${formatBytes(imageSize)} (No budget set)`));
  }

  // Font budget check
  if (fontBudgetBytes > 0) {
    const fontStatus = fontSize <= fontBudgetBytes ? colors.green('✓ PASS') : colors.red('✗ FAIL');
    console.log(`${fontStatus} Fonts: ${formatBytes(fontSize)} (Budget: ${formatBytes(fontBudgetBytes)})`);
    if (fontSize > fontBudgetBytes) {
      console.log(colors.red(`  Exceeded by: ${formatBytes(fontSize - fontBudgetBytes)}`));
    }
  } else {
    console.log(colors.gray(`Fonts: ${formatBytes(fontSize)} (No budget set)`));
  }

  // Total budget check
  if (totalBudgetBytes > 0) {
    const totalStatus = totalSize <= totalBudgetBytes ? colors.green('✓ PASS') : colors.red('✗ FAIL');
    console.log('');
    console.log(`${totalStatus} Total Bundle: ${formatBytes(totalSize)} (Budget: ${formatBytes(totalBudgetBytes)})`);
    if (totalSize > totalBudgetBytes) {
      console.log(colors.red(`  Exceeded by: ${formatBytes(totalSize - totalBudgetBytes)}`));
    }
  } else {
    console.log('');
    console.log(colors.gray(`Total Bundle: ${formatBytes(totalSize)} (No budget set)`));
  }

  console.log('');
  // Summary and recommendations
  const budgetExceeded = (scriptBudgetBytes > 0 && jsSize > scriptBudgetBytes) ||
                        (styleBudgetBytes > 0 && cssSize > styleBudgetBytes) ||
                        (imageBudgetBytes > 0 && imageSize > imageBudgetBytes) ||
                        (fontBudgetBytes > 0 && fontSize > fontBudgetBytes) ||
                        (totalBudgetBytes > 0 && totalSize > totalBudgetBytes);

  if (budgetExceeded) {
    console.log(colors.red(colors.bold('⚠️  Performance budget exceeded!')));
    console.log(colors.yellow('Recommendations:'));
    
    if (scriptBudgetBytes > 0 && jsSize > scriptBudgetBytes) {
      console.log(colors.yellow('• Consider code splitting or lazy loading for JavaScript'));
      console.log(colors.yellow('• Remove unused dependencies'));
      console.log(colors.yellow('• Use dynamic imports for non-critical code'));
    }
    
    if (styleBudgetBytes > 0 && cssSize > styleBudgetBytes) {
      console.log(colors.yellow('• Remove unused CSS'));
      console.log(colors.yellow('• Consider CSS-in-JS for component-specific styles'));
    }
    
    if (imageBudgetBytes > 0 && imageSize > imageBudgetBytes) {
      console.log(colors.yellow('• Optimize images (use WebP/AVIF formats)'));
      console.log(colors.yellow('• Implement lazy loading for images'));
      console.log(colors.yellow('• Use responsive images with srcSet'));
    }
    
    if (fontBudgetBytes > 0 && fontSize > fontBudgetBytes) {
      console.log(colors.yellow('• Use font subsetting'));
      console.log(colors.yellow('• Preload critical fonts'));
      console.log(colors.yellow('• Consider system fonts as fallbacks'));
    }
    
    process.exit(1);
  } else {
    console.log(colors.green(colors.bold('✅ All performance budgets are within limits!')));
    console.log(colors.green('Great job maintaining a lean bundle size.'));
  }

} catch (error) {
  console.error(colors.red('Error reading budget or stats files:'), error.message);
  
  // Provide helpful error messages
  if (error.code === 'ENOENT') {
    console.log(colors.yellow('\nTroubleshooting:'));
    console.log(colors.yellow('1. Make sure you have run "npm run build" to generate the dist folder'));
    console.log(colors.yellow('2. Check that lighthouse-budget.json exists in the project root'));
    console.log(colors.yellow('3. For stats.json, you may need to run "npm run analyze" first'));
  }
  
  process.exit(1);
}