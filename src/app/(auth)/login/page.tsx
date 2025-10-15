"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth as auth } from "@/lib/firebaseClient";
import { Eye, EyeOff, ArrowLeft, User, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const router = useRouter();

  // Get redirect parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    if (redirect) {
      const decodedPath = decodeURIComponent(redirect);
      setRedirectPath(decodedPath);
      console.log('🔍 Login redirect path set:', decodedPath);
    }
  }, []);

  // Check if user is already authenticated
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to intended destination or home page
        redirectAfterLogin();
      }
    });

    return () => unsubscribe();
  }, [router, redirectPath]);

  // Function to redirect user after login
  const redirectAfterLogin = () => {
    console.log('🔍 redirectAfterLogin called, redirectPath:', redirectPath);
    if (redirectPath && redirectPath !== '/login' && redirectPath !== '/') {
      console.log('🔍 Redirecting to intended destination:', redirectPath);
      router.push(redirectPath);
    } else {
      console.log('🔍 No valid redirect path, going to home page');
      router.push("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Check if Firebase auth is available
    if (!auth) {
      console.error('Firebase auth is null - checking configuration...');
      setError("Authentication service is not available. Please check console for details and ensure environment variables are configured.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Successfully signed in! Redirecting...");
      // Redirect to intended destination or home page
      setTimeout(() => redirectAfterLogin(), 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as { code?: string };
        const errorCode = firebaseError.code || 'unknown';
        setError(getErrorMessage(errorCode));
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Username or password incorrect. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      default:
        return "Username or password incorrect. Please try again.";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Enhanced Design */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-red-500/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gray-900/8 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-red-500/6 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex flex-col justify-between h-full p-16">
          {/* Top Section - Brand */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-flex items-center group">
              <div className="text-3xl font-black text-gray-900 tracking-wider group-hover:text-red-600 transition-colors duration-300">
            TRUE RELIGION
              </div>
          </Link>
            
            {/* Brand Tagline */}
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full border border-gray-200 w-fit">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">EST. 2002</span>
            </div>
          </div>
          
          {/* Center Section - Main Content */}
          <div className="flex-1 flex flex-col justify-center text-gray-900">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-6xl font-black leading-[0.9] tracking-tight">
                  AUTHENTIC
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 mt-2">
                    AMERICAN DENIM
                  </span>
                </h1>
                
                {/* Subtitle */}
                <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              </div>
              
              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                Join the True Religion community and discover premium denim crafted with authentic American heritage. Experience the perfect blend of style, comfort, and quality that defines our brand.
              </p>
              
              {/* Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Premium Materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Authentic Heritage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Crafted Excellence</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="text-2xl font-black text-black tracking-wider">
              TRUE RELIGION
            </Link>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to shopping
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your account and continue shopping.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm text-black transition-colors"
                  placeholder="Enter your email address"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm text-black transition-colors"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Sign In
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Admin Notice */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Need an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Contact your administrator to create an account.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
