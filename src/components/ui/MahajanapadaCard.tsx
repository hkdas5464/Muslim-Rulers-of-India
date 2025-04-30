import React from 'react';
import { MapPin, Crown, Landmark } from 'lucide-react';
import { Mahajanapada } from '../../types';

interface MahajanapadaCardProps {
  mahajanapada: Mahajanapada;
}

const MahajanapadaCard: React.FC<MahajanapadaCardProps> = ({ mahajanapada }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${mahajanapada.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center mb-1">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm opacity-90">{mahajanapada.capital}</span>
          </div>
          <h3 className="text-xl font-serif font-bold">{mahajanapada.name}</h3>
          <p className="text-sm opacity-90">{mahajanapada.period}</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-4 line-clamp-3">{mahajanapada.description}</p>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center text-amber-700 mb-2">
              <Crown size={16} className="mr-1" />
              <h4 className="font-semibold">Notable Rulers</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {mahajanapada.rulers.map((ruler, index) => (
                <li key={index} className="line-clamp-1">
                  • {ruler.name} ({ruler.period})
                </li>
              ))}
            </ul>
          </div>
          
          {mahajanapada.monuments.length > 0 && (
            <div>
              <div className="flex items-center text-green-700 mb-2">
                <Landmark size={16} className="mr-1" />
                <h4 className="font-semibold">Key Monuments</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {mahajanapada.monuments.map((monument, index) => (
                  <li key={index} className="line-clamp-1">• {monument}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-amber-50">
        <h4 className="text-sm font-semibold text-amber-900 mb-1">UPSC Key Points:</h4>
        <p className="text-sm text-amber-800">{mahajanapada.significance}</p>
      </div>
    </div>
  );
};

export default MahajanapadaCard;