#!/usr/bin/env node
/**
 * Script to generate videos.json from files in promo/videos directory
 * Run this whenever you add new videos to automatically update the list
 */

const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'promo', 'videos');
const outputFile = path.join(videosDir, 'videos.json');

// Get all video files
const files = fs.readdirSync(videosDir)
    .filter(file => /\.(mp4|mov|MOV)$/i.test(file))
    .sort((a, b) => {
        // Extract numbers from filename for sorting
        const numA = parseInt(a.match(/^\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/^\d+/)?.[0] || '0');
        return numA - numB;
    });

// Generate video entries
const videos = files.map(file => {
    // Remove number prefix and extension to get title
    const titleMatch = file.match(/^\d+_(.+?)\.(mp4|mov|MOV)$/i);
    const title = titleMatch ? titleMatch[1].replace(/_/g, ' ') : file.replace(/\.(mp4|mov|MOV)$/i, '');
    
    return {
        src: file, // Relative to promo/videos directory
        title: title
    };
});

// Write JSON file
const jsonContent = JSON.stringify(videos, null, 2);
fs.writeFileSync(outputFile, jsonContent, 'utf8');

console.log(`Generated videos.json with ${videos.length} videos:`);
videos.forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.src} - ${v.title}`);
});
