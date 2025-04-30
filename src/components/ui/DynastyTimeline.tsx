import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dynasty } from '../../types';
import { dynasties } from '../../data/dynasties';

interface DynastyTimelineProps {
  onSelectDynasty: (dynastyId: string) => void;
  selectedDynastyId?: string;
}

const DynastyTimeline: React.FC<DynastyTimelineProps> = ({ 
  onSelectDynasty, 
  selectedDynastyId 
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => {
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const handleScroll = () => {
    checkScrollability();
  };

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = timelineRef.current.clientWidth / 2;
      const scrollPos = timelineRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      timelineRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to selected dynasty
  useEffect(() => {
    if (selectedDynastyId && timelineRef.current) {
      const selectedElement = timelineRef.current.querySelector(`[data-dynasty-id="${selectedDynastyId}"]`);
      if (selectedElement) {
        const containerWidth = timelineRef.current.clientWidth;
        const elementLeft = (selectedElement as HTMLElement).offsetLeft;
        const elementWidth = (selectedElement as HTMLElement).offsetWidth;
        const scrollPos = elementLeft - (containerWidth / 2) + (elementWidth / 2);
        
        timelineRef.current.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedDynastyId]);

  return (
    <div className="relative">
      <div 
        className="overflow-x-auto scrollbar-hide py-6"
        ref={timelineRef}
        onScroll={handleScroll}
      >
        <div className="flex min-w-max">
          <div className="h-0.5 bg-gray-300 absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0"></div>
          
          {dynasties.map((dynasty, index) => (
            <div
              key={dynasty.id}
              data-dynasty-id={dynasty.id}
              className="flex flex-col items-center mx-8 z-10 relative"
            >
              <button
                onClick={() => onSelectDynasty(dynasty.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                  selectedDynastyId === dynasty.id
                    ? 'ring-4 ring-offset-2 ring-green-600 shadow-lg transform scale-110'
                    : ''
                }`}
                style={{ backgroundColor: dynasty.color }}
              >
                <span className="text-white font-bold">{index + 1}</span>
              </button>
              
              <div className="h-8 w-0.5 bg-gray-300 my-2"></div>
              
              <div className={`text-center transition-all duration-300 ${
                selectedDynastyId === dynasty.id
                  ? 'font-bold text-green-800'
                  : 'text-gray-600'
              }`}>
                <div className="whitespace-nowrap text-sm">{dynasty.name}</div>
                <div className="text-xs opacity-80">{dynasty.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {canScrollLeft && (
        <button
          onClick={() => scrollTimeline('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-20"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {canScrollRight && (
        <button
          onClick={() => scrollTimeline('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-20"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default DynastyTimeline;