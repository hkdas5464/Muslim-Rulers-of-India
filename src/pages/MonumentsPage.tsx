import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { monuments } from '../data/monuments';
import { rulers } from '../data/rulers';
import { dynasties } from '../data/dynasties';
import MonumentCard from '../components/ui/MonumentCard';

const MonumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);
  
  // Extract all unique locations
  const locations = Array.from(new Set(monuments.map(m => m.location)));
  
  // Get all rulers with monuments
  const rulersWithMonuments = rulers.filter(ruler => 
    monuments.some(monument => monument.builtBy === ruler.id)
  );
  
  // Get dynasties of these rulers
  const dynastiesWithMonuments = dynasties.filter(dynasty =>
    rulersWithMonuments.some(ruler => ruler.dynastyId === dynasty.id)
  );
  
  // Filter monuments based on search and filters
  const filteredMonuments = monuments.filter(monument => {
    const matchesSearch = 
      monument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monument.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monument.significance.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !selectedLocation || monument.location === selectedLocation;
    
    // Check if monument belongs to selected dynasty
    const ruler = rulers.find(r => r.id === monument.builtBy);
    const matchesDynasty = !selectedDynasty || (ruler && ruler.dynastyId === selectedDynasty);
    
    return matchesSearch && matchesLocation && matchesDynasty;
  });

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-amber-800 text-white py-16 pt-24">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-serif font-bold mb-4">
            Magnificent Monuments
          </h1>
          
          <p className="text-xl text-amber-100 max-w-3xl mb-8">
            Explore the architectural marvels built during the rule of Muslim dynasties in India
          </p>
          
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search monuments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pl-10 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedLocation(null);
                  setSelectedDynasty(null);
                }}
                className={`px-4 py-2 rounded-full text-sm ${
                  !selectedLocation && !selectedDynasty
                    ? 'bg-white text-amber-800 font-medium' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Monuments
              </button>
              
              <div className="h-6 w-px bg-white/20 mx-1"></div>
              
              <div className="relative group">
                <button
                  className="px-4 py-2 rounded-full text-sm bg-white/10 hover:bg-white/20 text-white flex items-center"
                >
                  <MapPin size={14} className="mr-1" />
                  {selectedLocation || 'Filter by Location'}
                </button>
                
                <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 min-w-[200px]">
                  <div className="p-2">
                    {locations.map(location => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-amber-50 ${
                          selectedLocation === location ? 'bg-amber-100 text-amber-900 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                    {selectedLocation && (
                      <button
                        onClick={() => setSelectedLocation(null)}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded mt-1"
                      >
                        Clear Location Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <button
                  className="px-4 py-2 rounded-full text-sm bg-white/10 hover:bg-white/20 text-white flex items-center"
                >
                  {selectedDynasty 
                    ? dynasties.find(d => d.id === selectedDynasty)?.name || 'Dynasty'
                    : 'Filter by Dynasty'}
                </button>
                
                <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 min-w-[200px]">
                  <div className="p-2">
                    {dynastiesWithMonuments.map(dynasty => (
                      <button
                        key={dynasty.id}
                        onClick={() => setSelectedDynasty(dynasty.id)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-amber-50 ${
                          selectedDynasty === dynasty.id ? 'bg-amber-100 text-amber-900 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {dynasty.name}
                      </button>
                    ))}
                    {selectedDynasty && (
                      <button
                        onClick={() => setSelectedDynasty(null)}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded mt-1"
                      >
                        Clear Dynasty Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="ml-auto flex items-center text-white/80 text-sm">
                <span>{filteredMonuments.length} monuments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monuments Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredMonuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMonuments.map(monument => (
                <MonumentCard key={monument.id} monument={monument} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No monuments found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation(null);
                  setSelectedDynasty(null);
                }}
                className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MonumentsPage;