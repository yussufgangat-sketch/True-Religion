# Firebase Authentication Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "true-religion-store")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle the "Enable" switch
   - Click "Save"

## Step 3: Get Your Firebase Configuration

1. In the Firebase console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "true-religion-web")
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 4: Configure Environment Variables

1. Copy the `.env.local.example` file to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

## Step 5: Test Authentication

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to `/login` page
3. Try creating a new account or signing in
4. Check the Firebase console to see if users are being created

## Features Now Available

- ✅ **User Registration**: Create new accounts with email/password
- ✅ **User Login**: Sign in with existing accounts
- ✅ **Authentication State**: User state is managed across the app
- ✅ **Logout**: Users can sign out from the navbar
- ✅ **Protected Routes**: Can be implemented using the AuthContext
- ✅ **Error Handling**: Proper error messages for authentication failures

## Troubleshooting

- **"Authentication service is not available"**: Check your environment variables
- **"Invalid API key"**: Verify your Firebase configuration
- **"User not found"**: Make sure Email/Password auth is enabled in Firebase

## Next Steps

- Add password reset functionality
- Implement email verification
- Add social authentication (Google, Facebook, etc.)
- Create protected routes for user profiles
