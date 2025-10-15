import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const fileName: string = data.get('fileName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Extract REF from filename or use a default
    const ref = extractRefFromFileName(fileName);
    const folderName = ref ? `TR ${ref.replace('TR', '')}` : 'UNKNOWN';
    
    // Create folder path
    const folderPath = path.join(process.cwd(), 'public', 'images', folderName);
    
    // Ensure folder exists
    await mkdir(folderPath, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = path.extname(fileName);
    const baseName = path.basename(fileName, fileExtension);
    const uniqueFileName = `${baseName}_${timestamp}${fileExtension}`;
    
    // Save file
    const filePath = path.join(folderPath, uniqueFileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileName: uniqueFileName,
      folderPath: `/images/${folderName}/${uniqueFileName}`,
      ref: ref || 'UNKNOWN',
      originalName: fileName
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    );
  }
}

function extractRefFromFileName(fileName: string): string | null {
  // Try to extract REF from filename patterns like "TR1_image.jpg", "TR-1_image.jpg", etc.
  const match = fileName.match(/TR\s*[-_]?\s*(\d+)/i);
  if (match) {
    return `TR${match[1]}`;
  }
  return null;
}


