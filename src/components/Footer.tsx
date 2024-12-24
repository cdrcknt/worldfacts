import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>Developed by Cedric Kent Centeno</p>
        </div>
        <div className="flex space-x-6">
          <a href="mailto:cdrcknt@gmail.com" className="hover:text-blue-400 transition-colors">
            <i className="fas fa-envelope text-xl"></i>
          </a>
          <a href="https://github.com/cdrcknt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}