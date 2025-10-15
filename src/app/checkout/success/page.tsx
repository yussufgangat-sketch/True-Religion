"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Mail, Home, ShoppingBag } from "lucide-react";
import { Suspense } from "react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const emailFailed = searchParams.get('email') === 'failed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6 shadow-lg">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          {/* Email Status */}
          {emailFailed ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">
                  Order confirmation email could not be sent. Please check your email address.
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">
                  Order confirmation has been sent to your email.
                </span>
              </div>
            </div>
          )}


          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/products"
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
            <div className="flex items-center justify-center text-sm">
              <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
