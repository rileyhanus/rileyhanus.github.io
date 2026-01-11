#!/usr/bin/env node
/**
 * Script to generate venues.json from files in promo/veneus directory
 * Run this whenever you add new venue images to automatically update the list
 */

const fs = require('fs');
const path = require('path');

const venuesDir = path.join(__dirname, 'promo', 'veneus');
const outputFile = path.join(venuesDir, 'venues.json');

// Get all image files
const files = fs.readdirSync(venuesDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .sort((a, b) => {
        // Extract numbers from filename for sorting
        const numA = parseInt(a.match(/^\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/^\d+/)?.[0] || '0');
        return numA - numB;
    });

// Generate venue entries
const venues = files.map(file => {
    // Remove number prefix and extension to get title
    const titleMatch = file.match(/^\d+_(.+?)\.(jpg|jpeg|png|gif|webp)$/i);
    const title = titleMatch ? titleMatch[1].replace(/_/g, ' ') : file.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    
    return {
        src: file, // Relative to promo/veneus directory
        title: title
    };
});

// Write JSON file
const jsonContent = JSON.stringify(venues, null, 2);
fs.writeFileSync(outputFile, jsonContent, 'utf8');

console.log(`Generated venues.json with ${venues.length} venues:`);
venues.forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.src} - ${v.title}`);
});
