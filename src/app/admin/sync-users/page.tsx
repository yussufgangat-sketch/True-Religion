'use client';

import { useState } from 'react';
import { RefreshCw, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function SyncUsersPage() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSync = async () => {
    setSyncing(true);
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
        error: 'Failed to sync users'
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-blue-600" />
              Sync Firebase Auth Users
            </h1>
            <p className="mt-2 text-gray-600">
              Sync your existing Firebase Authentication users with the admin user management system.
            </p>
          </div>
          
          <div className="px-6 py-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    What this does:
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Finds all users who signed up through your website's sign-up form</li>
                      <li>Creates corresponding entries in the admin user management system</li>
                      <li>Preserves their email addresses and creation dates</li>
                      <li>Sets them as regular users (not admins) by default</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? (
                <>
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Syncing Users...
                </>
              ) : (
                <>
                  <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
                  Sync Firebase Auth Users
                </>
              )}
            </button>

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
                      {result.success ? 'Sync Completed Successfully!' : 'Sync Failed'}
                    </h3>
                    <div className={`mt-2 text-sm ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.success ? (
                        <div>
                          <p><strong>Total Firebase Auth Users:</strong> {result.stats?.totalAuthUsers || 0}</p>
                          <p><strong>New Users Synced:</strong> {result.stats?.synced || 0}</p>
                          <p><strong>Users Already Existed:</strong> {result.stats?.skipped || 0}</p>
                          <p className="mt-2 text-green-600">
                            ✅ Your Firebase Auth users can now log in to the admin system!
                          </p>
                        </div>
                      ) : (
                        <p>Error: {result.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>After syncing, go to <code className="bg-gray-200 px-2 py-1 rounded">/admin/users</code> to see all your users</li>
                <li>You can edit user roles and permissions from the user management page</li>
                <li>Users can now log in to the admin system using their original email and password</li>
                <li>New users who sign up will automatically be added to the admin system</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



