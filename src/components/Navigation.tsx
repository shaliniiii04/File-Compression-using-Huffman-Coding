import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText,Combine ,Split,Upload,Download,Github,Linkedin} from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto sm:px-6 ">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Huffman Coding
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            
            <Link
              to="/compress"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/compress')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Combine className="mr-2 h-4 w-4 " />
              Compress 
            </Link>
            <Link
              to="/decompress"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/decompress')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Split className="mr-2 h-4 w-4 " />
              Decompress
            </Link>
            <div className="flex items-center space-x-4 border-l pl-4">
              <a
                href="https://github.com/shaliniiii04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                title="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shalini-gupta-033467248/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}