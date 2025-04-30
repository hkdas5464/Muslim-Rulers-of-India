import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Ruler } from '../../types';
import { dynasties } from '../../data/dynasties';

interface RulerCardProps {
  ruler: Ruler;
}

const RulerCard: React.FC<RulerCardProps> = ({ ruler }) => {
  const dynasty = dynasties.find(d => d.id === ruler.dynastyId);

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col group">
      <div 
        className="h-52 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${ruler.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity group-hover:opacity-90"></div>
        
        {dynasty && (
          <span 
            className="absolute top-3 right-3 text-xs font-medium py-1 px-2 rounded-full text-white"
            style={{ backgroundColor: dynasty.color }}
          >
            {dynasty.name}
          </span>
        )}
        
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-serif font-bold group-hover:translate-y-0 transform transition-transform">{ruler.name}</h3>
          <p className="text-sm opacity-90">{ruler.reign}</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-gray-700 mb-4 line-clamp-3">{ruler.description}</p>
        
        {ruler.achievements.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Key Achievements:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-4">
              {ruler.achievements.slice(0, 2).map((achievement, index) => (
                <li key={index} className="line-clamp-1">{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="p-4 pt-0 mt-auto">
        <Link 
          to={`/ruler/${ruler.id}`}
          className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
        >
          Learn More
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default RulerCard;