import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { firebaseStorage } from './firebaseClient';

export interface UploadedImage {
  url: string;
  name: string;
  path: string;
}

export const uploadImage = async (
  file: File, 
  category: 'male' | 'female' | 'hero' | 'banner',
  subfolder?: string
): Promise<UploadedImage> => {
  if (!firebaseStorage) {
    throw new Error('Firebase Storage is not initialized');
  }

  // Create a unique filename
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  
  // Create the storage path
  const path = subfolder 
    ? `products/${category}/${subfolder}/${fileName}`
    : `products/${category}/${fileName}`;
  
  const storageRef = ref(firebaseStorage, path);
  
  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);
  
  // Get the download URL
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return {
    url: downloadURL,
    name: fileName,
    path: path
  };
};

export const getImagesByCategory = async (
  category: 'male' | 'female' | 'hero' | 'banner',
  subfolder?: string
): Promise<UploadedImage[]> => {
  if (!firebaseStorage) {
    throw new Error('Firebase Storage is not initialized');
  }

  const path = subfolder 
    ? `products/${category}/${subfolder}`
    : `products/${category}`;
  
  const listRef = ref(firebaseStorage, path);
  const result = await listAll(listRef);
  
  const images: UploadedImage[] = [];
  
  for (const itemRef of result.items) {
    const downloadURL = await getDownloadURL(itemRef);
    images.push({
      url: downloadURL,
      name: itemRef.name,
      path: itemRef.fullPath
    });
  }
  
  return images;
};

export const deleteImage = async (path: string): Promise<void> => {
  if (!firebaseStorage) {
    throw new Error('Firebase Storage is not initialized');
  }

  // Note: You'll need to import deleteObject from firebase/storage
  // const imageRef = ref(firebaseStorage, path);
  // const { deleteObject } = await import('firebase/storage');
  // await deleteObject(imageRef);
  
  console.log('Delete functionality would be implemented here');
};
