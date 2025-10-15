import fs from 'fs';
import path from 'path';

export interface FolderImageData {
  ref: string;
  folderPath: string;
  images: string[];
  primaryImage?: string;
}

export class FolderImageProcessor {
  private baseImagePath: string;
  private supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  constructor(baseImagePath: string = 'public/images') {
    this.baseImagePath = baseImagePath;
  }

  /**
   * Scan for product folders and extract images
   */
  async scanProductFolders(): Promise<FolderImageData[]> {
    const results: FolderImageData[] = [];

    try {
      if (!fs.existsSync(this.baseImagePath)) {
        console.log(`Creating base image directory: ${this.baseImagePath}`);
        fs.mkdirSync(this.baseImagePath, { recursive: true });
        return results;
      }

      const folders = fs.readdirSync(this.baseImagePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      console.log(`Found ${folders.length} folders in ${this.baseImagePath}`);

      for (const folder of folders) {
        const folderData = await this.processProductFolder(folder);
        if (folderData) {
          results.push(folderData);
        }
      }

      console.log(`Processed ${results.length} product folders`);
      return results;

    } catch (error) {
      console.error('Error scanning product folders:', error);
      return results;
    }
  }

  /**
   * Process a single product folder
   */
  private async processProductFolder(folderName: string): Promise<FolderImageData | null> {
    const folderPath = path.join(this.baseImagePath, folderName);
    
    try {
      const files = fs.readdirSync(folderPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)
        .filter(fileName => this.supportedFormats.some(ext => 
          fileName.toLowerCase().endsWith(ext)
        ));

      if (files.length === 0) {
        console.log(`No images found in folder: ${folderName}`);
        return null;
      }

      // Extract REF from folder name (TR 1, TR1, TR-1, etc.)
      const ref = this.extractRefFromFolderName(folderName);
      if (!ref) {
        console.log(`Could not extract REF from folder: ${folderName}`);
        return null;
      }

      // Convert to web URLs
      const images = files.map(file => `/images/${folderName}/${file}`);
      
      // Select primary image (first image or one with 'main' in name)
      const primaryImage = this.selectPrimaryImage(files, images);

      return {
        ref,
        folderPath,
        images,
        primaryImage
      };

    } catch (error) {
      console.error(`Error processing folder ${folderName}:`, error);
      return null;
    }
  }

  /**
   * Extract REF code from folder name
   */
  private extractRefFromFolderName(folderName: string): string | null {
    // Handle various formats: "TR 1", "TR1", "TR-1", "tr1", etc.
    const match = folderName.match(/TR\s*[-_]?\s*(\d+)/i);
    if (match) {
      return `TR${match[1]}`;
    }
    return null;
  }

  /**
   * Select primary image from available images
   */
  private selectPrimaryImage(files: string[], images: string[]): string {
    // Look for files with 'main', 'primary', 'front' in name
    const priorityKeywords = ['main', 'primary', 'front', '1', '01'];
    
    for (const keyword of priorityKeywords) {
      const match = files.find(file => 
        file.toLowerCase().includes(keyword.toLowerCase())
      );
      if (match) {
        return `/images/${path.basename(path.dirname(images[0]))}/${match}`;
      }
    }

    // Fallback to first image
    return images[0];
  }

  /**
   * Create a mapping of REF codes to images
   */
  async createImageMapping(): Promise<Map<string, FolderImageData>> {
    const folderData = await this.scanProductFolders();
    const mapping = new Map<string, FolderImageData>();

    folderData.forEach(data => {
      mapping.set(data.ref, data);
    });

    return mapping;
  }

  /**
   * Generate image mapping JSON file
   */
  async saveImageMapping(outputPath: string = 'public/image-mapping.json'): Promise<void> {
    const mapping = await this.createImageMapping();
    const mappingObject = Object.fromEntries(mapping);
    
    await fs.promises.writeFile(outputPath, JSON.stringify(mappingObject, null, 2));
    console.log(`Saved image mapping to ${outputPath}`);
  }

  /**
   * Get images for a specific REF code
   */
  async getImagesForRef(ref: string): Promise<FolderImageData | null> {
    const mapping = await this.createImageMapping();
    return mapping.get(ref) || null;
  }

  /**
   * Create folder structure for new products
   */
  async createProductFolder(ref: string): Promise<string> {
    const folderName = ref.replace(/([A-Z]+)(\d+)/, '$1 $2'); // TR1 -> TR 1
    const folderPath = path.join(this.baseImagePath, folderName);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    }
    
    return folderPath;
  }

  /**
   * List all available REF codes
   */
  async listAvailableRefs(): Promise<string[]> {
    const mapping = await this.createImageMapping();
    return Array.from(mapping.keys()).sort();
  }
}

// Usage example
async function main() {
  const processor = new FolderImageProcessor();
  
  try {
    // Scan for product folders
    const folderData = await processor.scanProductFolders();
    console.log('Found product folders:', folderData.map(f => f.ref));

    // Save image mapping
    await processor.saveImageMapping();
    
    // List available REFs
    const refs = await processor.listAvailableRefs();
    console.log('Available REF codes:', refs);

  } catch (error) {
    console.error('Error in main process:', error);
  }
}

