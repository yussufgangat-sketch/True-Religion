"use client";

import Image from 'next/image';
import { useState, useRef } from 'react';
import { uploadImage, getImagesByCategory, UploadedImage } from '@/lib/imageUpload';
import { Upload, Image as ImageIcon, Trash2, Eye } from 'lucide-react';

export default function ImageUploadPage() {
  const [selectedCategory, setSelectedCategory] = useState<'male' | 'female' | 'hero' | 'banner'>('male');
  const [selectedSubfolder, setSelectedSubfolder] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploaded: UploadedImage[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await uploadImage(file, selectedCategory, selectedSubfolder || undefined);
        uploaded.push(result);
      }

      setUploadedImages(prev => [...uploaded, ...prev]);
      alert(`Successfully uploaded ${uploaded.length} image(s)!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const loadImages = async () => {
    setLoadingImages(true);
    try {
      const images = await getImagesByCategory(selectedCategory, selectedSubfolder || undefined);
      setUploadedImages(images);
    } catch (error) {
      console.error('Error loading images:', error);
      alert('Error loading images. Please try again.');
    } finally {
      setLoadingImages(false);
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Image Upload Manager</h1>

          {/* Upload Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Images</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as 'male' | 'female' | 'hero' | 'banner')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male Products</option>
                  <option value="female">Female Products</option>
                  <option value="hero">Hero Images</option>
                  <option value="banner">Banner Images</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subfolder (Optional)
                </label>
                <input
                  type="text"
                  value={selectedSubfolder}
                  onChange={(e) => setSelectedSubfolder(e.target.value)}
                  placeholder="e.g., jeans, shirts, accessories"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Select Images'}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>• Supported formats: JPG, PNG, GIF, WebP</p>
              <p>• Maximum file size: 10MB per image</p>
              <p>• Images will be automatically optimized</p>
            </div>
          </div>

          {/* Load Images Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Manage Images</h2>
              <button
                onClick={loadImages}
                disabled={loadingImages}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>{loadingImages ? 'Loading...' : 'Load Images'}</span>
              </button>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="relative aspect-square mb-3">
                                             <Image
                         src={image.url}
                         alt={image.name}
                         fill
                         className="object-cover rounded-lg"
                       />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
                      <p className="text-xs text-gray-500 truncate">{image.path}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyImageUrl(image.url)}
                          className="flex-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Copy URL</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this image?')) {
                              // Delete functionality would be implemented here
                              setUploadedImages(prev => prev.filter((_, i) => i !== index));
                            }
                          }}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {uploadedImages.length === 0 && !loadingImages && (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                 <p>No images found. Upload some images or click &quot;Load Images&quot; to see existing ones.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
