import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  mode: 'compress' | 'decompress';
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, mode }) => {
  const acceptedFiles: Record<string, string[]> = mode === 'compress'
    ? { 'text/*': ['.txt', '.html', '.css', '.js', '.json', '.md'], 'application/octet-stream': [] }
    : { 'application/octet-stream': ['.bin'], 'text/*': [] };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  });

  const message = mode === 'compress'
    ? {
        drag: 'Drop your text file here...',
        normal: 'Drag & drop a text file here, or click to select',
        formats: 'Supported files: .txt, .html, .css, .js, .json, .md (Max 50MB)'
      }
    : {
        drag: 'Drop your compressed file here...',
        normal: 'Drag & drop a compressed file here, or click to select',
        formats: 'Supported files: .bin (Max 50MB)'
      };

  return (
    <div
      {...getRootProps()}
      className="p-8 rounded-xl cursor-pointer transition-all duration-300
        bg-gradient-to-br from-gray-50 to-gray-100 shadow-md hover:shadow-lg"
    >
      <input {...getInputProps()} />
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="flex flex-col items-center text-gray-600">
          <Upload className="w-12 h-12 mb-4 text-blue-500" />
          {isDragActive ? (
            <p className="font-semibold text-blue-600">{message.drag}</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-800">{message.normal}</p>
              <p className="mt-2 text-sm text-gray-500">{message.formats}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
