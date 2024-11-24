import React from 'react';
import { Upload, Shield } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => (
  <div className="mb-12 text-center">
    <div className="max-w-xl mx-auto bg-gray-900/50 p-8 rounded-lg border border-gray-800">
      <Shield className="w-16 h-16 mx-auto mb-4 text-pink-500" />
      <h2 className="text-2xl font-bold mb-4">AI-DRIVEN ETHEREUM SECURITY</h2>
      <p className="mb-6 text-gray-400">Upload your transaction dataset for instant fraud analysis</p>
      
      <label className="relative inline-block">
        <input
          type="file"
          accept=".csv"
          onChange={onFileUpload}
          className="hidden"
        />
        <div className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full cursor-pointer flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Dataset
        </div>
      </label>
    </div>
  </div>
);