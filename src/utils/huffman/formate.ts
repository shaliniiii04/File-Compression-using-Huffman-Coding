// Data format utilities for Huffman compression
export const HEADER_LENGTH = 32; // 32 bits for storing tree data length
export const CHAR_LENGTH = 16; // 16 bits for storing character codes

export function encodeChar(char: string): string {
  return char.charCodeAt(0).toString(2).padStart(CHAR_LENGTH, '0');
}

export function decodeChar(binary: string): string {
  return String.fromCharCode(parseInt(binary, 2));
}

export function createHeader(treeDataLength: number): string {
  return treeDataLength.toString(2).padStart(HEADER_LENGTH, '0');
}

export function parseHeader(data: string): number {
  return parseInt(data.slice(0, HEADER_LENGTH), 2);
}

export function combineData(treeData: string, encodedData: string): string {
  const header = createHeader(treeData.length);
  return header + treeData + encodedData;
}

export function separateData(data: string): { treeData: string; encodedData: string } {
  const treeDataLength = parseHeader(data);
  const treeData = data.slice(HEADER_LENGTH, HEADER_LENGTH + treeDataLength);
  const encodedData = data.slice(HEADER_LENGTH + treeDataLength);
  return { treeData, encodedData };
}