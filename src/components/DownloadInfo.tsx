import React from 'react';
import { Download, FileText, Info } from 'lucide-react';

interface DownloadInfoProps {
  fileName: string;
  fileSize: number;
  mode: 'compress' | 'decompress';
  compressionStats?: {
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  };
  onDownload: () => void;
}

export const DownloadInfo: React.FC<DownloadInfoProps> = ({
  fileName,
  fileSize,
  mode,
  compressionStats,
  onDownload,
}) => {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getOutputFileName = () => {
    if (mode === 'compress') {
      return `${fileName.split('.')[0]}-compressed.bin`;
    }
    return `${fileName.split('-compressed')[0]}-decompressed.txt`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-blue-500 mr-2" />
          <div>
            <h3 className="font-medium">File Details</h3>
            <p className="text-sm text-gray-600">{fileName}</p>
          </div>
        </div>
        <button
          onClick={onDownload}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download {mode === 'compress' ? 'Compressed' : 'Decompressed'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Input File Size</p>
            <p className="text-lg font-semibold">{formatSize(fileSize)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Output File Name</p>
            <p className="text-lg font-semibold truncate">{getOutputFileName()}</p>
          </div>
        </div>

        {mode === 'compress' && compressionStats && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <div className="flex items-center mb-2">
              <Info className="w-4 h-4 text-blue-500 mr-2" />
              <h4 className="font-medium">Compression Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Compressed Size</p>
                <p className="font-semibold">{formatSize(compressionStats.compressedSize / 8)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Space Saved</p>
                <p className="font-semibold text-green-600">
                  {compressionStats.compressionRatio.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};