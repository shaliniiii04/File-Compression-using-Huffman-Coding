export interface HuffmanNode {
    char: string;
    frequency: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;
  }
  
  export interface CompressionResult {
    encodedData: string;
    treeData: string;
  }
  
  export interface CompressionStats {
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  }