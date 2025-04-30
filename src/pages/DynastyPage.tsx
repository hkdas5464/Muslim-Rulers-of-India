import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Scroll } from 'lucide-react';
import { dynasties } from '../data/dynasties';
import { rulers } from '../data/rulers';
import { monuments } from '../data/monuments';
import RulerCard from '../components/ui/RulerCard';
import MonumentCard from '../components/ui/MonumentCard';

const DynastyPage: React.FC = () => {
  const { dynastyId } = useParams<{ dynastyId: string }>();
  const [dynasty, setDynasty] = useState(dynasties.find(d => d.id === dynastyId));
  const [dynastyRulers, setDynastyRulers] = useState(rulers.filter(r => r.dynastyId === dynastyId));
  const [dynastyMonuments, setDynastyMonuments] = useState<typeof monuments>([]);
  
  useEffect(() => {
    if (dynastyId) {
      setDynasty(dynasties.find(d => d.id === dynastyId));
      setDynastyRulers(rulers.filter(r => r.dynastyId === dynastyId));
      
      // Get monuments related to rulers of this dynasty
      const rulerIds = rulers.filter(r => r.dynastyId === dynastyId).map(r => r.id);
      setDynastyMonuments(monuments.filter(m => rulerIds.includes(m.builtBy)));
    }
  }, [dynastyId]);

  if (!dynasty) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Dynasty not found</h1>
        <Link to="/" className="text-green-700 hover:text-green-900">
          Return to home
        </Link>
      </div>
    );
  }

  // Calculate next and previous dynasties
  const currentIndex = dynasties.findIndex(d => d.id === dynastyId);
  const prevDynasty = currentIndex > 0 ? dynasties[currentIndex - 1] : null;
  const nextDynasty = currentIndex < dynasties.length - 1 ? dynasties[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pb-16">
      {/* Dynasty Hero */}
      <section 
        className="relative pt-24 pb-16 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${dynasty.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Link 
              to="/" 
              className="inline-flex items-center text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Dynasties
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 animate-fadeIn">
              {dynasty.name}
            </h1>
            
            <div className="flex items-center text-amber-300 mb-6">
              <Calendar size={20} className="mr-2" />
              <span className="text-xl">{dynasty.period}</span>
            </div>
            
            <p className="text-xl text-gray-200 max-w-3xl animate-fadeIn animation-delay-300">
              {dynasty.description}
            </p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              {prevDynasty && (
                <Link 
                  to={`/dynasty/${prevDynasty.id}`}
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  {prevDynasty.name}
                </Link>
              )}
              
              {nextDynasty && (
                <Link 
                  to={`/dynasty/${nextDynasty.id}`}
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  {nextDynasty.name}
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features/Policies */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Scroll className="text-green-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">Key Features & Policies</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <p className="text-gray-700 mb-6">
                {dynasty.id === "delhi-sultanate" && (
                  <>
                    The Delhi Sultanate introduced new administrative systems, Islamic architecture, and Persian cultural influence to India. Key policies included:
                  </>
                )}
                {dynasty.id === "mughal-empire" && (
                  <>
                    The Mughal Empire was characterized by centralized administration, religious tolerance (especially under Akbar), and cultural syncretism. Key policies included:
                  </>
                )}
                {dynasty.id === "deccan-sultanates" && (
                  <>
                    The Deccan Sultanates developed as independent kingdoms with unique cultural identities blending Persian, Turkish, and Indian elements. Key policies included:
                  </>
                )}
                {!["delhi-sultanate", "mughal-empire", "deccan-sultanates"].includes(dynasty.id) && (
                  <>
                    This dynasty played a significant role in shaping the political and cultural landscape of its region, introducing several key policies and administrative features:
                  </>
                )}
              </p>
              
              <ul className="space-y-4">
                {dynasty.id === "delhi-sultanate" && (
                  <>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Iqta System:</span> Land grants given to nobles who collected revenue and maintained troops
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Jizya Tax:</span> Special tax imposed on non-Muslims, though enforcement varied by ruler
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Market Reforms:</span> Especially under Alauddin Khalji, who regulated market prices
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Military Organization:</span> Introduction of standing armies and new military tactics
                      </div>
                    </li>
                  </>
                )}
                
                {dynasty.id === "mughal-empire" && (
                  <>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Mansabdari System:</span> Administrative structure ranking nobles based on military and civil positions
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Zabt System:</span> Land revenue system implemented by Akbar and Raja Todar Mal
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Cultural Patronage:</span> Strong support for arts, literature, and architecture
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Religious Policies:</span> Ranging from Akbar's Din-i-Ilahi and abolition of jizya to Aurangzeb's reimposition of jizya
                      </div>
                    </li>
                  </>
                )}
                
                {dynasty.id === "deccan-sultanates" && (
                  <>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Cultural Synthesis:</span> Blend of Persian, Turkish, and local Deccani traditions
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Language Development:</span> Patronage of Deccani Urdu and local languages
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Trade Relations:</span> Strong maritime trade with Middle Eastern and Southeast Asian kingdoms
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Architecture:</span> Development of distinct Deccani architectural styles
                      </div>
                    </li>
                  </>
                )}
                
                {!["delhi-sultanate", "mughal-empire", "deccan-sultanates"].includes(dynasty.id) && (
                  <>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Administrative Reforms:</span> Centralized governance structure with provincial administration
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Cultural Patronage:</span> Support for arts, literature, and architecture
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Military Organization:</span> Maintained standing armies and defensive fortifications
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-green-800 mr-2">•</span>
                      <div>
                        <span className="font-semibold">Religious Policies:</span> Varying degrees of religious tolerance and patronage of religious institutions
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rulers Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Rulers of {dynasty.name}</h2>
          
          {dynastyRulers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynastyRulers.map(ruler => (
                <RulerCard key={ruler.id} ruler={ruler} />
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No rulers available for this dynasty.</p>
          )}
        </div>
      </section>

      {/* Monuments Section */}
      {dynastyMonuments.length > 0 && (
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
              Notable Monuments from {dynasty.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynastyMonuments.map(monument => (
                <MonumentCard key={monument.id} monument={monument} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UPSC Notes */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">UPSC Notes: Key Points to Remember</h2>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">1.</span>
                  <div>
                    <span className="font-semibold">Timeline:</span> {dynasty.name} ruled from {dynasty.period}
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">2.</span>
                  <div>
                    <span className="font-semibold">Important Rulers:</span> {
                      dynastyRulers.slice(0, 3).map(r => r.name).join(', ') + 
                      (dynastyRulers.length > 3 ? ', among others' : '')
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">3.</span>
                  <div>
                    <span className="font-semibold">Major Achievements:</span> {
                      dynasty.id === "delhi-sultanate" ? 
                        "Establishment of Muslim rule in India, repulsion of Mongol invasions, administrative reforms, architectural innovations" :
                      dynasty.id === "mughal-empire" ? 
                        "Territorial expansion, administrative centralization, cultural syncretism, architectural marvels like Taj Mahal" :
                      dynasty.id === "deccan-sultanates" ? 
                        "Independent kingdoms with unique cultural identity, distinctive architectural style, patronage of regional languages" :
                        "Regional governance, cultural patronage, architectural developments, administrative reforms"
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">4.</span>
                  <div>
                    <span className="font-semibold">Decline Factors:</span> {
                      dynasty.id === "delhi-sultanate" ? 
                        "Succession disputes, provincial rebellions, Timur's invasion, rise of Babur and the Mughals" :
                      dynasty.id === "mughal-empire" ? 
                        "Aurangzeb's policies, succession conflicts, rise of Marathas, invasion of Nadir Shah" :
                      dynasty.id === "deccan-sultanates" ? 
                        "Internal conflicts, Mughal expansionism under Aurangzeb, rise of the Marathas" :
                        "Regional conflicts, administrative challenges, stronger neighboring powers"
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">5.</span>
                  <div>
                    <span className="font-semibold">Legacy:</span> {
                      dynasty.id === "delhi-sultanate" ? 
                        "Introduction of Islamic architectural elements, Persian cultural influence, administrative systems" :
                      dynasty.id === "mughal-empire" ? 
                        "Lasting architectural monuments, administrative systems, cultural synthesis, artistic traditions" :
                      dynasty.id === "deccan-sultanates" ? 
                        "Unique Indo-Islamic architectural style, development of Deccani Urdu, regional cultural identity" :
                        "Regional governance structures, architectural contributions, cultural developments"
                    }
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">UPSC Tip:</span> Compare and contrast {dynasty.name} with {
                    dynasty.id === "delhi-sultanate" ? "the Mughal Empire" :
                    dynasty.id === "mughal-empire" ? "the Delhi Sultanate" :
                    "other contemporary dynasties"
                  } to understand the evolution of administrative systems, cultural policies, and architectural styles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynastyPage;