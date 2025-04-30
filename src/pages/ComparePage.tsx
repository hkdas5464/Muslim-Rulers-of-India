import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Crown, Award, ScrollText, Landmark } from 'lucide-react';
import { rulers } from '../data/rulers';
import { dynasties } from '../data/dynasties';

const ComparePage: React.FC = () => {
  const [selectedRuler1, setSelectedRuler1] = useState<string | null>(null);
  const [selectedRuler2, setSelectedRuler2] = useState<string | null>(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  
  const filteredRulers1 = rulers.filter(ruler =>
    ruler.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    dynasties.find(d => d.id === ruler.dynastyId)?.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );
  
  const filteredRulers2 = rulers.filter(ruler =>
    ruler.name.toLowerCase().includes(searchTerm2.toLowerCase()) ||
    dynasties.find(d => d.id === ruler.dynastyId)?.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );
  
  const ruler1 = rulers.find(r => r.id === selectedRuler1);
  const ruler2 = rulers.find(r => r.id === selectedRuler2);
  
  const dynasty1 = ruler1 ? dynasties.find(d => d.id === ruler1.dynastyId) : null;
  const dynasty2 = ruler2 ? dynasties.find(d => d.id === ruler2.dynastyId) : null;
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container-1')) {
        setShowDropdown1(false);
      }
      if (!target.closest('.dropdown-container-2')) {
        setShowDropdown2(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 pt-24">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-serif font-bold mb-4">
            Compare Rulers
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Compare the achievements, policies, and legacies of different Muslim rulers in Indian history
          </p>
        </div>
      </section>

      {/* Selection Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Ruler 1 Selection */}
            <div className="w-full md:w-1/2 dropdown-container-1">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">First Ruler</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search ruler by name or dynasty..."
                    value={searchTerm1}
                    onChange={(e) => {
                      setSearchTerm1(e.target.value);
                      setShowDropdown1(true);
                    }}
                    onClick={() => setShowDropdown1(true)}
                    className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  
                  {showDropdown1 && (
                    <div className="absolute z-20 left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200">
                      {filteredRulers1.length > 0 ? (
                        filteredRulers1.map(ruler => {
                          const dynasty = dynasties.find(d => d.id === ruler.dynastyId);
                          return (
                            <button
                              key={ruler.id}
                              onClick={() => {
                                setSelectedRuler1(ruler.id);
                                setSearchTerm1(ruler.name);
                                setShowDropdown1(false);
                              }}
                              className="block w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                            >
                              <span className="font-medium">{ruler.name}</span>
                              {dynasty && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({dynasty.name}, {ruler.reign})
                                </span>
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-4 py-3 text-gray-500">No rulers found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {ruler1 && dynasty1 && (
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-40 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${ruler1.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <div className="flex items-center mb-1">
                        <Crown size={16} className="mr-1 text-amber-300" />
                        <span className="text-sm opacity-90">{dynasty1.name}</span>
                      </div>
                      <h3 className="text-xl font-bold">{ruler1.name}</h3>
                      <p className="text-sm opacity-90">{ruler1.reign}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {ruler1.description}
                    </p>
                    <Link 
                      to={`/ruler/${ruler1.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Ruler 2 Selection */}
            <div className="w-full md:w-1/2 dropdown-container-2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Second Ruler</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search ruler by name or dynasty..."
                    value={searchTerm2}
                    onChange={(e) => {
                      setSearchTerm2(e.target.value);
                      setShowDropdown2(true);
                    }}
                    onClick={() => setShowDropdown2(true)}
                    className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  
                  {showDropdown2 && (
                    <div className="absolute z-20 left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200">
                      {filteredRulers2.length > 0 ? (
                        filteredRulers2.map(ruler => {
                          const dynasty = dynasties.find(d => d.id === ruler.dynastyId);
                          return (
                            <button
                              key={ruler.id}
                              onClick={() => {
                                setSelectedRuler2(ruler.id);
                                setSearchTerm2(ruler.name);
                                setShowDropdown2(false);
                              }}
                              className="block w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                            >
                              <span className="font-medium">{ruler.name}</span>
                              {dynasty && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({dynasty.name}, {ruler.reign})
                                </span>
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-4 py-3 text-gray-500">No rulers found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {ruler2 && dynasty2 && (
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-40 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${ruler2.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <div className="flex items-center mb-1">
                        <Crown size={16} className="mr-1 text-amber-300" />
                        <span className="text-sm opacity-90">{dynasty2.name}</span>
                      </div>
                      <h3 className="text-xl font-bold">{ruler2.name}</h3>
                      <p className="text-sm opacity-90">{ruler2.reign}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {ruler2.description}
                    </p>
                    <Link 
                      to={`/ruler/${ruler2.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {!(ruler1 && ruler2) && (
            <div className="max-w-6xl mx-auto mt-8 p-6 bg-blue-50 rounded-xl text-center">
              <p className="text-blue-700">
                Select two rulers to compare their achievements, policies, and legacies.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Section */}
      {ruler1 && ruler2 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
                Comparing {ruler1.name} and {ruler2.name}
              </h2>
              
              {/* Basic Info Comparison */}
              <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-md">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-3 divide-x">
                  <div className="p-4 font-medium text-gray-700">
                    Category
                  </div>
                  <div className="p-4">
                    <span className="font-semibold text-blue-800">{ruler1.name}</span>
                  </div>
                  <div className="p-4">
                    <span className="font-semibold text-blue-800">{ruler2.name}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x border-t">
                  <div className="p-4 font-medium text-gray-700">
                    Dynasty
                  </div>
                  <div className="p-4">
                    {dynasty1?.name}
                  </div>
                  <div className="p-4">
                    {dynasty2?.name}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x border-t">
                  <div className="p-4 font-medium text-gray-700">
                    Reign Period
                  </div>
                  <div className="p-4">
                    {ruler1.reign}
                  </div>
                  <div className="p-4">
                    {ruler2.reign}
                  </div>
                </div>
              </div>
              
              {/* Achievements Comparison */}
              <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-md">
                <div className="bg-green-50 px-6 py-4 border-b flex items-center">
                  <Award className="text-green-700 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
                </div>
                
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-4">
                    <h4 className="font-semibold text-green-800 mb-4">{ruler1.name}'s Achievements</h4>
                    <ul className="space-y-3">
                      {ruler1.achievements.map((achievement, index) => (
                        <li key={index} className="flex">
                          <span className="font-bold text-green-700 mr-2">•</span>
                          <div>{achievement}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-green-800 mb-4">{ruler2.name}'s Achievements</h4>
                    <ul className="space-y-3">
                      {ruler2.achievements.map((achievement, index) => (
                        <li key={index} className="flex">
                          <span className="font-bold text-green-700 mr-2">•</span>
                          <div>{achievement}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Policies Comparison */}
              <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-md">
                <div className="bg-blue-50 px-6 py-4 border-b flex items-center">
                  <ScrollText className="text-blue-700 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Policies</h3>
                </div>
                
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-4">{ruler1.name}'s Policies</h4>
                    <ul className="space-y-3">
                      {ruler1.policies.map((policy, index) => (
                        <li key={index} className="flex">
                          <span className="font-bold text-blue-700 mr-2">•</span>
                          <div>{policy}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-4">{ruler2.name}'s Policies</h4>
                    <ul className="space-y-3">
                      {ruler2.policies.map((policy, index) => (
                        <li key={index} className="flex">
                          <span className="font-bold text-blue-700 mr-2">•</span>
                          <div>{policy}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Monuments Comparison */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="bg-amber-50 px-6 py-4 border-b flex items-center">
                  <Landmark className="text-amber-700 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Monuments</h3>
                </div>
                
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-4">
                    <h4 className="font-semibold text-amber-800 mb-4">{ruler1.name}'s Monuments</h4>
                    {ruler1.monuments.length > 0 ? (
                      <ul className="space-y-3">
                        {ruler1.monuments.map((monument, index) => (
                          <li key={index} className="flex">
                            <span className="font-bold text-amber-700 mr-2">•</span>
                            <div>{monument}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No significant monuments recorded</p>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-amber-800 mb-4">{ruler2.name}'s Monuments</h4>
                    {ruler2.monuments.length > 0 ? (
                      <ul className="space-y-3">
                        {ruler2.monuments.map((monument, index) => (
                          <li key={index} className="flex">
                            <span className="font-bold text-amber-700 mr-2">•</span>
                            <div>{monument}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No significant monuments recorded</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* UPSC Analysis */}
              <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">UPSC Analysis: Key Comparative Points</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-bold text-yellow-800 mr-2">1.</span>
                    <div>
                      <span className="font-semibold">Historical Context:</span> {ruler1.name} ruled during {
                        ruler1.id === "akbar" ? "the consolidation and expansion phase of the Mughal empire" :
                        ruler1.id === "alauddin-khalji" ? "the peak of the Delhi Sultanate's power" :
                        ruler1.id === "shah-jahan" ? "the cultural golden age of the Mughal empire" :
                        "an important period in Muslim rule in India"
                      }, while {ruler2.name} ruled during {
                        ruler2.id === "akbar" ? "the consolidation and expansion phase of the Mughal empire" :
                        ruler2.id === "alauddin-khalji" ? "the peak of the Delhi Sultanate's power" :
                        ruler2.id === "shah-jahan" ? "the cultural golden age of the Mughal empire" :
                        "a different phase of Muslim rule in India"
                      }.
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="font-bold text-yellow-800 mr-2">2.</span>
                    <div>
                      <span className="font-semibold">Administrative Approach:</span> {ruler1.name} {
                        ruler1.policies.some(p => p.toLowerCase().includes('centralized') || p.toLowerCase().includes('administration'))
                          ? "implemented centralized administrative reforms"
                          : "had a distinct approach to administration"
                      }, while {ruler2.name} {
                        ruler2.policies.some(p => p.toLowerCase().includes('centralized') || p.toLowerCase().includes('administration'))
                          ? "also focused on administrative centralization but with different methods"
                          : "approached administration differently"
                      }.
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="font-bold text-yellow-800 mr-2">3.</span>
                    <div>
                      <span className="font-semibold">Religious Policy:</span> {ruler1.name} {
                        ruler1.policies.some(p => p.toLowerCase().includes('religious') || p.toLowerCase().includes('jizya'))
                          ? ruler1.policies.some(p => p.toLowerCase().includes('tolerance'))
                            ? "implemented religiously tolerant policies"
                            : "had distinct religious policies affecting non-Muslim subjects"
                          : "had specific approaches to religious matters"
                      }, while {ruler2.name} {
                        ruler2.policies.some(p => p.toLowerCase().includes('religious') || p.toLowerCase().includes('jizya'))
                          ? ruler2.policies.some(p => p.toLowerCase().includes('tolerance'))
                            ? "also adopted religious tolerance but implemented it differently"
                            : "implemented different religious policies"
                          : "had a different approach to religious affairs"
                      }.
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="font-bold text-yellow-800 mr-2">4.</span>
                    <div>
                      <span className="font-semibold">Cultural Legacy:</span> {ruler1.name}'s reign is known for {
                        ruler1.monuments.length > 0
                          ? `architectural contributions like ${ruler1.monuments.slice(0, 2).join(', ')}`
                          : "various cultural developments"
                      }, whereas {ruler2.name} is remembered for {
                        ruler2.monuments.length > 0
                          ? `contributions such as ${ruler2.monuments.slice(0, 2).join(', ')}`
                          : "different cultural achievements"
                      }.
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="font-bold text-yellow-800 mr-2">5.</span>
                    <div>
                      <span className="font-semibold">Historical Impact:</span> The long-term impact of {ruler1.name}'s policies can be seen in {
                        ruler1.id === "akbar" ? "the administrative foundations that sustained the Mughal Empire" :
                        ruler1.id === "alauddin-khalji" ? "military and economic reforms that influenced later rulers" :
                        ruler1.id === "shah-jahan" ? "architectural and cultural developments of lasting significance" :
                        "various aspects of Indian history"
                      }, while {ruler2.name}'s legacy is evident in {
                        ruler2.id === "akbar" ? "the administrative foundations that sustained the Mughal Empire" :
                        ruler2.id === "alauddin-khalji" ? "military and economic reforms that influenced later rulers" :
                        ruler2.id === "shah-jahan" ? "architectural and cultural developments of lasting significance" :
                        "different historical developments"
                      }.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ComparePage;