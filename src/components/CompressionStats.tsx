import React from 'react';
import { BarChart2 } from 'lucide-react';

interface CompressionStatsProps {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export const CompressionStats: React.FC<CompressionStatsProps> = ({
  originalSize,
  compressedSize,
  compressionRatio
}) => {
  const formatSize = (bits: number): string => {
    const bytes = bits / 8;
    if (bytes < 1024) return `${bytes.toFixed(2)} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <BarChart2 className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">Compression Statistics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">Original Size</p>
          <p className="text-lg font-semibold">{formatSize(originalSize)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">Compressed Size</p>
          <p className="text-lg font-semibold">{formatSize(compressedSize)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">Compression Ratio</p>
          <p className="text-lg font-semibold">{compressionRatio.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};