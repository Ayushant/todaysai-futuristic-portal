#!/usr/bin/env node

/**
 * Performance Audit Script
 * 
 * This script runs automated performance audits using Lighthouse
 * and reports the results in a format that can be integrated into CI/CD pipelines.
 * 
 * Usage:
 * - Run a development server first (npm run dev)
 * - Then run: node scripts/performance-audit.js
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Configuration
const BUDGET_FILE = path.join(process.cwd(), 'lighthouse-budget.json');
const REPORT_DIR = path.join(process.cwd(), 'reports');
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// Format timestamp for filename
const getTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
};

async function runLighthouse() {
  console.log(chalk.blue('🚀 Starting performance audit with Lighthouse...'));
  console.log(chalk.gray(`Target URL: ${URL}`));

  try {
    // Check if a budget file exists
    let budgetConfig = [];
    if (fs.existsSync(BUDGET_FILE)) {
      console.log(chalk.gray('Using performance budget from lighthouse-budget.json'));
      const budgetContent = fs.readFileSync(BUDGET_FILE, 'utf8');
      budgetConfig = JSON.parse(budgetContent);
    } else {
      console.log(chalk.yellow('⚠️ No performance budget file found. Skipping budget checks.'));
    }

    // Launch Chrome
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    // Configure Lighthouse
    const options = {
      logLevel: 'info',
      output: 'html',
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      settings: {
        formFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        // Add budget if available
        budgets: budgetConfig.length > 0 ? budgetConfig : undefined
      }
    };

    // Run Lighthouse
    console.log(chalk.gray('Running Lighthouse audit...'));
    const runnerResult = await lighthouse(URL, options);

    // Generate report
    const timestamp = getTimestamp();
    const reportPath = path.join(REPORT_DIR, `lighthouse-report-${timestamp}.html`);
    const jsonReportPath = path.join(REPORT_DIR, `lighthouse-report-${timestamp}.json`);
    
    // Save HTML report
    fs.writeFileSync(reportPath, runnerResult.report);
    console.log(chalk.green(`✅ HTML Report saved to: ${reportPath}`));
    
    // Save JSON data for CI/CD integration
    fs.writeFileSync(jsonReportPath, JSON.stringify(runnerResult.lhr, null, 2));
    console.log(chalk.green(`✅ JSON data saved to: ${jsonReportPath}`));

    // Display summary
    const scores = {
      performance: runnerResult.lhr.categories.performance.score * 100,
      accessibility: runnerResult.lhr.categories.accessibility.score * 100,
      bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
      seo: runnerResult.lhr.categories.seo.score * 100,
    };

    console.log('\n📊 Performance Audit Results:');
    console.log('---------------------------');
    console.log(`🚀 Performance:    ${formatScore(scores.performance)}`);
    console.log(`♿ Accessibility:  ${formatScore(scores.accessibility)}`);
    console.log(`🔧 Best Practices: ${formatScore(scores.bestPractices)}`);
    console.log(`🔍 SEO:            ${formatScore(scores.seo)}`);
    console.log('---------------------------\n');

    // Check for critical performance issues
    const opportunities = runnerResult.lhr.audits;
    const criticalIssues = Object.values(opportunities)
      .filter(audit => audit.score !== null && audit.score < 0.5 && audit.details?.type === 'opportunity')
      .sort((a, b) => (a.score || 0) - (b.score || 0));

    if (criticalIssues.length > 0) {
      console.log(chalk.yellow('⚠️ Critical Performance Issues to Address:'));
      criticalIssues.slice(0, 5).forEach(issue => {
        console.log(chalk.yellow(`- ${issue.title}: ${issue.description}`));
      });
    }

    // Cleanup
    await chrome.kill();

    // Try to open the report in the default browser on Windows
    try {
      console.log(chalk.blue('\nOpening report in browser...'));
      execSync(`start ${reportPath.replace(/\\/g, '/')}`);
    } catch (error) {
      console.log(chalk.gray('Could not automatically open the report. Please open it manually.'));
    }

    return scores;
  } catch (error) {
    console.error(chalk.red('❌ Error running Lighthouse audit:'), error);
    process.exit(1);
  }
}

// Helper to format scores with colors
function formatScore(score) {
  const roundedScore = Math.round(score);
  if (roundedScore >= 90) {
    return chalk.green(`${roundedScore}/100`);
  } else if (roundedScore >= 50) {
    return chalk.yellow(`${roundedScore}/100`);
  } else {
    return chalk.red(`${roundedScore}/100`);
  }
}

// Run the audit
runLighthouse().catch(error => {
  console.error('Audit failed:', error);
  process.exit(1);
});