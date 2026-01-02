/**
 * Favicon Generator Script
 * Run: node scripts/generate-favicons.js
 * 
 * Generates all required favicon formats from /public/brand/logo1.jpg
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
];

const inputFile = path.join(__dirname, '../public/brand/logo1.jpg');
const outputDir = path.join(__dirname, '../public/favicon');

async function generateFavicons() {
    console.log('🎨 Generating favicons from logo1.jpg...\n');

    if (!fs.existsSync(inputFile)) {
        console.error('❌ Error: /public/brand/logo1.jpg not found!');
        console.error('Please ensure the logo file exists before running this script.');
        process.exit(1);
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log('📁 Created /public/favicon/ directory\n');
    }

    try {
        // Generate PNG favicons
        for (const { name, size } of sizes) {
            const outputPath = path.join(outputDir, name);
            await sharp(inputFile)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toFile(outputPath);
            console.log(`✅ Generated ${name} (${size}x${size})`);
        }

        // Generate favicon.ico (multi-resolution)
        // Note: Sharp doesn't natively support .ico format with multiple sizes
        // For production, use an online tool or imagemagick
        // Here we'll create a 32x32 PNG and rename to .ico as a fallback
        const icoPath = path.join(outputDir, 'favicon.ico');
        await sharp(inputFile)
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(icoPath);
        console.log(`✅ Generated favicon.ico (32x32 PNG format)`);
        console.log(`   ⚠️  For true multi-res .ico, use: https://favicon.io/favicon-converter/`);

        console.log('\n🎉 All favicons generated successfully!');
        console.log('📁 Files created in /public/favicon/');
    } catch (error) {
        console.error('❌ Error generating favicons:', error.message);
        process.exit(1);
    }
}

generateFavicons();
