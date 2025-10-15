'use client';

import { useState } from 'react';
// import { CSVDataProcessor } from '../../../scripts/process-csv-data';

export default function UploadExcelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const processFile = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // This page is deprecated - use the command line: npm run process-excel
      setError('Please use command line: npx tsx scripts/process-truereligion-excel.ts products.csv');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred processing the file');
    } finally {
      setProcessing(false);
    }
  };

  const downloadProductsFile = () => {
    if (!result?.productsFileContent) return;

    const blob = new Blob([result.productsFileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-updated.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadProcessedData = () => {
    if (!result?.products) return;

    const data = {
      processedAt: new Date().toISOString(),
      totalProducts: result.products.length,
      products: result.products
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed-products.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload Excel Data</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
            Select Excel/CSV File
          </label>
          <input
            type="file"
            id="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {file && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Selected file: <span className="font-medium">{file.name}</span> ({file.size} bytes)
            </p>
          </div>
        )}

        <button
          onClick={processFile}
          disabled={!file || processing}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Process File'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Processing Complete!
              </h3>
              <p className="text-green-600">
                Successfully processed {result.totalProducts} products.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={downloadProductsFile}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
              >
                Download Updated Products.ts
              </button>
              
              <button
                onClick={downloadProcessedData}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Download Processed Data (JSON)
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Sample Products:</h4>
              <div className="max-h-96 overflow-y-auto border rounded-md">
                <pre className="p-4 text-sm bg-gray-50">
                  {JSON.stringify(result.products.slice(0, 3), null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>Export your Excel file as CSV format</li>
          <li>Make sure your CSV has these columns: REF, Supplier Code, Gender, Colour, Description, Wholesale Price, Category, and size columns (28, 29, 30, etc. for men; XS, S, M, etc. for women)</li>
          <li>Upload the CSV file using the form above</li>
          <li>Click "Process File" to analyze and match with existing images</li>
          <li>Download the generated products.ts file and processed data</li>
        </ol>
      </div>
    </div>
  );
}

