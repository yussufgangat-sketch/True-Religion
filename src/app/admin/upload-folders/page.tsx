'use client';

import { useState, useRef } from 'react';
import { Upload, Folder, Image as ImageIcon, CheckCircle, AlertCircle, FolderOpen } from 'lucide-react';

export default function UploadFoldersPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadResults([]);

    // Group files by folder
    const folderGroups = groupFilesByFolder(files);
    const results: any[] = [];
    const totalFolders = Object.keys(folderGroups).length;
    let processedFolders = 0;

    console.log(`Found ${totalFolders} folders to upload:`, Object.keys(folderGroups));

    for (const [folderName, folderFiles] of Object.entries(folderGroups)) {
      try {
        console.log(`Processing folder: ${folderName} with ${folderFiles.length} files`);
        
        // Upload all files in this folder
        const folderResults = await uploadFolder(folderName, folderFiles);
        results.push(...folderResults);
        setUploadResults([...results]);
        
        processedFolders++;
        setUploadProgress((processedFolders / totalFolders) * 100);
        
      } catch (error) {
        results.push({
          folderName,
          success: false,
          error: error instanceof Error ? error.message : 'Folder upload failed'
        });
        setUploadResults([...results]);
      }
    }

    setUploading(false);
  };

  const groupFilesByFolder = (files: File[]): Record<string, File[]> => {
    const groups: Record<string, File[]> = {};
    
    files.forEach(file => {
      const webkitPath = (file as any).webkitRelativePath || '';
      const folderName = extractFolderName(webkitPath);
      
      if (!groups[folderName]) {
        groups[folderName] = [];
      }
      groups[folderName].push(file);
    });
    
    return groups;
  };

  const extractFolderName = (webkitPath: string): string => {
    if (webkitPath) {
      const pathParts = webkitPath.split('/');
      return pathParts[0] || 'UNKNOWN';
    }
    return 'UNKNOWN';
  };

  const uploadFolder = async (folderName: string, files: File[]): Promise<any[]> => {
    const results: any[] = [];
    
    for (const file of files) {
      try {
        const result = await uploadFile(file);
        results.push({
          ...result,
          folderName,
          success: true
        });
      } catch (error) {
        results.push({
          fileName: file.name,
          folderName,
          success: false,
          error: error instanceof Error ? error.message : 'Upload failed'
        });
      }
    }
    
    return results;
  };

  const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('webkitRelativePath', (file as any).webkitRelativePath || '');

    const response = await fetch('/api/upload-folder-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload Product Folders</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload Folders
          </h2>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              webkitdirectory=""
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag and drop your TR folders here
            </p>
            <p className="text-gray-500 mb-4">
              or click to select folders
            </p>
            
            <button
              onClick={triggerFileInput}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Select Folders'}
            </button>
          </div>

          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Folder className="h-5 w-5 mr-2" />
            Folder Structure
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Your folder structure:</h3>
              <div className="bg-white p-3 rounded border text-sm font-mono">
                TR 1/
                <br />
                ├── front.jpg
                <br />
                ├── back.jpg
                <br />
                └── detail.jpg
                <br />
                <br />
                TR 2/
                <br />
                ├── main.jpg
                <br />
                └── side.jpg
                <br />
                <br />
                TR 100/
                <br />
                ├── 1.jpg
                <br />
                └── 2.jpg
              </div>
            </div>

            <div>
              <h3 className="font-medium text-blue-800 mb-2">How to upload:</h3>
              <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
                <li>Select your entire folder structure (TR 1, TR 2, etc.)</li>
                <li>Drag and drop or use the file picker</li>
                <li>The system will preserve your folder structure</li>
                <li>Images will be automatically organized by REF code</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Results */}
      {uploadResults.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Results</h2>
          
          {/* Folder Summary */}
          <div className="mb-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Folder Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(
                uploadResults.reduce((acc, result) => {
                  const folder = result.folderName || 'Unknown';
                  if (!acc[folder]) {
                    acc[folder] = { total: 0, successful: 0, failed: 0 };
                  }
                  acc[folder].total++;
                  if (result.success) acc[folder].successful++;
                  else acc[folder].failed++;
                  return acc;
                }, {} as Record<string, { total: number; successful: number; failed: number }>)
              ).map(([folder, stats]) => (
                <div key={folder} className="bg-white p-2 rounded border">
                  <div className="font-medium">{folder}</div>
                  <div className="text-green-600">{stats.successful} ✓</div>
                  <div className="text-red-600">{stats.failed} ✗</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uploadResults.map((result, index) => (
              <div 
                key={index}
                className={`flex items-center p-3 rounded-md ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{result.fileName}</p>
                    {result.folderName && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {result.folderName}
                      </span>
                    )}
                  </div>
                  {result.success ? (
                    <p className="text-sm text-green-600">
                      Uploaded to: {result.folderPath}
                    </p>
                  ) : (
                    <p className="text-sm text-red-600">
                      Error: {result.error}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {uploadResults.filter(r => r.success).length} successful, {uploadResults.filter(r => !r.success).length} failed
            </div>
            
            <button
              onClick={() => {
                setUploadResults([]);
                setUploadProgress(0);
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Clear Results
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="font-semibold mb-2">Scan Existing Images</h3>
          <p className="text-sm text-gray-600 mb-3">
            Scan your public/images folder for existing product folders
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Scan Folders
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="font-semibold mb-2">Generate Mapping</h3>
          <p className="text-sm text-gray-600 mb-3">
            Create image mapping for your Excel data
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Generate Mapping
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="font-semibold mb-2">View Results</h3>
          <p className="text-sm text-gray-600 mb-3">
            View processed images and mappings
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}
