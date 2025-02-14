import { HuffmanTreeNode } from './node';
import { encodeChar, decodeChar, CHAR_LENGTH } from './formate';
import type { CompressionResult, CompressionStats, HuffmanNode } from './types';

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
    
    this.frequencyMap.forEach((freq, char) => {
      priorityQueue.push(new HuffmanTreeNode(char, freq));
    });

    priorityQueue.sort((a, b) => a.frequency - b.frequency);

    while (priorityQueue.length > 1) {
      const left = priorityQueue.shift()!;
      const right = priorityQueue.shift()!;
      
      const parent = new HuffmanTreeNode('', left.frequency + right.frequency);
      parent.left = left;
      parent.right = right;
      
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

  private serializeTree(node: HuffmanNode | null): string {
    if (!node) return '';
    
    // Leaf node: 1 + encoded char
    if (!node.left && !node.right) {
      return '1' + encodeChar(node.char);
    }
    
    // Internal node: 0 + left subtree + right subtree
    return '0' + this.serializeTree(node.left) + this.serializeTree(node.right);
  }

  private deserializeTree(data: string, index = 0): [HuffmanNode | null, number] {
    if (index >= data.length) return [null, index];
    
    if (data[index] === '1') {
      const charBinary = data.slice(index + 1, index + 1 + CHAR_LENGTH);
      const char = decodeChar(charBinary);
      return [new HuffmanTreeNode(char, 0), index + 1 + CHAR_LENGTH];
    }
    
    const node = new HuffmanTreeNode('', 0);
    const [left, leftIndex] = this.deserializeTree(data, index + 1);
    const [right, rightIndex] = this.deserializeTree(data, leftIndex);
    
    node.left = left;
    node.right = right;
    
    return [node, rightIndex];
  }

  compress(text: string): CompressionResult {
    this.buildFrequencyMap(text);
    this.buildHuffmanTree();
    this.encodingMap.clear();
    this.buildEncodingMap();

    let encodedData = '';
    for (const char of text) {
      encodedData += this.encodingMap.get(char);
    }

    // Pad the encoded data
    const padding = 8 - (encodedData.length % 8);
    encodedData = encodedData.padEnd(encodedData.length + padding, '0');

    return {
      encodedData,
      treeData: this.serializeTree(this.huffmanTree)
    };
  }

  decompress(encodedData: string, treeData: string): string {
    const [tree] = this.deserializeTree(treeData);
    if (!tree) return '';

    let current = tree;
    let decodedText = '';

    for (const bit of encodedData) {
      if (!current) break;

      current = bit === '0' ? current.left! : current.right!;

      if (!current.left && !current.right) {
        decodedText += current.char;
        current = tree;
      }
    }

    return decodedText;
  }

  getCompressionStats(originalText: string, compressedBits: string): CompressionStats {
    const originalSize = originalText.length * 8;
    const compressedSize = compressedBits.length;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    return {
      originalSize,
      compressedSize,
      compressionRatio
    };
  }
}