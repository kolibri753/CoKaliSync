import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// Specify the folders containing the files
const soundFolderPath = './public/kalimbaKeySounds';
const imageFolderPath = './src/assets/images';

// Get a list of files in the sound folder
const soundFiles = readdirSync(soundFolderPath);
// Get a list of files in the image folder
const imageFiles = readdirSync(imageFolderPath);

// Generate comments
const soundComment = '// For rune prod delete public\n';
const imageComment = '// For rune prod delete src and images from path and add images -index from dist\n';

// Generate preload code for files
const soundPreloadCode = soundFiles.map(file => `new Audio("./${join(soundFolderPath, file)}").load();`).join('\n');
const imagePreloadCode = imageFiles.map(file => `(() => { const img = new Image(); img.src="./${join('src/assets/images', file)}";})();`).join('\n');

// Combine sound and image preload code with comments
const allPreloadCode = soundComment + soundPreloadCode + '\n\n' + imageComment + imagePreloadCode;

// Replace backslashes with forward slashes in the generated code
const formattedPreloadCode = allPreloadCode.replace(/\\/g, '/');

// Write the generated code to a file
writeFileSync('./src/generated/preload.ts', formattedPreloadCode);
