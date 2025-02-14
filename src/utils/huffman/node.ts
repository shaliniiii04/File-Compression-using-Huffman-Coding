import type { HuffmanNode } from './types';

export class HuffmanTreeNode implements HuffmanNode {
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