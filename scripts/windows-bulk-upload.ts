import fs from 'fs';
import path from 'path';

interface WindowsBulkOptions {
  sourcePath: string;
  destPath?: string;
  batchSize?: number;
  delayBetweenBatches?: number;
  dryRun?: boolean;
  scan?: boolean;
}

export class WindowsBulkUploader {
  private options: WindowsBulkOptions;
  private supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  constructor(options: WindowsBulkOptions) {
    this.options = {
      destPath: 'public/images',
      batchSize: 15,
      delayBetweenBatches: 150,
      dryRun: false,
      scan: false,
      ...options
    };
  }

  /**
   * Process 150+ folders optimized for Windows
   */
  async processAllFolders(): Promise<void> {
    console.log(`🚀 Starting Windows bulk processing...`);
    console.log(`📁 Source: ${this.options.sourcePath}`);
    console.log(`📁 Destination: ${this.options.destPath}`);
    console.log(`📦 Batch size: ${this.options.batchSize}`);
    console.log(`⏱️  Delay between batches: ${this.options.delayBetweenBatches}ms\n`);

    if (!fs.existsSync(this.options.sourcePath)) {
      throw new Error(`Source path does not exist: ${this.options.sourcePath}`);
    }

    // Ensure destination exists
    if (!this.options.dryRun) {
      if (!fs.existsSync(this.options.destPath)) {
        fs.mkdirSync(this.options.destPath, { recursive: true });
      }
    }

    // Get all TR folders
    const folders = this.getTRFolders();
    console.log(`📊 Found ${folders.length} TR folders to process\n`);

    if (folders.length === 0) {
      console.log('❌ No TR folders found in source directory');
      return;
    }

    // Show first few and last few folders for verification
    if (folders.length > 10) {
      console.log(`📋 First 5 folders: ${folders.slice(0, 5).join(', ')}`);
      console.log(`📋 Last 5 folders: ${folders.slice(-5).join(', ')}`);
      console.log(`📋 Total folders: ${folders.length}\n`);
    } else {
      console.log(`📋 All folders: ${folders.join(', ')}\n`);
    }

    // Process folders in batches
    const totalBatches = Math.ceil(folders.length / this.options.batchSize);
    let processedFolders = 0;
    let totalFiles = 0;
    let successfulFiles = 0;

    for (let i = 0; i < folders.length; i += this.options.batchSize) {
      const batch = folders.slice(i, i + this.options.batchSize);
      const batchNumber = Math.floor(i / this.options.batchSize) + 1;
      
      console.log(`📦 Processing batch ${batchNumber}/${totalBatches}: ${batch.join(', ')}`);

      const batchResults = await this.processBatch(batch);
      
      // Update statistics
      processedFolders += batch.length;
      totalFiles += batchResults.totalFiles;
      successfulFiles += batchResults.successfulFiles;
      
      console.log(`✅ Batch ${batchNumber} complete: ${batchResults.successfulFiles}/${batchResults.totalFiles} files processed`);
      
      // Progress update
      const progress = Math.round((processedFolders / folders.length) * 100);
      console.log(`📈 Progress: ${processedFolders}/${folders.length} folders (${progress}%)\n`);

      // Delay between batches to prevent overwhelming Windows
      if (i + this.options.batchSize < folders.length && this.options.delayBetweenBatches > 0) {
        console.log(`⏳ Waiting ${this.options.delayBetweenBatches}ms before next batch...`);
        await this.delay(this.options.delayBetweenBatches);
      }
    }

    console.log(`🎉 Windows bulk processing complete!`);
    console.log(`📊 Statistics:`);
    console.log(`   - Folders processed: ${processedFolders}`);
    console.log(`   - Files processed: ${successfulFiles}/${totalFiles}`);
    console.log(`   - Success rate: ${Math.round((successfulFiles / totalFiles) * 100)}%`);

    if (!this.options.dryRun) {
      console.log(`\n📝 Next steps:`);
      console.log(`   1. Run: npm run organize-images`);
      console.log(`   2. Run: npm run process-excel your-data.csv`);
    }
  }

  /**
   * Process a batch of folders
   */
  private async processBatch(folders: string[]): Promise<{ totalFiles: number; successfulFiles: number }> {
    let totalFiles = 0;
    let successfulFiles = 0;

    // Process folders sequentially within batch to avoid Windows file system conflicts
    for (const folder of folders) {
      try {
        const result = await this.processFolder(folder);
        totalFiles += result.totalFiles;
        successfulFiles += result.successfulFiles;
      } catch (error) {
        console.error(`❌ Error processing folder ${folder}:`, error);
      }
    }

    return { totalFiles, successfulFiles };
  }

  /**
   * Process a single folder
   */
  private async processFolder(folderName: string): Promise<{ totalFiles: number; successfulFiles: number }> {
    const sourceFolderPath = path.join(this.options.sourcePath, folderName);
    const destFolderPath = path.join(this.options.destPath, folderName);

    if (!fs.existsSync(sourceFolderPath)) {
      console.warn(`⚠️  Source folder does not exist: ${sourceFolderPath}`);
      return { totalFiles: 0, successfulFiles: 0 };
    }

    // Get all image files from source folder
    const files = fs.readdirSync(sourceFolderPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name)
      .filter(fileName => this.supportedFormats.some(ext => 
        fileName.toLowerCase().endsWith(ext)
      ));

    if (files.length === 0) {
      console.warn(`⚠️  No image files found in ${folderName}`);
      return { totalFiles: 0, successfulFiles: 0 };
    }

    if (this.options.dryRun) {
      console.log(`🔍 DRY RUN: Would copy ${files.length} files from ${folderName}`);
      return { totalFiles: files.length, successfulFiles: files.length };
    }

    // Create destination folder
    if (!fs.existsSync(destFolderPath)) {
      fs.mkdirSync(destFolderPath, { recursive: true });
    }

    let successfulFiles = 0;

    // Copy each file with Windows-optimized approach
    for (const file of files) {
      try {
        const sourceFilePath = path.join(sourceFolderPath, file);
        const destFilePath = path.join(destFolderPath, file);
        
        // Use copyFileSync for better Windows compatibility
        fs.copyFileSync(sourceFilePath, destFilePath);
        successfulFiles++;
      } catch (error) {
        console.warn(`⚠️  Failed to copy ${file} from ${folderName}:`, error);
      }
    }

    return { totalFiles: files.length, successfulFiles };
  }

  /**
   * Get all TR folders from source directory
   */
  private getTRFolders(): string[] {
    return fs.readdirSync(this.options.sourcePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => this.isTRFolder(name))
      .sort((a, b) => {
        // Sort by TR number for better organization
        const aNum = this.extractTRNumber(a);
        const bNum = this.extractTRNumber(b);
        return aNum - bNum;
      });
  }

  /**
   * Check if folder name matches TR pattern
   */
  private isTRFolder(folderName: string): boolean {
    return /TR\s*[-_]?\s*\d+/i.test(folderName);
  }

  /**
   * Extract TR number for sorting
   */
  private extractTRNumber(folderName: string): number {
    const match = folderName.match(/TR\s*[-_]?\s*(\d+)/i);
    return match ? parseInt(match[1]) : 999999;
  }

  /**
   * Get summary of folders and files
   */
  getFolderSummary(): { folder: string; fileCount: number; files: string[] }[] {
    const folders = this.getTRFolders();
    const summary: { folder: string; fileCount: number; files: string[] }[] = [];

    for (const folder of folders) {
      const folderPath = path.join(this.options.sourcePath, folder);
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

  /**
   * Delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: npm run windows-bulk <source-path> [options]

Examples:
  npm run windows-bulk "C:\\Users\\YourName\\Desktop\\TR Images"
  npm run windows-bulk "C:\\Users\\YourName\\Desktop\\TR Images" --batch-size 20
  npm run windows-bulk "C:\\Users\\YourName\\Desktop\\TR Images" --dry-run
  npm run windows-bulk "C:\\Users\\YourName\\Desktop\\TR Images" --scan

Options:
  --batch-size <number>    Number of folders to process per batch (default: 15)
  --delay <number>         Delay between batches in ms (default: 150)
  --dry-run               Show what would be processed without actually copying
  --scan                  Just scan and show what folders would be found

Windows Tips:
  - Use quotes around paths with spaces
  - Use forward slashes or double backslashes in paths
  - Recommended batch size: 15 for 150+ folders
    `);
    process.exit(1);
  }

  const sourcePath = args[0];
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source path does not exist: ${sourcePath}`);
    process.exit(1);
  }

  // Parse options
  const batchSizeIndex = args.indexOf('--batch-size');
  const batchSize = batchSizeIndex !== -1 ? parseInt(args[batchSizeIndex + 1]) : 15;
  
  const delayIndex = args.indexOf('--delay');
  const delay = delayIndex !== -1 ? parseInt(args[delayIndex + 1]) : 150;
  
  const isDryRun = args.includes('--dry-run');
  const isScan = args.includes('--scan');

  try {
    const processor = new WindowsBulkUploader({
      sourcePath,
      batchSize,
      delayBetweenBatches: delay,
      dryRun: isDryRun,
      scan: isScan
    });

    if (isScan) {
      console.log('🔍 Scanning for TR folders...\n');
      const summary = processor.getFolderSummary();
      
      if (summary.length === 0) {
        console.log('❌ No TR folders found');
      } else {
        console.log(`📊 Found ${summary.length} TR folders:`);
        summary.forEach(item => {
          console.log(`   - ${item.folder}: ${item.fileCount} files`);
        });
        
        const totalFiles = summary.reduce((sum, item) => sum + item.fileCount, 0);
        console.log(`\n📈 Total files: ${totalFiles}`);
      }
    } else {
      await processor.processAllFolders();
    }

  } catch (error) {
    console.error('❌ Error in Windows bulk processing:', error);
    process.exit(1);
  }
}

export { WindowsBulkUploader };




