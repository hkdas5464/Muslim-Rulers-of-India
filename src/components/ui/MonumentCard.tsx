import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight } from 'lucide-react';
import { Monument } from '../../types';
import { rulers } from '../../data/rulers';

interface MonumentCardProps {
  monument: Monument;
}

const MonumentCard: React.FC<MonumentCardProps> = ({ monument }) => {
  const ruler = rulers.find(r => r.id === monument.builtBy);

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col group">
      <div 
        className="h-52 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${monument.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute top-3 right-3 flex items-center bg-white/90 py-1 px-2 rounded-full text-xs font-medium text-gray-700">
          <Map size={12} className="mr-1" />
          {monument.location}
        </div>
        
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-serif font-bold transition-transform group-hover:translate-y-0">{monument.name}</h3>
          <p className="text-sm opacity-90">{monument.year}</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-gray-700 mb-2 line-clamp-2">{monument.description}</p>
        
        {ruler && (
          <div className="mb-2">
            <span className="text-sm text-gray-500">Built by: </span>
            <Link 
              to={`/ruler/${ruler.id}`}
              className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
            >
              {ruler.name}
            </Link>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Historical Significance:</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{monument.significance}</p>
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto">
        <Link 
          to={`/monument/${monument.id}`}
          className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
        >
          Explore Monument
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default MonumentCard;