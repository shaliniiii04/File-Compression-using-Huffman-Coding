import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { DownloadInfo } from '../components/DownloadInfo';
import { useDecompression } from '../hooks/useDecompression';

export const DecompressPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { decompressFile, decompressedSize, downloadDecompressed } = useDecompression();

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    await decompressFile(selectedFile);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Decompress Files
        </h1>
        <p className="text-lg text-gray-600">
          Restore your compressed files to their original format
        </p>
      </div>

      <div className="space-y-8">
        <FileUpload 
          onFileSelect={handleFileSelect}
          mode="decompress"
        />

        {file && decompressedSize && (
          <DownloadInfo
            fileName={file.name}
            fileSize={file.size}
            mode="decompress"
            onDownload={downloadDecompressed}
          />
        )}
      </div>
    </div>
  );
};