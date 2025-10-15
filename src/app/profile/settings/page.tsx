"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { firebaseAuth as auth } from "@/lib/firebaseClient";
import { onAuthStateChanged, updatePassword, deleteUser, signOut, User as FirebaseUser } from "firebase/auth";
import { User, Settings, ArrowLeft, Mail, Lock, Bell, Shield, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      return;
    }

    if (!auth || !user) {
      setMessage("Authentication error");
      setMessageType("error");
      return;
    }

    // Check if user has recently authenticated (required for password updates)
    const lastSignInTime = user.metadata.lastSignInTime;
    const now = new Date();
    const lastSignIn = lastSignInTime ? new Date(lastSignInTime) : null;
    
    if (lastSignIn) {
      const timeDiff = now.getTime() - lastSignIn.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff > 1) {
        setMessage("For security reasons, please sign out and sign back in before changing your password.");
        setMessageType("error");
        return;
      }
    }

    try {
      console.log("Attempting to update password for user:", user.email);
      console.log("Last sign in time:", lastSignInTime);
      await updatePassword(user, newPassword);
      console.log("Password updated successfully");
      setMessage("Password updated successfully!");
      setMessageType("success");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      console.error("Error updating password:", error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to update password. Please try again.";
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        console.log("Firebase error code:", firebaseError.code);
        
        switch (firebaseError.code) {
          case 'auth/requires-recent-login':
            errorMessage = "For security reasons, please sign out and sign back in before changing your password.";
            break;
          case 'auth/weak-password':
            errorMessage = "Password is too weak. Please choose a stronger password.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          case 'auth/user-mismatch':
            errorMessage = "Authentication error. Please sign out and sign back in.";
            break;
          case 'auth/user-not-found':
            errorMessage = "User not found. Please sign out and sign back in.";
            break;
          case 'auth/invalid-credential':
            errorMessage = "Invalid credentials. Please sign out and sign back in.";
            break;
          default:
            errorMessage = `Password update failed: ${firebaseError.message}`;
        }
      }
      
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error signing out:", error);
      setMessage("Error signing out. Please try again.");
      setMessageType("error");
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth || !user) {
      setMessage("Authentication error");
      setMessageType("error");
      return;
    }

    try {
      await deleteUser(user);
      setMessage("Account deleted successfully. Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: unknown) {
      console.error("Error deleting account:", error);
      setMessage("Failed to delete account. Please try again.");
      setMessageType("error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="bg-gray-200 rounded-full p-3">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.email}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="inline w-4 h-4 mr-2" />
                  Account Status
                </label>
                <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Change Password
            </h2>
            
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Security Note:</strong> For password changes, you may need to sign out and sign back in first. 
                This is a security requirement from Firebase.
              </p>
            </div>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black text-black"
                  placeholder="Enter new password (min. 6 characters)"
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black text-black"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>
              
              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  messageType === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {message}
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Update Password
                </button>
                
                {messageType === "error" && message.includes("sign out") && (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Sign Out & Sign Back In
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive updates about orders and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Order Updates</h3>
                  <p className="text-sm text-gray-600">Get notified about order status changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
                     </div>

           {/* Delete Account */}
           <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
             <h2 className="text-xl font-semibold text-red-900 mb-6 flex items-center">
               <Trash2 className="h-5 w-5 mr-2" />
               Delete Account
             </h2>
             
             <div className="space-y-4">
               <div className="bg-red-50 p-4 rounded-md">
                 <p className="text-sm text-red-700 mb-3">
                   <strong>Warning:</strong> This action cannot be undone. All your data will be permanently deleted.
                 </p>
                 <ul className="text-sm text-red-600 space-y-1">
                   <li>• Your account will be permanently removed</li>
                   <li>• All order history will be deleted</li>
                   <li>• You will lose access to all services</li>
                 </ul>
               </div>
               
               {!showDeleteConfirm ? (
                 <button
                   onClick={() => setShowDeleteConfirm(true)}
                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                 >
                   Delete My Account
                 </button>
               ) : (
                 <div className="space-y-3">
                   <p className="text-sm text-gray-700">
                     Are you sure you want to delete your account? This action cannot be undone.
                   </p>
                   <div className="flex space-x-3">
                     <button
                       onClick={handleDeleteAccount}
                       className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                     >
                       Yes, Delete My Account
                     </button>
                     <button
                       onClick={() => setShowDeleteConfirm(false)}
                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                     >
                       Cancel
                     </button>
                   </div>
                 </div>
               )}
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }
