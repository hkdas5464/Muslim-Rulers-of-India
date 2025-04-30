import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Dynasty } from '../../types';

interface DynastyCardProps {
  dynasty: Dynasty;
}

const DynastyCard: React.FC<DynastyCardProps> = ({ dynasty }) => {
  return (
    <div 
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col"
      style={{ borderTop: `4px solid ${dynasty.color}` }}
    >
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${dynasty.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-serif font-bold">{dynasty.name}</h3>
          <p className="text-sm opacity-90">{dynasty.period}</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-gray-700 mb-4 line-clamp-3">{dynasty.description}</p>
      </div>
      
      <div className="p-4 pt-0 mt-auto">
        <Link 
          to={`/dynasty/${dynasty.id}`}
          className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
        >
          Explore Dynasty
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default DynastyCard;