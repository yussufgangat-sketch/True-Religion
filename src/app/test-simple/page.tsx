'use client';

import { useState } from 'react';

export default function TestSimplePage() {
  const [firebaseResult, setFirebaseResult] = useState<any>(null);
  const [nodemailerResult, setNodemailerResult] = useState<any>(null);
  const [loading, setLoading] = useState({ firebase: false, nodemailer: false });

  const testFirebase = async () => {
    setLoading(prev => ({ ...prev, firebase: true }));
    try {
      const response = await fetch('/api/firebase-simple-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'firebase' })
      });
      
      const data = await response.json();
      setFirebaseResult(data);
    } catch (error) {
      setFirebaseResult({ error: error.message });
    }
    setLoading(prev => ({ ...prev, firebase: false }));
  };

  const testNodemailer = async () => {
    setLoading(prev => ({ ...prev, nodemailer: true }));
    try {
      const response = await fetch('/api/nodemailer-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'nodemailer' })
      });
      
      const data = await response.json();
      setNodemailerResult(data);
    } catch (error) {
      setNodemailerResult({ error: error.message });
    }
    setLoading(prev => ({ ...prev, nodemailer: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Firebase & Nodemailer Tests</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Firebase Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Firebase Test</h2>
            <button
              onClick={testFirebase}
              disabled={loading.firebase}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-4"
            >
              {loading.firebase ? 'Testing Firebase...' : 'Test Firebase'}
            </button>

            {firebaseResult && (
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Firebase Results:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(firebaseResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Nodemailer Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Nodemailer Test</h2>
            <button
              onClick={testNodemailer}
              disabled={loading.nodemailer}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 mb-4"
            >
              {loading.nodemailer ? 'Testing Nodemailer...' : 'Test Nodemailer'}
            </button>

            {nodemailerResult && (
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Nodemailer Results:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(nodemailerResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">📧 Nodemailer Setup Required</h3>
          <p className="text-blue-700 mb-4">
            To use Nodemailer, you need to set up Gmail App Password:
          </p>
          <ol className="list-decimal list-inside text-blue-700 space-y-2">
            <li>Go to <a href="https://myaccount.google.com/security" target="_blank" className="text-blue-600 underline">Google Account Security</a></li>
            <li>Enable <strong>2-Factor Authentication</strong> if not already enabled</li>
            <li>Go to <strong>App passwords</strong> section</li>
            <li>Generate a new app password for "Mail"</li>
            <li>Copy the 16-character password</li>
            <li>Replace <code>your_app_password_here</code> in the code with your actual app password</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
