import React, { useState, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-green-900 text-white shadow-md py-2'
          : 'bg-transparent text-green-900 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className={`mr-4 p-2 rounded-full ${
                isScrolled ? 'hover:bg-green-800' : 'hover:bg-green-100'
              }`}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-serif font-bold">
                Muslim Rulers of India
              </h1>
              <span className="ml-2 text-xs bg-amber-600 text-white px-2 py-1 rounded-md uppercase tracking-wide">
                UPSC
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            {searchOpen ? (
              <div className="relative animate-fadeIn">
                <input
                  type="text"
                  placeholder="Search rulers, dynasties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`border rounded-full py-1 px-4 pr-8 w-full max-w-xs focus:outline-none ${
                    isScrolled
                      ? 'bg-green-800 border-green-700 text-white placeholder:text-green-300'
                      : 'bg-white border-green-200 text-green-900 placeholder:text-green-500'
                  }`}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-full ${
                  isScrolled ? 'hover:bg-green-800' : 'hover:bg-green-100'
                }`}
                aria-label="Search"
              >
                <Search size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;