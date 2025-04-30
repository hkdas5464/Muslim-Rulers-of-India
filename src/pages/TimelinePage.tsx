import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { dynasties } from '../data/dynasties';
import { rulers } from '../data/rulers';
import TimelineItem from '../components/ui/TimelineItem';

const TimelinePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'dynasties' | 'rulers'>('all');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter and combine dynasties and rulers for timeline
  let timelineItems = [];
  
  if (filterType === 'all' || filterType === 'dynasties') {
    const filteredDynasties = dynasties.filter(dynasty => 
      dynasty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dynasty.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    timelineItems = [...timelineItems, ...filteredDynasties.map(dynasty => ({ ...dynasty, type: 'dynasty' }))];
  }
  
  if (filterType === 'all' || filterType === 'rulers') {
    const filteredRulers = rulers.filter(ruler => 
      ruler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruler.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    timelineItems = [...timelineItems, ...filteredRulers.map(ruler => ({ ...ruler, type: 'ruler' }))];
  }
  
  // Sort by period/reign chronologically (approximate)
  timelineItems.sort((a, b) => {
    const periodA = a.type === 'dynasty' ? a.period : a.reign;
    const periodB = b.type === 'dynasty' ? b.period : b.reign;
    
    const startYearA = parseInt(periodA.split('-')[0]);
    const startYearB = parseInt(periodB.split('-')[0]);
    
    return startYearA - startYearB;
  });

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16 pt-24">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-serif font-bold mb-4">
            Complete Timeline
          </h1>
          
          <p className="text-xl text-green-100 max-w-3xl mb-8">
            A chronological journey through Muslim dynasties and rulers in India, from the 12th to the 19th century
          </p>
          
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search dynasties and rulers..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-3 px-4 pl-10 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-full text-sm ${
                  filterType === 'all' 
                    ? 'bg-white text-green-900 font-medium' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('dynasties')}
                className={`px-4 py-2 rounded-full text-sm ${
                  filterType === 'dynasties' 
                    ? 'bg-white text-green-900 font-medium' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Dynasties
              </button>
              <button
                onClick={() => setFilterType('rulers')}
                className={`px-4 py-2 rounded-full text-sm ${
                  filterType === 'rulers' 
                    ? 'bg-white text-green-900 font-medium' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Rulers
              </button>
              <div className="ml-auto flex items-center text-white/80 text-sm">
                <Filter size={14} className="mr-1" />
                <span>{timelineItems.length} results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {timelineItems.length > 0 ? (
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
                
                <div className="relative">
                  {timelineItems.map((item, index) => (
                    <TimelineItem 
                      key={`${item.type}-${item.id}`}
                      item={item}
                      type={item.type as 'dynasty' | 'ruler'}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No results found for your search.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimelinePage;