import React from 'react';
import { Link } from 'react-router-dom';
import { Dynasty, Ruler } from '../../types';

interface TimelineItemProps {
  item: Dynasty | Ruler;
  type: 'dynasty' | 'ruler';
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, type, index }) => {
  const isEven = index % 2 === 0;
  const baseColor = type === 'dynasty' ? (item as Dynasty).color : '#047857';

  return (
    <div className={`mb-8 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : ''}`}>
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
      </div>
      <div
        className={`order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 transition-transform duration-300 hover:scale-105`}
        style={{ borderLeft: `4px solid ${baseColor}` }}
      >
        <h3 className="font-serif font-bold text-gray-800 text-xl">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{type === 'dynasty' ? (item as Dynasty).period : (item as Ruler).reign}</p>
        <p className="text-gray-700 text-sm leading-snug line-clamp-2 mb-3">{item.description}</p>
        <Link
          to={type === 'dynasty' ? `/dynasty/${item.id}` : `/ruler/${item.id}`}
          className={`text-sm font-medium inline-block transition-colors`}
          style={{ color: baseColor }}
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default TimelineItem;