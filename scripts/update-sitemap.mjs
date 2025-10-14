#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Expand glob patterns and filter existing files
const expandFilePaths = (filePaths) => {
  const expanded = [];
  for (const filePath of filePaths) {
    if (filePath.includes('**')) {
      // For glob patterns, we'll check if the directory exists
      const baseDir = filePath.split('/**')[0];
      const fullPath = join(__dirname, '..', baseDir);
      if (existsSync(fullPath)) {
        expanded.push(baseDir);
      }
    } else {
      const fullPath = join(__dirname, '..', filePath);
      if (existsSync(fullPath)) {
        expanded.push(filePath);
      }
    }
  }
  return expanded;
};

// Get git last modified date for files (fallback to current date if git fails)
const getLastModifiedDate = (filePaths) => {
  try {
    const expandedPaths = expandFilePaths(filePaths);
    if (expandedPaths.length === 0) {
      return getCurrentDate();
    }

    // Get the most recent commit date that modified any of these files
    const gitCommand = `git log -1 --format=%cd --date=short -- ${expandedPaths.join(' ')}`;
    const result = execSync(gitCommand, {
      cwd: join(__dirname, '..'),
      encoding: 'utf-8'
    }).trim();

    return result || getCurrentDate();
  } catch {
    // Fallback to current date if git command fails
    return getCurrentDate();
  }
};

// Define which files affect which URLs
const urlMappings = {
  '/': [
    '/',
    'src/App.vue',
    'src/main.ts',
    'src/components/AppHeader.vue',
    'src/components/AppFooter.vue',
    'src/router/index.ts'
  ],
  '/portfolio': [
    'src/data/projects.json',
    'src/views/ProjectDetailView.vue',
    'src/components/ProjectDetail.vue',
    'src/components/StudiesDetail.vue',
    'src/types/project.ts',
    'public/images/**',
    'public/videos/**'
  ],
  '/gallery': [
    'src/views/GalleryView.vue',
    'public/images/**',
    'public/videos/**'
  ],
  '/about': [
    'src/views/AboutView.vue',
  ]
};

// Path to sitemap.xml
const sitemapPath = join(__dirname, '../public/sitemap.xml');

try {
  // Read the current sitemap
  let sitemapContent = readFileSync(sitemapPath, 'utf-8');
  let hasChanges = false;

  console.log('🔍 Analyzing file changes for sitemap updates...');

  // Update each URL based on its related files
  for (const [urlPath, filePaths] of Object.entries(urlMappings)) {
    const fullUrl = `https://anneliesannys.com${urlPath}`;

    // Get last modified date based on related files
    const lastModDate = getLastModifiedDate(filePaths);
    const expandedPaths = expandFilePaths(filePaths);
    console.log(`📅 ${urlPath}: ${lastModDate} (based on ${expandedPaths.length} files/dirs)`);

    // Create regex to find and replace the lastmod for this specific URL
    const urlRegex = new RegExp(
      `(<loc>${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\/loc>\\s*<lastmod>)\\d{4}-\\d{2}-\\d{2}(<\/lastmod>)`,
      'g'
    );

    const beforeReplace = sitemapContent;
    sitemapContent = sitemapContent.replace(urlRegex, `$1${lastModDate}$2`);

    if (beforeReplace !== sitemapContent) {
      hasChanges = true;
    }
  }

  // Write the updated sitemap back
  writeFileSync(sitemapPath, sitemapContent, 'utf-8');

  if (hasChanges) {
    console.log('✅ Sitemap updated with specific dates per URL');
  } else {
    console.log('ℹ️  No changes needed - dates were already current');
  }

} catch (error) {
  console.error('❌ Error updating sitemap:', error.message);
  process.exit(1);
}
