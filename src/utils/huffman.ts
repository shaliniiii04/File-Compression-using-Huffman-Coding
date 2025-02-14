export class HuffmanNode {
    char: string;
    frequency: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;
  
    constructor(char: string, frequency: number) {
      this.char = char;
      this.frequency = frequency;
      this.left = null;
      this.right = null;
    }
  }
  
  export class HuffmanCoding {
    private frequencyMap: Map<string, number>;
    private huffmanTree: HuffmanNode | null;
    private encodingMap: Map<string, string>;
  
    constructor() {
      this.frequencyMap = new Map();
      this.huffmanTree = null;
      this.encodingMap = new Map();
    }
  
    private buildFrequencyMap(text: string): void {
      this.frequencyMap.clear();
      for (const char of text) {
        this.frequencyMap.set(char, (this.frequencyMap.get(char) || 0) + 1);
      }
    }
  
    private buildHuffmanTree(): void {
      const priorityQueue: HuffmanNode[] = [];
      
      // Create leaf nodes for each character
      this.frequencyMap.forEach((freq, char) => {
        priorityQueue.push(new HuffmanNode(char, freq));
      });
  
      // Sort by frequency
      priorityQueue.sort((a, b) => a.frequency - b.frequency);
  
      // Build the tree
      while (priorityQueue.length > 1) {
        const left = priorityQueue.shift()!;
        const right = priorityQueue.shift()!;
        
        const parent = new HuffmanNode('', left.frequency + right.frequency);
        parent.left = left;
        parent.right = right;
        
        // Insert the parent node in the correct position
        let i = 0;
        while (i < priorityQueue.length && priorityQueue[i].frequency < parent.frequency) {
          i++;
        }
        priorityQueue.splice(i, 0, parent);
      }
  
      this.huffmanTree = priorityQueue[0];
    }
  
    private buildEncodingMap(node: HuffmanNode | null = this.huffmanTree, code: string = ''): void {
      if (!node) return;
  
      if (!node.left && !node.right) {
        this.encodingMap.set(node.char, code);
        return;
      }
  
      this.buildEncodingMap(node.left, code + '0');
      this.buildEncodingMap(node.right, code + '1');
    }
  
    compress(text: string): { encodedData: string, tree: HuffmanNode } {
      this.buildFrequencyMap(text);
      this.buildHuffmanTree();
      this.encodingMap.clear();
      this.buildEncodingMap();
  
      let encodedData = '';
      for (const char of text) {
        encodedData += this.encodingMap.get(char);
      }
  
      // Pad the encoded data to ensure it's a multiple of 8
      const padding = 8 - (encodedData.length % 8);
      encodedData = encodedData.padEnd(encodedData.length + padding, '0');
  
      return {
        encodedData,
        tree: this.huffmanTree!
      };
    }
  
    decompress(encodedData: string, tree: HuffmanNode): string {
      let current = tree;
      let decodedText = '';
  
      for (const bit of encodedData) {
        if (!current) break;
  
        if (bit === '0') {
          current = current.left!;
        } else {
          current = current.right!;
        }
  
        if (!current.left && !current.right) {
          decodedText += current.char;
          current = tree;
        }
      }
  
      return decodedText;
    }
  
    getCompressionStats(originalText: string, compressedBits: string): {
      originalSize: number;
      compressedSize: number;
      compressionRatio: number;
    } {
      const originalSize = originalText.length * 8; // in bits
      const compressedSize = compressedBits.length;
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
  
      return {
        originalSize,
        compressedSize,
        compressionRatio
      };
    }
  }