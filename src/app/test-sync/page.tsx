'use client';

import { useState } from 'react';
import { RefreshCw, Users, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';

export default function TestSyncPage() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testSync = async () => {
    setTesting(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/sync-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to test sync'
      });
    } finally {
      setTesting(false);
    }
  };

  const testLogin = async () => {
    setTesting(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@truereligion.com',
          password: 'admin123'
        })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to test login'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-blue-600" />
              Test Firebase Auth Sync
            </h1>
            <p className="mt-2 text-gray-600">
              Test the Firebase Auth integration and user sync functionality.
            </p>
          </div>
          
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Sync */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-3">Test User Sync</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Create default test users in the admin system.
                </p>
                <button
                  onClick={testSync}
                  disabled={testing}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testing ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <UserPlus className="-ml-1 mr-2 h-4 w-4" />
                      Test Sync
                    </>
                  )}
                </button>
              </div>

              {/* Test Login */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-900 mb-3">Test Admin Login</h3>
                <p className="text-sm text-green-700 mb-4">
                  Test logging in with admin credentials.
                </p>
                <button
                  onClick={testLogin}
                  disabled={testing}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testing ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
                      Test Login
                    </>
                  )}
                </button>
              </div>
            </div>

            {result && (
              <div className={`mt-6 p-4 rounded-lg ${
                result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${
                      result.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.success ? 'Test Successful!' : 'Test Failed'}
                    </h3>
                    <div className={`mt-2 text-sm ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Test Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-700">Admin User:</h4>
                  <p className="text-gray-600">Email: admin@truereligion.com</p>
                  <p className="text-gray-600">Password: admin123</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Regular User:</h4>
                  <p className="text-gray-600">Email: user@truereligion.com</p>
                  <p className="text-gray-600">Password: user123</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Next Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
                <li>Test the sync functionality above</li>
                <li>Go to <code className="bg-blue-200 px-2 py-1 rounded">/admin/login</code> to test admin login</li>
                <li>Go to <code className="bg-blue-200 px-2 py-1 rounded">/admin/users</code> to see all users</li>
                <li>Create a new account on <code className="bg-blue-200 px-2 py-1 rounded">/login</code> to test automatic sync</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



