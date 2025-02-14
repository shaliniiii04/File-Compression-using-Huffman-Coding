import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Upload } from 'lucide-react';
export default function HomePage() {
    // component code here
    return(
        <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Efficient File Compression</h1>
            <p className="text-lg text-gray-600">
          Efficient lossless data compression and decompression using Huffman coding algorithm
        </p>
        </div>


        <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Link
          to="/compress"
          className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Compress Files</h2>
            <p className="text-gray-600 text-center">
              Reduce file size using advanced Huffman coding compression
            </p>
          </div>
        </Link>

        <Link
          to="/decompress"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center">
            <Download className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Decompress Files</h2>
            <p className="text-gray-600 text-center">
              Restore compressed files to their original format
            </p>
          </div>
        </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">How it Works</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Huffman Coding Algorithm</h3>
            <p className="text-gray-600">
              Huffman coding is a lossless data compression algorithm that assigns variable-length codes
              to characters based on their frequency of occurrence. More frequent characters get shorter
              codes, resulting in efficient compression.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Support for various text-based file formats (.txt, .html, .js, etc.)</li>
              <li>Advanced compression with optimal Huffman tree generation</li>
              <li>Lossless compression - no data loss during compression/decompression</li>
              <li>Real-time compression statistics</li>
              <li>Large file support (up to 50MB)</li>
            </ul>
          </div>
        </div>
      </div>
        </div>
    );                              

  }