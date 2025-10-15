"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="bg-blue-100 rounded-full p-3">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
              <p className="text-gray-600">Get in touch with our customer service team</p>
            </div>
          </div>
        </div>
      </div>

             {/* Content */}
       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="space-y-6">
           {/* Contact Information */}
           <div className="bg-white rounded-lg shadow-sm p-6">
             <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
             
             <div className="space-y-4">
               <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                 <div className="bg-blue-100 p-3 rounded-full">
                   <Phone className="h-6 w-6 text-blue-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Phone Number</p>
                   <p className="text-lg font-semibold text-blue-600">079 298 8832</p>
                 </div>
               </div>

               <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                 <div className="bg-green-100 p-3 rounded-full">
                   <Mail className="h-6 w-6 text-green-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Email Address</p>
                   <p className="text-lg font-semibold text-green-600">yussuf@alcaponepremium.co.za</p>
                 </div>
               </div>

               <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                 <div className="bg-yellow-100 p-3 rounded-full">
                   <Clock className="h-6 w-6 text-yellow-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Operating Hours</p>
                   <p className="text-lg font-semibold text-yellow-600">9:00 AM - 5:00 PM</p>
                   <p className="text-sm text-gray-600">Monday - Friday</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Response Time */}
           <div className="bg-white rounded-lg shadow-sm p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-600">Phone Support</span>
                 <span className="text-sm font-medium text-green-600">Immediate</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-600">Email Support</span>
                 <span className="text-sm font-medium text-blue-600">Within 24 hours</span>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}
