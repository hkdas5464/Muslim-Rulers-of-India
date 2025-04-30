import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin, Crown } from 'lucide-react';
import { dynasties } from '../data/dynasties';
import { rulers } from '../data/rulers';
import { monuments } from '../data/monuments';
import { mahajanapadas } from '../data/mahajanapadas';
import DynastyCard from '../components/ui/DynastyCard';
import RulerCard from '../components/ui/RulerCard';
import MonumentCard from '../components/ui/MonumentCard';
import MahajanapadaCard from '../components/ui/MahajanapadaCard';
import DynastyTimeline from '../components/ui/DynastyTimeline';

const HomePage: React.FC = () => {
  const [selectedDynastyId, setSelectedDynastyId] = useState<string | undefined>(dynasties[0].id);
  const [activeSection, setActiveSection] = useState<'muslim' | 'mahajanapada'>('muslim');
  
  const featuredRulers = rulers.filter(ruler => 
    ['akbar', 'alauddin-khalji', 'shah-jahan', 'razia-sultana'].includes(ruler.id)
  );
  const featuredMonuments = monuments.filter(monument => 
    ['taj-mahal', 'qutub-minar', 'red-fort'].includes(monument.id)
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[700px] bg-cover bg-center flex items-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 animate-fadeIn">
              Indian Historical Rulers
            </h1>
            <p className="text-xl text-gray-200 mb-8 animate-fadeIn animation-delay-300">
              Explore the dynasties, rulers, monuments, and policies from ancient Mahajanapadas to Muslim rulers - a comprehensive resource for UPSC preparation
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-500">
              <Link to="/timeline" className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-colors">
                Explore Timeline
              </Link>
              <button
                onClick={() => setActiveSection(activeSection === 'muslim' ? 'mahajanapada' : 'muslim')}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-lg transition-colors"
              >
                {activeSection === 'muslim' ? 'View Mahajanapadas' : 'View Muslim Dynasties'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mahajanapadas Section */}
      {activeSection === 'mahajanapada' && (
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">16 Mahajanapadas</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore the ancient kingdoms and republics that flourished in India during the 6th century BCE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mahajanapadas.map((mahajanapada) => (
                <MahajanapadaCard key={mahajanapada.id} mahajanapada={mahajanapada} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Muslim Dynasties Section */}
      {activeSection === 'muslim' && (
        <>
          {/* Dynasty Timeline Section */}
          <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Muslim Dynasties in India</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Explore the major Muslim dynasties that ruled over the Indian subcontinent from the 12th to the 19th century
                </p>
              </div>

              <DynastyTimeline 
                onSelectDynasty={setSelectedDynastyId} 
                selectedDynastyId={selectedDynastyId}
              />

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dynasties.slice(0, 6).map((dynasty) => (
                  <DynastyCard key={dynasty.id} dynasty={dynasty} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link 
                  to="/timeline" 
                  className="inline-flex items-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-colors"
                >
                  View Complete Timeline
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Rulers Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Notable Rulers</h2>
                  <p className="text-lg text-gray-700">
                    Learn about the most significant Muslim rulers who shaped Indian history
                  </p>
                </div>
                <Link 
                  to="/rulers" 
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
                >
                  View All
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredRulers.map((ruler) => (
                  <RulerCard key={ruler.id} ruler={ruler} />
                ))}
              </div>
            </div>
          </section>

          {/* Monuments Section */}
          <section className="py-16 bg-amber-50">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Magnificent Monuments</h2>
                  <p className="text-lg text-gray-700">
                    Explore the architectural marvels built during Muslim rule in India
                  </p>
                </div>
                <Link 
                  to="/monuments" 
                  className="inline-flex items-center text-amber-700 hover:text-amber-900 font-medium"
                >
                  View All
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredMonuments.map((monument) => (
                  <MonumentCard key={monument.id} monument={monument} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* UPSC Study Features */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">UPSC Study Resources</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Specialized tools and resources to help you master Indian history for your UPSC preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-green-700" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Timeline</h3>
              <p className="text-gray-700 mb-4">
                A chronological overview of Indian history from Mahajanapadas to Muslim dynasties.
              </p>
              <Link to="/timeline" className="text-green-700 font-medium inline-flex items-center hover:text-green-900">
                Explore Timeline <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-amber-700" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Monument Explorer</h3>
              <p className="text-gray-700 mb-4">
                Detailed information about important monuments, their architecture and historical significance.
              </p>
              <Link to="/monuments" className="text-amber-700 font-medium inline-flex items-center hover:text-amber-900">
                Explore Monuments <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Crown className="text-blue-700" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Ruler Comparison</h3>
              <p className="text-gray-700 mb-4">
                Compare policies, achievements, and historical impact of different rulers for better analysis.
              </p>
              <Link to="/compare" className="text-blue-700 font-medium inline-flex items-center hover:text-blue-900">
                Compare Rulers <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;