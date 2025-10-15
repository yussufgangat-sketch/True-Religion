import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const fileName: string = data.get('fileName') as string;
    const webkitRelativePath: string = data.get('webkitRelativePath') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Extract folder path from webkitRelativePath
    const folderPath = extractFolderPath(webkitRelativePath, fileName);
    const ref = extractRefFromPath(folderPath);
    
    // Create the full directory path
    const fullPath = path.join(process.cwd(), 'public', 'images', folderPath);
    
    // Ensure directory exists
    await mkdir(path.dirname(fullPath), { recursive: true });

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileExtension = path.extname(fileName);
    const baseName = path.basename(fileName, fileExtension);
    const uniqueFileName = `${baseName}_${timestamp}${fileExtension}`;
    
    // Save file
    const finalPath = path.join(path.dirname(fullPath), uniqueFileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(finalPath, buffer);

    return NextResponse.json({
      success: true,
      fileName: uniqueFileName,
      folderPath: `/images/${folderPath}`,
      ref: ref || 'UNKNOWN',
      originalName: fileName,
      webkitPath: webkitRelativePath
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    );
  }
}

function extractFolderPath(webkitRelativePath: string, fileName: string): string {
  if (webkitRelativePath) {
    // Extract the folder name from the path
    const pathParts = webkitRelativePath.split('/');
    if (pathParts.length > 1) {
      return pathParts[0]; // Return the first folder name (e.g., "TR 1")
    }
  }
  
  // Fallback: try to extract from filename
  const ref = extractRefFromFileName(fileName);
  if (ref) {
    return `TR ${ref.replace('TR', '')}`;
  }
  
  return 'UNKNOWN';
}

function extractRefFromPath(folderPath: string): string | null {
  // Extract REF from folder path like "TR 1" -> "TR1"
  const match = folderPath.match(/TR\s*[-_]?\s*(\d+)/i);
  if (match) {
    return `TR${match[1]}`;
  }
  return null;
}

function extractRefFromFileName(fileName: string): string | null {
  // Try to extract REF from filename patterns like "TR1_image.jpg", "TR-1_image.jpg", etc.
  const match = fileName.match(/TR\s*[-_]?\s*(\d+)/i);
  if (match) {
    return `TR${match[1]}`;
  }
  return null;
}




