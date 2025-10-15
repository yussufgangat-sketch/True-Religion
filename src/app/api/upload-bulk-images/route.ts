import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files: File[] = data.getAll('files') as File[];
    const folderName: string = data.get('folderName') as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const results: any[] = [];
    const ref = extractRefFromPath(folderName);
    
    // Create the full directory path
    const fullPath = path.join(process.cwd(), 'public', 'images', folderName);
    
    // Ensure directory exists
    await mkdir(fullPath, { recursive: true });

    // Process files in parallel (but limit concurrency)
    const concurrency = 5;
    for (let i = 0; i < files.length; i += concurrency) {
      const batch = files.slice(i, i + concurrency);
      
      const batchPromises = batch.map(async (file) => {
        try {
          // Generate unique filename to avoid conflicts
          const timestamp = Date.now();
          const randomSuffix = Math.random().toString(36).substring(2, 8);
          const fileExtension = path.extname(file.name);
          const baseName = path.basename(file.name, fileExtension);
          const uniqueFileName = `${baseName}_${timestamp}_${randomSuffix}${fileExtension}`;
          
          // Save file
          const filePath = path.join(fullPath, uniqueFileName);
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          await writeFile(filePath, buffer);

          return {
            success: true,
            fileName: uniqueFileName,
            folderPath: `/images/${folderName}/${uniqueFileName}`,
            ref: ref || 'UNKNOWN',
            originalName: file.name,
            folderName
          };
        } catch (error) {
          return {
            success: false,
            fileName: file.name,
            folderName,
            error: error instanceof Error ? error.message : 'Upload failed'
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return NextResponse.json({
      success: true,
      results,
      totalFiles: files.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    });

  } catch (error) {
    console.error('Error uploading bulk files:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' }, 
      { status: 500 }
    );
  }
}

function extractRefFromPath(folderPath: string): string | null {
  // Extract REF from folder path like "TR 1" -> "TR1"
  const match = folderPath.match(/TR\s*[-_]?\s*(\d+)/i);
  if (match) {
    return `TR${match[1]}`;
  }
  return null;
}




