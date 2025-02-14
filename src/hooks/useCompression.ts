import { useState } from 'react';
import { HuffmanCoding } from '../utils/huffman/huffman';
import { combineData } from '../utils/huffman/formate';
import  { CompressionStats } from '../utils/huffman/types';

export const useCompression = () => {
  const [stats, setStats] = useState<CompressionStats | null>(null);
  const [compressedData, setCompressedData] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const compressFile = async (file: File) => {
    const text = await file.text();
    const huffman = new HuffmanCoding();
    const { encodedData, treeData } = huffman.compress(text);
    
    // Combine data with header
    const combinedData = combineData(treeData, encodedData);
    
    // Convert binary string to Uint8Array
    const bytes = new Uint8Array(Math.ceil(combinedData.length / 8));
    for (let i = 0; i < combinedData.length; i += 8) {
      bytes[i / 8] = parseInt(combinedData.substr(i, 8), 2);
    }

    setCompressedData(bytes);
    setFileName(file.name);

    const compressionStats = huffman.getCompressionStats(text, encodedData);
    setStats(compressionStats);
  };

  const downloadCompressed = () => {
    if (!compressedData || !fileName) return;

    const blob = new Blob([compressedData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.split('.')[0]}-compressed.bin`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { compressFile, stats, downloadCompressed };
}