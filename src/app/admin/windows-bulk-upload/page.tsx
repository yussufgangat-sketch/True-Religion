'use client';

import { useState, useRef } from 'react';
import { Upload, Folder, CheckCircle, AlertCircle, FolderOpen, Database, Zap, Monitor } from 'lucide-react';

export default function WindowsBulkUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [batchSize, setBatchSize] = useState(15);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
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
    const folderNames = Object.keys(folderGroups);
    const totalFolders = folderNames.length;
    
    setFolderCount(totalFolders);
    setTotalBatches(Math.ceil(totalFolders / batchSize));
    setCurrentBatch(0);

    console.log(`🚀 Starting Windows bulk upload of ${totalFolders} folders in batches of ${batchSize}`);

    const results: any[] = [];
    let processedFolders = 0;

    // Process folders in batches
    for (let i = 0; i < folderNames.length; i += batchSize) {
      const batch = folderNames.slice(i, i + batchSize);
      setCurrentBatch(Math.floor(i / batchSize) + 1);
      
      console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(totalFolders / batchSize)}: ${batch.join(', ')}`);

      // Process batch in parallel
      const batchPromises = batch.map(async (folderName) => {
        const folderFiles = folderGroups[folderName];
        return await uploadFolder(folderName, folderFiles);
      });

      try {
        const batchResults = await Promise.all(batchPromises);
        const flatResults = batchResults.flat();
        results.push(...flatResults);
        setUploadResults([...results]);
        
        processedFolders += batch.length;
        setUploadProgress((processedFolders / totalFolders) * 100);
        
        // Small delay between batches to prevent overwhelming the server
        if (i + batchSize < folderNames.length) {
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
      } catch (error) {
        console.error(`❌ Error processing batch:`, error);
        // Continue with next batch
      }
    }

    setUploading(false);
    console.log(`✅ Windows bulk upload complete! Processed ${processedFolders} folders`);
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
    
    // Upload files in smaller chunks to prevent timeouts
    const chunkSize = 3; // Smaller chunks for Windows
    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize);
      
      const chunkPromises = chunk.map(async (file) => {
        try {
          const result = await uploadFile(file);
          return {
            ...result,
            folderName,
            success: true
          };
        } catch (error) {
          return {
            fileName: file.name,
            folderName,
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
          };
        }
      });
      
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
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

  const getFolderStats = () => {
    const stats = uploadResults.reduce((acc, result) => {
      const folder = result.folderName || 'Unknown';
      if (!acc[folder]) {
        acc[folder] = { total: 0, successful: 0, failed: 0 };
      }
      acc[folder].total++;
      if (result.success) acc[folder].successful++;
      else acc[folder].failed++;
      return acc;
    }, {} as Record<string, { total: number; successful: number; failed: number }>);

    return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Windows Bulk Upload - Ctrl+A Selection</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Monitor className="h-5 w-5 mr-2" />
            Windows Folder Selection
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size (folders per batch)
            </label>
            <select
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5 folders (Very Safe)</option>
              <option value={10}>10 folders (Safe)</option>
              <option value={15}>15 folders (Recommended)</option>
              <option value={20}>20 folders (Fast)</option>
              <option value={30}>30 folders (Aggressive)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Recommended: 15 folders for 150+ uploads
            </p>
          </div>
          
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
            
            <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Select ALL your TR folders with Ctrl+A
            </p>
            <p className="text-gray-500 mb-4">
              Windows Explorer → Select all folders → Drag & drop here
            </p>
            
            <button
              onClick={triggerFileInput}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Select All Folders (Ctrl+A)'}
            </button>
          </div>

          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Batch {currentBatch} of {totalBatches} | {folderCount} folders</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Processing {batchSize} folders at a time for Windows compatibility
              </p>
            </div>
          )}
        </div>

        {/* Windows Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Folder className="h-5 w-5 mr-2" />
            Windows Selection Guide
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Step-by-Step for Windows:</h3>
              <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
                <li>Open Windows Explorer</li>
                <li>Navigate to your TR folders location</li>
                <li>Press <kbd className="bg-gray-200 px-1 rounded">Ctrl+A</kbd> to select all folders</li>
                <li>Drag and drop all selected folders here</li>
                <li>Or click "Select All Folders" button</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-blue-800 mb-2">Windows Tips:</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                <li>Use <kbd className="bg-gray-200 px-1 rounded">Ctrl+A</kbd> to select all folders at once</li>
                <li>Hold <kbd className="bg-gray-200 px-1 rounded">Ctrl</kbd> to select specific folders</li>
                <li>Use <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> to select a range</li>
                <li>Ensure all folders are named TR 1, TR 2, etc.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-blue-800 mb-2">Performance Settings:</h3>
              <div className="bg-white p-3 rounded border text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>150+ folders: 15 batch size</div>
                  <div>200+ folders: 10 batch size</div>
                  <div>300+ folders: 5 batch size</div>
                  <div>Very large: 5 batch size</div>
                </div>
              </div>
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm max-h-40 overflow-y-auto">
              {getFolderStats().map(([folder, stats]) => (
                <div key={folder} className="bg-white p-2 rounded border">
                  <div className="font-medium text-xs">{folder}</div>
                  <div className="text-green-600 text-xs">{stats.successful} ✓</div>
                  <div className="text-red-600 text-xs">{stats.failed} ✗</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uploadResults.slice(0, 100).map((result, index) => (
              <div 
                key={index}
                className={`flex items-center p-2 rounded-md text-sm ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-xs">{result.fileName}</p>
                    {result.folderName && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                        {result.folderName}
                      </span>
                    )}
                  </div>
                  {!result.success && (
                    <p className="text-xs text-red-600">
                      {result.error}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {uploadResults.length > 100 && (
              <div className="text-center text-gray-500 text-sm py-2">
                Showing first 100 results. Total: {uploadResults.length} files
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {uploadResults.filter(r => r.success).length} successful, {uploadResults.filter(r => !r.success).length} failed
            </div>
            
            <button
              onClick={() => {
                setUploadResults([]);
                setUploadProgress(0);
                setCurrentBatch(0);
                setTotalBatches(0);
                setFolderCount(0);
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
          <h3 className="font-semibold mb-2">Generate Mapping</h3>
          <p className="text-sm text-gray-600 mb-3">
            Create image mapping after upload
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Generate Mapping
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="font-semibold mb-2">Process Excel</h3>
          <p className="text-sm text-gray-600 mb-3">
            Process your Excel data with images
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Process Excel
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




