import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const directory = './public/images';

async function optimizeImages() {
  try {
    const files = await fs.readdir(directory);
    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png)$/i));

    for (const file of imageFiles) {
      const filePath = path.join(directory, file);
      const tempPath = path.join(directory, `temp-${file}`);
      
      const metadata = await sharp(filePath).metadata();
      const resizeOptions = metadata.width > 1200 ? { width: 1200, withoutEnlargement: true } : {};

      await sharp(filePath)
        .resize(resizeOptions)
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(tempPath);

      await fs.rename(tempPath, filePath);
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
