import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Navigation} from './components/Navigation';
import {CompressPage} from './pages/CompressPage';
import{ DecompressPage} from './pages/DecompressPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/decompress" element={<DecompressPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;