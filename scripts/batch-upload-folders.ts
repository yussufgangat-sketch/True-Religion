import fs from 'fs';
import path from 'path';
import { FolderCopier } from './copy-folders';

interface BatchUploadOptions {
  sourcePaths: string[];
  destPath?: string;
  dryRun?: boolean;
}

export class BatchFolderUploader {
  private options: BatchUploadOptions;

  constructor(options: BatchUploadOptions) {
    this.options = {
      destPath: 'public/images',
      dryRun: false,
      ...options
    };
  }

  /**
   * Upload multiple folder sources
   */
  async uploadAllSources(): Promise<void> {
    console.log(`🚀 Starting batch upload from ${this.options.sourcePaths.length} sources...`);
    
    for (let i = 0; i < this.options.sourcePaths.length; i++) {
      const sourcePath = this.options.sourcePaths[i];
      console.log(`\n📁 Processing source ${i + 1}/${this.options.sourcePaths.length}: ${sourcePath}`);
      
      if (!fs.existsSync(sourcePath)) {
        console.error(`❌ Source path does not exist: ${sourcePath}`);
        continue;
      }

      try {
        const copier = new FolderCopier(sourcePath, this.options.destPath);
        
        if (this.options.dryRun) {
          console.log('🔍 DRY RUN - Scanning folders...');
          const summary = copier.getFolderSummary();
          console.log(`Found ${summary.length} TR folders:`);
          summary.forEach(item => {
            console.log(`- ${item.folder}: ${item.fileCount} files`);
          });
        } else {
          const results = await copier.copyAllFolders();
          const successful = results.filter(r => r.success);
          const failed = results.filter(r => !r.success);
          
          console.log(`✅ Copied ${successful.length} folders successfully`);
          if (failed.length > 0) {
            console.log(`❌ Failed to copy ${failed.length} folders`);
            failed.forEach(result => {
              console.log(`  - ${result.sourcePath}: ${result.error}`);
            });
          }
        }
        
      } catch (error) {
        console.error(`❌ Error processing source ${sourcePath}:`, error);
      }
    }

    if (!this.options.dryRun) {
      console.log('\n🎉 Batch upload complete!');
      console.log('Next steps:');
      console.log('1. Run: npm run organize-images');
      console.log('2. Run: npm run process-excel your-data.csv');
    }
  }

  /**
   * Scan all sources and show summary
   */
  async scanAllSources(): Promise<void> {
    console.log('🔍 Scanning all sources for TR folders...\n');
    
    for (let i = 0; i < this.options.sourcePaths.length; i++) {
      const sourcePath = this.options.sourcePaths[i];
      console.log(`📁 Source ${i + 1}: ${sourcePath}`);
      
      if (!fs.existsSync(sourcePath)) {
        console.log(`❌ Path does not exist\n`);
        continue;
      }

      try {
        const copier = new FolderCopier(sourcePath);
        const summary = copier.getFolderSummary();
        
        if (summary.length === 0) {
          console.log('   No TR folders found\n');
        } else {
          console.log(`   Found ${summary.length} TR folders:`);
          summary.forEach(item => {
            console.log(`   - ${item.folder}: ${item.fileCount} files`);
          });
          console.log('');
        }
        
      } catch (error) {
        console.error(`   ❌ Error scanning: ${error}\n`);
      }
    }
  }

  /**
   * Create a configuration file for batch uploads
   */
  async createConfigFile(configPath: string = 'batch-upload-config.json'): Promise<void> {
    const config = {
      sources: this.options.sourcePaths,
      destination: this.options.destPath,
      createdAt: new Date().toISOString()
    };

    await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
    console.log(`📝 Created config file: ${configPath}`);
  }

  /**
   * Load configuration from file
   */
  static async loadFromConfig(configPath: string): Promise<BatchFolderUploader> {
    const config = JSON.parse(await fs.promises.readFile(configPath, 'utf8'));
    return new BatchFolderUploader({
      sourcePaths: config.sources,
      destPath: config.destination
    });
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: npm run batch-upload <source1> [source2] [source3] ...

Examples:
  npm run batch-upload /path/to/tr1 /path/to/tr2 /path/to/tr3
  npm run batch-upload /Users/Name/Desktop/TR\ Images /Users/Name/Downloads/More\ TR
  npm run batch-upload --dry-run /path/to/source1 /path/to/source2
  npm run batch-upload --scan /path/to/source1 /path/to/source2

Options:
  --dry-run    Show what would be uploaded without actually copying
  --scan       Just scan and show what folders would be found
  --config     Create a config file for future use
    `);
    process.exit(1);
  }

  const isDryRun = args.includes('--dry-run');
  const isScan = args.includes('--scan');
  const createConfig = args.includes('--config');
  
  // Filter out options
  const sourcePaths = args.filter(arg => !arg.startsWith('--'));

  if (sourcePaths.length === 0) {
    console.error('❌ No source paths provided');
    process.exit(1);
  }

  try {
    const uploader = new BatchFolderUploader({
      sourcePaths,
      dryRun: isDryRun
    });

    if (isScan) {
      await uploader.scanAllSources();
    } else if (createConfig) {
      await uploader.createConfigFile();
      console.log('✅ Config file created. You can now use: npm run batch-upload --config batch-upload-config.json');
    } else {
      await uploader.uploadAllSources();
    }

  } catch (error) {
    console.error('❌ Error in batch upload:', error);
    process.exit(1);
  }
}

