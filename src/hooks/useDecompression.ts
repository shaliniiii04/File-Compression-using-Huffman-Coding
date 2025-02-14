
import { useState } from 'react';
import { HuffmanCoding } from '../utils/huffman/huffman';
import { separateData } from '../utils/huffman/formate';

export const useDecompression = () => {
  const [decompressedSize, setDecompressedSize] = useState<number | null>(null);
  const [decompressedText, setDecompressedText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const decompressFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Convert bytes to binary string
    let binaryString = '';
    bytes.forEach(byte => {
      binaryString += byte.toString(2).padStart(8, '0');
    });

    // Separate header, tree data, and encoded data
    const { treeData, encodedData } = separateData(binaryString);

    const huffman = new HuffmanCoding();
    const decompressed = huffman.decompress(encodedData, treeData);
    
    setDecompressedText(decompressed);
    setFileName(file.name);
    setDecompressedSize(decompressed.length);
  };

  const downloadDecompressed = () => {
    if (!decompressedText || !fileName) return;

    const blob = new Blob([decompressedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.split('-compressed')[0]}-decompressed.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { decompressFile, decompressedSize, downloadDecompressed };
}