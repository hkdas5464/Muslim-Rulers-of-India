import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  CalendarClock, 
  BookOpen,
  Star
} from 'lucide-react';
import { monuments } from '../data/monuments';
import { rulers } from '../data/rulers';
import { dynasties } from '../data/dynasties';

const MonumentPage: React.FC = () => {
  const { monumentId } = useParams<{ monumentId: string }>();
  const [monument, setMonument] = useState(monuments.find(m => m.id === monumentId));
  const [ruler, setRuler] = useState<typeof rulers[0] | undefined>();
  const [dynasty, setDynasty] = useState<typeof dynasties[0] | undefined>();
  
  useEffect(() => {
    if (monumentId) {
      const foundMonument = monuments.find(m => m.id === monumentId);
      setMonument(foundMonument);
      
      if (foundMonument) {
        const foundRuler = rulers.find(r => r.id === foundMonument.builtBy);
        setRuler(foundRuler);
        
        if (foundRuler) {
          setDynasty(dynasties.find(d => d.id === foundRuler.dynastyId));
        }
      }
    }
  }, [monumentId]);

  if (!monument || !ruler || !dynasty) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Monument not found</h1>
        <Link to="/" className="text-green-700 hover:text-green-900">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Monument Hero */}
      <section 
        className="relative pt-24 pb-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${monument.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Link 
              to="/monuments" 
              className="inline-flex items-center text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Monuments
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 animate-fadeIn">
              {monument.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-amber-300">
                <MapPin size={20} className="mr-1" />
                <span className="text-lg">{monument.location}</span>
              </div>
              
              <div className="flex items-center text-green-300">
                <CalendarClock size={20} className="mr-1" />
                <span className="text-lg">{monument.year}</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-200 max-w-3xl mb-8 animate-fadeIn animation-delay-300">
              {monument.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to={`/ruler/${ruler.id}`}
                className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                Built by {ruler.name}
              </Link>
              
              <Link 
                to={`/dynasty/${dynasty.id}`}
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                {dynasty.name} Period
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Significance */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Star className="text-amber-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">Historical Significance</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <p className="text-gray-700 leading-relaxed">
                {monument.significance}
              </p>
              
              {monument.id === "taj-mahal" && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-bold text-amber-800 mb-2">Additional Context:</h3>
                  <p className="text-amber-800 text-sm">
                    The Taj Mahal is considered the pinnacle of Mughal architecture, combining elements from Persian, Islamic, and Indian architectural styles. It took approximately 22 years to complete and employed over 20,000 artisans and craftsmen. It is now a UNESCO World Heritage Site and one of the Seven Wonders of the World.
                  </p>
                </div>
              )}
              
              {monument.id === "qutub-minar" && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-bold text-amber-800 mb-2">Additional Context:</h3>
                  <p className="text-amber-800 text-sm">
                    The Qutub Minar complex incorporates materials from 27 Hindu and Jain temples that were demolished by Qutb ud-Din Aibak. The inscriptions on the minar include verses from the Quran and details of repairs done by rulers like Firoz Shah Tughlaq. It is now a UNESCO World Heritage Site.
                  </p>
                </div>
              )}
              
              {monument.id === "red-fort" && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-bold text-amber-800 mb-2">Additional Context:</h3>
                  <p className="text-amber-800 text-sm">
                    The Red Fort was the main residence of the Mughal emperors for nearly 200 years. It witnessed the rise and fall of the empire, from its peak under Shah Jahan to its decline under later Mughals. Today, the Prime Minister of India addresses the nation from its ramparts on Independence Day, symbolizing its continued importance in Indian national identity.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Architectural Features</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              {monument.id === "taj-mahal" && (
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Perfect Symmetry:</span> The Taj Mahal is perfectly symmetrical on all sides, with the only asymmetric element being Shah Jahan's cenotaph.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">White Marble:</span> Built primarily of white marble inlaid with semi-precious stones (pietra dura).
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Central Dome:</span> The iconic onion-shaped dome rises to a height of 73 meters.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Four Minarets:</span> Slightly tilting outward to prevent falling onto the main structure in case of an earthquake.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Charbagh Garden:</span> Quadrilateral garden divided into four equal parts with reflecting pools.
                    </div>
                  </li>
                </ul>
              )}
              
              {monument.id === "qutub-minar" && (
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Tapering Structure:</span> The tower tapers from 14.32 meters at the base to 2.75 meters at the top.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Five Distinct Storeys:</span> Each storey has a projecting balcony and is adorned with intricate carvings and inscriptions.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Mixed Materials:</span> The first three storeys are made of red sandstone, while the fourth and fifth storeys are of marble and sandstone.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Calligraphy:</span> Intricate carvings of Quranic texts and floral patterns adorn the exterior.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Iron Pillar:</span> The complex includes an ancient iron pillar that has not rusted for over 1,600 years.
                    </div>
                  </li>
                </ul>
              )}
              
              {monument.id === "red-fort" && (
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Red Sandstone Walls:</span> Massive walls up to 33 meters high that give the fort its name.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Lahori Gate:</span> The main entrance, which is now a national symbol of India.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Diwan-i-Aam:</span> Hall of Public Audience where the emperor would hear public petitions.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Diwan-i-Khas:</span> Hall of Private Audience, once home to the legendary Peacock Throne.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Marble Pavilions:</span> White marble structures within the fort complex that contrast with the red sandstone walls.
                    </div>
                  </li>
                </ul>
              )}
              
              {!["taj-mahal", "qutub-minar", "red-fort"].includes(monument.id) && (
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Construction Material:</span> Built using local stone and traditional building techniques of the period.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Islamic Elements:</span> Incorporates traditional Islamic architectural elements such as arches, domes, and calligraphy.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Decorative Features:</span> Adorned with intricate carvings, geometric patterns, and floral motifs.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Layout and Design:</span> Designed according to the architectural principles of the {dynasty.name} period.
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>
                      <span className="font-semibold">Cultural Synthesis:</span> Reflects a blend of Persian, Central Asian, and Indian architectural traditions.
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* UPSC Notes */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <BookOpen className="text-amber-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">UPSC Notes: Key Points to Remember</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">1.</span>
                  <div>
                    <span className="font-semibold">Built By:</span> {monument.name} was built by {ruler.name} ({ruler.reign}) of the {dynasty.name} in {monument.year}
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">2.</span>
                  <div>
                    <span className="font-semibold">Location:</span> Located in {monument.location}, it represents the architectural style of the {dynasty.name}
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">3.</span>
                  <div>
                    <span className="font-semibold">Historical Context:</span> Built during a period of {
                      monument.id === "taj-mahal" ? "cultural prosperity and imperial magnificence" :
                      monument.id === "qutub-minar" ? "the early establishment of Muslim rule in India" :
                      monument.id === "red-fort" ? "Mughal power at its zenith" :
                      "significant political and cultural developments"
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">4.</span>
                  <div>
                    <span className="font-semibold">Architectural Style:</span> Exemplifies {
                      monument.id === "taj-mahal" ? "the pinnacle of Mughal architecture with Persian and Indian influences" :
                      monument.id === "qutub-minar" ? "early Indo-Islamic architectural style with local adaptations" :
                      monument.id === "red-fort" ? "mature Mughal imperial style with red sandstone and white marble elements" :
                      "the architectural traditions of the period with distinctive regional influences"
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">5.</span>
                  <div>
                    <span className="font-semibold">Cultural Significance:</span> {monument.significance}
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">UPSC Tip:</span> When studying {monument.name}, connect it to the broader themes of {
                    monument.id === "taj-mahal" ? "Mughal cultural patronage, artistic excellence, and the economic conditions of Shah Jahan's reign" :
                    monument.id === "qutub-minar" ? "the establishment of the Delhi Sultanate, early Indo-Islamic architecture, and religious dynamics" :
                    monument.id === "red-fort" ? "Mughal governance, court culture, and the symbolic representation of imperial power" :
                    "cultural synthesis, architectural development, and political history of the period"
                  }.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonumentPage;