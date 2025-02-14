import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { CompressionStats } from '../components/CompressionStats';
import { DownloadInfo } from '../components/DownloadInfo';
import { useCompression } from '../hooks/useCompression';

export const CompressPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { compressFile, stats, downloadCompressed } = useCompression();

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    await compressFile(selectedFile);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Compress Files
        </h1>
        <p className="text-lg text-gray-600">
          Upload your text files for efficient compression
        </p>
      </div>

      <div className="space-y-8">
        <FileUpload 
          onFileSelect={handleFileSelect}
          mode="compress"
        />

        {file && stats && (
          <DownloadInfo
            fileName={file.name}
            fileSize={file.size}
            mode="compress"
            compressionStats={stats}
            onDownload={downloadCompressed}
          />
        )}

        {stats && <CompressionStats {...stats} />}
      </div>
    </div>
  );
};