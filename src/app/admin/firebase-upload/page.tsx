'use client';

import { useState, useRef, useEffect } from 'react';
import { storage, firebaseAuth } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { Upload, Folder, CheckCircle, AlertCircle, Cloud, Database } from 'lucide-react';

export default function FirebaseUploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [batchSize, setBatchSize] = useState(5);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Skip authentication for now - rules allow public upload temporarily
    setIsAuthenticated(true);
    setAuthLoading(false);
  }, []);

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
    if (!storage) {
      alert('Firebase Storage is not initialized. Please check your Firebase configuration.');
      return;
    }

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

    console.log(`🚀 Starting Firebase upload of ${totalFolders} folders in batches of ${batchSize}`);

    const results: any[] = [];
    let processedFolders = 0;

    // Process folders in batches
    for (let i = 0; i < folderNames.length; i += batchSize) {
      const batch = folderNames.slice(i, i + batchSize);
      setCurrentBatch(Math.floor(i / batchSize) + 1);
      
      console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(totalFolders / batchSize)}`);

      // Process batch sequentially to avoid Firebase rate limits
      for (const folderName of batch) {
        const folderFiles = folderGroups[folderName];
        const folderResults = await uploadFolder(folderName, folderFiles);
        results.push(...folderResults);
        setUploadResults([...results]);
        
        processedFolders++;
        setUploadProgress((processedFolders / totalFolders) * 100);
      }
      
      // Small delay between batches
      if (i + batchSize < folderNames.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setUploading(false);
    setCurrentFile('');
    console.log(`✅ Firebase upload complete! Processed ${processedFolders} folders`);
    
    // Generate mapping JSON
    generateMappingJSON(results);
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

  const extractRefFromFolder = (folderName: string): string => {
    const match = folderName.match(/TR\s*[-_]?\s*(\d+)/i);
    if (match) {
      return `TR${match[1]}`;
    }
    return folderName;
  };

  const uploadFolder = async (folderName: string, files: File[]): Promise<any[]> => {
    const results: any[] = [];
    const ref_code = extractRefFromFolder(folderName);
    
    for (const file of files) {
      try {
        setCurrentFile(`${folderName}/${file.name}`);
        const downloadURL = await uploadFileToFirebase(file, folderName, ref_code);
        
        results.push({
          fileName: file.name,
          folderName,
          ref: ref_code,
          firebaseURL: downloadURL,
          success: true
        });
      } catch (error) {
        results.push({
          fileName: file.name,
          folderName,
          ref: ref_code,
          success: false,
          error: error instanceof Error ? error.message : 'Upload failed'
        });
      }
    }
    
    return results;
  };

  const uploadFileToFirebase = async (file: File, folderName: string, ref_code: string): Promise<string> => {
    if (!storage) throw new Error('Firebase Storage not initialized');

    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${file.name.split('.')[0]}_${timestamp}.${fileExtension}`;
    
    // Upload to Firebase Storage: products/{REF}/{filename}
    const storageRef = ref(storage, `products/${ref_code}/${fileName}`);
    
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const generateMappingJSON = (results: any[]) => {
    // Group by REF
    const mapping: Record<string, any> = {};
    
    results.forEach(result => {
      if (result.success) {
        if (!mapping[result.ref]) {
          mapping[result.ref] = {
            ref: result.ref,
            folderName: result.folderName,
            images: []
          };
        }
        mapping[result.ref].images.push(result.firebaseURL);
      }
    });

    // Set primary image (first image)
    Object.keys(mapping).forEach(ref => {
      if (mapping[ref].images.length > 0) {
        mapping[ref].primaryImage = mapping[ref].images[0];
      }
    });

    console.log('Generated Firebase image mapping:', mapping);
    
    // Download as JSON
    const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'firebase-image-mapping.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Cloud className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
            <p className="text-lg">Initializing Firebase...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg">Authentication required to upload images</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <Cloud className="h-8 w-8 mr-2" />
        Firebase Storage Upload - 150 Folders
      </h1>
      <p className="text-gray-600 mb-8">Upload all your TR folders directly to Firebase Storage</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload to Firebase
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
              <option value={3}>3 folders (Very Safe)</option>
              <option value={5}>5 folders (Recommended)</option>
              <option value={10}>10 folders (Fast)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Smaller batches prevent Firebase rate limits
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
            
            <Cloud className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Select all 150 TR folders (Ctrl+A)
            </p>
            <p className="text-gray-500 mb-4">
              They will be uploaded to Firebase Storage
            </p>
            
            <button
              onClick={triggerFileInput}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading to Firebase...' : 'Select All Folders'}
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
              {currentFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Uploading: {currentFile}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Firebase Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Firebase Storage Benefits
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Why Firebase Storage?</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                <li>☁️ Cloud storage - no local storage needed</li>
                <li>🚀 Fast CDN delivery worldwide</li>
                <li>🔒 Secure and scalable</li>
                <li>💰 Free tier: 5GB storage, 1GB/day download</li>
                <li>🔗 Direct URLs for each image</li>
                <li>📱 Works perfectly with web and mobile</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
              <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
                <li>Select all 150 TR folders with Ctrl+A</li>
                <li>Upload to Firebase Storage</li>
                <li>System generates image mapping JSON</li>
                <li>Process Excel with Firebase URLs</li>
                <li>Images served from Firebase CDN</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-blue-800 mb-2">Structure:</h3>
              <div className="bg-white p-3 rounded border text-xs font-mono">
                products/
                <br />
                ├── TR1/
                <br />
                │   ├── image1.jpg
                <br />
                │   └── image2.jpg
                <br />
                ├── TR2/
                <br />
                └── TR100/
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
                    <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                      {result.ref}
                    </span>
                  </div>
                  {result.success ? (
                    <p className="text-xs text-green-600 truncate">
                      {result.firebaseURL}
                    </p>
                  ) : (
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
              onClick={() => generateMappingJSON(uploadResults)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Download Firebase Mapping JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

