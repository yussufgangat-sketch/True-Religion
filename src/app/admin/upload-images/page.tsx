'use client';

import { useState, useRef } from 'react';
import { Upload, Folder, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadImagesPage() {
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

    const results: any[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const result = await uploadFile(file);
        results.push(result);
        setUploadResults([...results]);
        setUploadProgress(((i + 1) / totalFiles) * 100);
      } catch (error) {
        results.push({
          fileName: file.name,
          success: false,
          error: error instanceof Error ? error.message : 'Upload failed'
        });
        setUploadResults([...results]);
      }
    }

    setUploading(false);
  };

  const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const response = await fetch('/api/upload-image', {
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
      <h1 className="text-3xl font-bold mb-8">Upload Product Images</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload Images
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
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag and drop images here
            </p>
            <p className="text-gray-500 mb-4">
              or click to select files
            </p>
            
            <button
              onClick={triggerFileInput}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Select Images'}
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
              <h3 className="font-medium text-blue-800 mb-2">How to organize your images:</h3>
              <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
                <li>Create folders named after your REF codes (e.g., "TR 1", "TR 2", "TR 100")</li>
                <li>Place all images for each product in its corresponding folder</li>
                <li>Use descriptive filenames (e.g., "front.jpg", "back.jpg", "detail.jpg")</li>
                <li>Supported formats: JPG, PNG, WebP, GIF</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-blue-800 mb-2">Example structure:</h3>
              <div className="bg-white p-3 rounded border text-sm font-mono">
                public/images/
                <br />
                ├── TR 1/
                <br />
                │   ├── front.jpg
                <br />
                │   ├── back.jpg
                <br />
                │   └── detail.jpg
                <br />
                ├── TR 2/
                <br />
                │   ├── main.jpg
                <br />
                │   └── side.jpg
                <br />
                └── TR 100/
                <br />
                    ├── 1.jpg
                <br />
                    └── 2.jpg
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Results */}
      {uploadResults.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Results</h2>
          
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
                  <p className="font-medium">{result.fileName}</p>
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


