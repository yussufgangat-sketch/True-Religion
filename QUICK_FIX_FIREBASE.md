# Quick Fix for Firebase Upload

## The Issue
Firebase Storage requires authentication to upload files.

## The Solution
I've updated the code to automatically sign you in anonymously. Now you need to enable anonymous authentication in Firebase:

### Step 1: Enable Anonymous Authentication

1. Go to **Firebase Console**: https://console.firebase.google.com/project/true-religion-1363f
2. Click on **Authentication** in the left sidebar
3. Click on **Sign-in method** tab
4. Find **Anonymous** in the list
5. Click on **Anonymous**
6. Toggle **Enable** to ON
7. Click **Save**

### Step 2: Refresh and Upload

1. Refresh your browser page: `http://localhost:3000/admin/firebase-upload`
2. The page will automatically sign you in
3. Select all 150 folders (Ctrl+A)
4. Upload to Firebase!

## Done!

Once anonymous authentication is enabled, you can upload all your 150 folders without any permission errors.

The system will:
- Automatically authenticate you
- Upload all folders to Firebase Storage
- Generate the image mapping JSON
- Be ready to match with your Excel data



