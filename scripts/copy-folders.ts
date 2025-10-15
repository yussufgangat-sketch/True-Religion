import fs from 'fs';
import path from 'path';

interface CopyResult {
  sourcePath: string;
  destPath: string;
  success: boolean;
  error?: string;
  filesCopied: number;
}

export class FolderCopier {
  private sourcePath: string;
  private destPath: string;
  private supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  constructor(sourcePath: string, destPath: string = 'public/images') {
    this.sourcePath = sourcePath;
    this.destPath = destPath;
  }

  /**
   * Copy all TR folders from source to destination
   */
  async copyAllFolders(): Promise<CopyResult[]> {
    const results: CopyResult[] = [];

    if (!fs.existsSync(this.sourcePath)) {
      console.error(`Source path does not exist: ${this.sourcePath}`);
      return results;
    }

    // Ensure destination exists
    if (!fs.existsSync(this.destPath)) {
      fs.mkdirSync(this.destPath, { recursive: true });
    }

    const folders = fs.readdirSync(this.sourcePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => this.isTRFolder(name));

    console.log(`Found ${folders.length} TR folders to copy`);

    for (const folder of folders) {
      try {
        const result = await this.copyFolder(folder);
        results.push(result);
        console.log(`✅ Copied ${folder}: ${result.filesCopied} files`);
      } catch (error) {
        results.push({
          sourcePath: path.join(this.sourcePath, folder),
          destPath: path.join(this.destPath, folder),
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          filesCopied: 0
        });
        console.error(`❌ Failed to copy ${folder}:`, error);
      }
    }

    return results;
  }

  /**
   * Copy a single folder
   */
  private async copyFolder(folderName: string): Promise<CopyResult> {
    const sourceFolderPath = path.join(this.sourcePath, folderName);
    const destFolderPath = path.join(this.destPath, folderName);

    // Create destination folder
    if (!fs.existsSync(destFolderPath)) {
      fs.mkdirSync(destFolderPath, { recursive: true });
    }

    // Get all image files from source folder
    const files = fs.readdirSync(sourceFolderPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name)
      .filter(fileName => this.supportedFormats.some(ext => 
        fileName.toLowerCase().endsWith(ext)
      ));

    let filesCopied = 0;

    // Copy each file
    for (const file of files) {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const destFilePath = path.join(destFolderPath, file);
      
      try {
        fs.copyFileSync(sourceFilePath, destFilePath);
        filesCopied++;
      } catch (error) {
        console.warn(`Failed to copy ${file}:`, error);
      }
    }

    return {
      sourcePath: sourceFolderPath,
      destPath: destFolderPath,
      success: true,
      filesCopied
    };
  }

  /**
   * Check if folder name matches TR pattern
   */
  private isTRFolder(folderName: string): boolean {
    return /TR\s*[-_]?\s*\d+/i.test(folderName);
  }

  /**
   * List all TR folders in source directory
   */
  listTRFolders(): string[] {
    if (!fs.existsSync(this.sourcePath)) {
      return [];
    }

    return fs.readdirSync(this.sourcePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => this.isTRFolder(name));
  }

  /**
   * Get summary of folders and files
   */
  getFolderSummary(): { folder: string; fileCount: number; files: string[] }[] {
    const folders = this.listTRFolders();
    const summary: { folder: string; fileCount: number; files: string[] }[] = [];

    for (const folder of folders) {
      const folderPath = path.join(this.sourcePath, folder);
      const files = fs.readdirSync(folderPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)
        .filter(fileName => this.supportedFormats.some(ext => 
          fileName.toLowerCase().endsWith(ext)
        ));

      summary.push({
        folder,
        fileCount: files.length,
        files
      });
    }

    return summary;
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: npm run copy-folders <source-path>

Example:
  npm run copy-folders /path/to/your/tr/folders

This will copy all TR folders from the source to public/images/
    `);
    process.exit(1);
  }

  const sourcePath = args[0];
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source path ${sourcePath} does not exist`);
    process.exit(1);
  }

  try {
    console.log(`Copying folders from ${sourcePath} to public/images/...`);
    
    const copier = new FolderCopier(sourcePath);
    
    // Show summary first
    console.log('\n📁 Found folders:');
    const summary = copier.getFolderSummary();
    summary.forEach(item => {
      console.log(`- ${item.folder}: ${item.fileCount} files`);
    });

    // Copy folders
    const results = await copier.copyAllFolders();
    
    console.log('\n✅ Copy Results:');
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`- Successful: ${successful.length}`);
    console.log(`- Failed: ${failed.length}`);
    console.log(`- Total files copied: ${successful.reduce((sum, r) => sum + r.filesCopied, 0)}`);

    if (failed.length > 0) {
      console.log('\n❌ Failed copies:');
      failed.forEach(result => {
        console.log(`- ${result.sourcePath}: ${result.error}`);
      });
    }

    console.log('\n🎉 Copy complete! Now run: npm run organize-images');

  } catch (error) {
    console.error('❌ Error copying folders:', error);
    process.exit(1);
  }
}

export { FolderCopier };




