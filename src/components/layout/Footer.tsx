import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Share2, Bookmark } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-serif font-bold mb-4">Muslim Rulers of India</h2>
            <p className="text-green-200 mb-4">
              A comprehensive resource for UPSC aspirants to learn about the Muslim rulers
              of India, their dynasties, monuments, and policies.
            </p>
            <div className="flex space-x-4">
              <button
                className="p-2 rounded-full bg-green-800 hover:bg-green-700 transition-colors"
                aria-label="Share"
              >
                <Share2 size={20} />
              </button>
              <button
                className="p-2 rounded-full bg-green-800 hover:bg-green-700 transition-colors"
                aria-label="Bookmark"
              >
                <Bookmark size={20} />
              </button>
              <button
                className="p-2 rounded-full bg-green-800 hover:bg-green-700 transition-colors"
                aria-label="Study Mode"
              >
                <BookOpen size={20} />
              </button>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-green-200 hover:text-white transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link to="/monuments" className="text-green-200 hover:text-white transition-colors">
                  Monuments
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-green-200 hover:text-white transition-colors">
                  Compare Rulers
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Dynasties</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dynasty/delhi-sultanate"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Delhi Sultanate
                </Link>
              </li>
              <li>
                <Link
                  to="/dynasty/mughal-empire"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Mughal Empire
                </Link>
              </li>
              <li>
                <Link
                  to="/dynasty/deccan-sultanates"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Deccan Sultanates
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors">
                  View All Dynasties
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-green-800 text-center text-green-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Muslim Rulers of India | Educational Resource for UPSC
            Aspirants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;