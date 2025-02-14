# Huffman Compression Tool

A modern web application for lossless text compression using the Huffman coding algorithm. Built with React, TypeScript, and Tailwind CSS.

[Screenshot 2025-02-14 235854](https://github.com/user-attachments/assets/a6a42356-05b3-4c7a-9d61-e62d005efd81)


## Features

- 🚀 **Efficient Compression**: Reduce file sizes using advanced Huffman coding
- 📝 **Text File Support**: Compress various text-based formats (.txt, .html, .css, .js, etc.)
- 🔄 **Lossless Compression**: No data loss during compression/decompression
- 📊 **Real-time Statistics**: View compression ratios and file size details
- 💪 **Large File Support**: Handle files up to 50MB
- 🎯 **User-Friendly Interface**: Modern, intuitive design with drag-and-drop support

## Live Demo

[View Live Demo](#) [<!-- Add your deployed site URL here -->](https://filecompression.netlify.app/)

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- React Router DOM
- React Dropzone

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/huffman-compression.git
```

2. Navigate to the project directory
```bash
cd huffman-compression
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Compressing Files

1. Navigate to the "Compress" page
2. Drag and drop a text file or click to select one
3. Wait for the compression to complete
4. View compression statistics
5. Download the compressed file

### Decompressing Files

1. Navigate to the "Decompress" page
2. Upload a previously compressed .bin file
3. Wait for the decompression to complete
4. Download the original file

## How It Works

### Huffman Coding Algorithm

The application uses Huffman coding, a lossless data compression algorithm that works by:

1. Analyzing character frequencies in the input text
2. Building a Huffman tree based on these frequencies
3. Generating variable-length codes for each character
4. Encoding the text using these codes

Benefits:
- More frequent characters get shorter codes
- Less frequent characters get longer codes
- Results in optimal prefix-free codes

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── utils/
│   └── huffman/       # Huffman coding implementation
├── hooks/             # Custom React hooks
└── main.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request


## Acknowledgments

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Huffman Coding - Wikipedia](https://en.wikipedia.org/wiki/Huffman_coding)
