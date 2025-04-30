import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dynasties } from '../../data/dynasties';
import { X, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 md:w-72 bg-green-50 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-green-900">
              Dynasties
            </h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-green-100"
              aria-label="Close sidebar"
            >
              <X size={20} className="text-green-800" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav>
              <Link
                to="/"
                className={`block px-4 py-2 mb-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={closeSidebar}
              >
                Home
              </Link>

              <div className="mt-6 mb-3 px-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-green-800">
                  Major Dynasties
                </h3>
              </div>

              {dynasties.map((dynasty) => (
                <Link
                  key={dynasty.id}
                  to={`/dynasty/${dynasty.id}`}
                  className={`group flex items-center justify-between px-4 py-2 mb-1 rounded-lg font-medium transition-all ${
                    location.pathname === `/dynasty/${dynasty.id}`
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-green-100 text-green-900'
                  }`}
                  onClick={closeSidebar}
                >
                  <span>{dynasty.name}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${
                      location.pathname === `/dynasty/${dynasty.id}`
                        ? 'text-white'
                        : 'text-green-500 group-hover:translate-x-1'
                    }`}
                  />
                </Link>
              ))}

              <div className="mt-8 mb-3 px-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-green-800">
                  Learning Resources
                </h3>
              </div>

              <Link
                to="/timeline"
                className={`block px-4 py-2 mb-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/timeline'
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={closeSidebar}
              >
                Complete Timeline
              </Link>

              <Link
                to="/monuments"
                className={`block px-4 py-2 mb-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/monuments'
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={closeSidebar}
              >
                Key Monuments
              </Link>

              <Link
                to="/compare"
                className={`block px-4 py-2 mb-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/compare'
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={closeSidebar}
              >
                Compare Rulers
              </Link>
            </nav>
          </div>

          <div className="mt-auto pt-4 border-t border-green-200">
            <div className="px-4 py-2 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-800">
                Content optimized for UPSC Civil Services Examination
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;