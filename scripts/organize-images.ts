import fs from 'fs';
import path from 'path';

interface ImageOrganizationResult {
  ref: string;
  folderPath: string;
  images: string[];
  status: 'created' | 'exists' | 'error';
  error?: string;
}

export class ImageOrganizer {
  private basePath: string;
  private supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  constructor(basePath: string = 'public/images') {
    this.basePath = basePath;
  }

  /**
   * Organize images by REF code
   */
  async organizeImagesByRef(images: { ref: string; filePath: string }[]): Promise<ImageOrganizationResult[]> {
    const results: ImageOrganizationResult[] = [];

    for (const image of images) {
      try {
        const result = await this.organizeSingleImage(image.ref, image.filePath);
        results.push(result);
      } catch (error) {
        results.push({
          ref: image.ref,
          folderPath: '',
          images: [],
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Organize a single image by REF
   */
  private async organizeSingleImage(ref: string, sourcePath: string): Promise<ImageOrganizationResult> {
    const folderName = this.formatFolderName(ref);
    const folderPath = path.join(this.basePath, folderName);
    
    try {
      // Create folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Copy file to folder
      const fileName = path.basename(sourcePath);
      const destPath = path.join(folderPath, fileName);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }

      // List all images in the folder
      const images = fs.readdirSync(folderPath)
        .filter(file => this.supportedFormats.some(ext => file.toLowerCase().endsWith(ext)))
        .map(file => `/images/${folderName}/${file}`);

      return {
        ref,
        folderPath: `/images/${folderName}`,
        images,
        status: 'created'
      };

    } catch (error) {
      return {
        ref,
        folderPath: '',
        images: [],
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Format REF code to folder name
   */
  private formatFolderName(ref: string): string {
    // Convert "TR1" to "TR 1", "TR100" to "TR 100", etc.
    const match = ref.match(/TR(\d+)/i);
    if (match) {
      return `TR ${match[1]}`;
    }
    return ref;
  }

  /**
   * Scan existing image folders
   */
  async scanExistingFolders(): Promise<ImageOrganizationResult[]> {
    const results: ImageOrganizationResult[] = [];

    if (!fs.existsSync(this.basePath)) {
      return results;
    }

    const folders = fs.readdirSync(this.basePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const folder of folders) {
      try {
        const ref = this.extractRefFromFolderName(folder);
        if (!ref) continue;

        const folderPath = path.join(this.basePath, folder);
        const images = fs.readdirSync(folderPath)
          .filter(file => this.supportedFormats.some(ext => file.toLowerCase().endsWith(ext)))
          .map(file => `/images/${folder}/${file}`);

        results.push({
          ref,
          folderPath: `/images/${folder}`,
          images,
          status: 'exists'
        });

      } catch (error) {
        results.push({
          ref: folder,
          folderPath: '',
          images: [],
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Extract REF from folder name
   */
  private extractRefFromFolderName(folderName: string): string | null {
    const match = folderName.match(/TR\s*[-_]?\s*(\d+)/i);
    if (match) {
      return `TR${match[1]}`;
    }
    return null;
  }

  /**
   * Generate image mapping JSON
   */
  async generateImageMapping(outputPath: string = 'public/image-mapping.json'): Promise<void> {
    const folders = await this.scanExistingFolders();
    const mapping: Record<string, any> = {};

    folders.forEach(folder => {
      if (folder.status === 'exists') {
        mapping[folder.ref] = {
          ref: folder.ref,
          folderPath: folder.folderPath,
          images: folder.images,
          primaryImage: folder.images[0] || null
        };
      }
    });

    await fs.promises.writeFile(outputPath, JSON.stringify(mapping, null, 2));
    console.log(`Generated image mapping: ${outputPath}`);
  }

  /**
   * Create folder structure for REF codes
   */
  async createFoldersForRefs(refs: string[]): Promise<void> {
    for (const ref of refs) {
      const folderName = this.formatFolderName(ref);
      const folderPath = path.join(this.basePath, folderName);
      
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
      }
    }
  }
}

// CLI usage
async function main() {
  const organizer = new ImageOrganizer();
  
  try {
    console.log('Scanning existing image folders...');
    const folders = await organizer.scanExistingFolders();
    
    console.log(`Found ${folders.length} folders:`);
    folders.forEach(folder => {
      console.log(`- ${folder.ref}: ${folder.images.length} images`);
    });

    console.log('\nGenerating image mapping...');
    await organizer.generateImageMapping();
    
    console.log('✅ Image organization complete!');

  } catch (error) {
    console.error('❌ Error organizing images:', error);
  }
}

// Run main if called directly
if (require.main === module) {
  main();
}

