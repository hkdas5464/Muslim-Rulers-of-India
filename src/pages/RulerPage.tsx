import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Landmark, 
  ScrollText, 
  Crown, 
  Calendar, 
  Award,
  BookOpen
} from 'lucide-react';
import { rulers } from '../data/rulers';
import { dynasties } from '../data/dynasties';
import { monuments } from '../data/monuments';
import MonumentCard from '../components/ui/MonumentCard';

const RulerPage: React.FC = () => {
  const { rulerId } = useParams<{ rulerId: string }>();
  const [ruler, setRuler] = useState(rulers.find(r => r.id === rulerId));
  const [dynasty, setDynasty] = useState<typeof dynasties[0] | undefined>();
  const [rulerMonuments, setRulerMonuments] = useState<typeof monuments>([]);
  
  useEffect(() => {
    if (rulerId) {
      const foundRuler = rulers.find(r => r.id === rulerId);
      setRuler(foundRuler);
      
      if (foundRuler) {
        setDynasty(dynasties.find(d => d.id === foundRuler.dynastyId));
        setRulerMonuments(monuments.filter(m => m.builtBy === rulerId));
      }
    }
  }, [rulerId]);

  if (!ruler || !dynasty) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Ruler not found</h1>
        <Link to="/" className="text-green-700 hover:text-green-900">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Ruler Hero */}
      <section 
        className="relative pt-24 pb-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${ruler.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Link 
              to={`/dynasty/${dynasty.id}`} 
              className="inline-flex items-center text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to {dynasty.name}
            </Link>
            
            <div className="flex items-center text-amber-300 mb-2">
              <Crown size={20} className="mr-2" />
              <span className="text-lg">{dynasty.name}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 animate-fadeIn">
              {ruler.name}
            </h1>
            
            <div className="flex items-center text-green-300 mb-6">
              <Calendar size={20} className="mr-2" />
              <span className="text-xl">Reign: {ruler.reign}</span>
            </div>
            
            <p className="text-xl text-gray-200 max-w-3xl animate-fadeIn animation-delay-300">
              {ruler.description}
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Award className="text-green-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">Major Achievements</h2>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 shadow-md">
              <ul className="space-y-4">
                {ruler.achievements.map((achievement, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-green-800 mr-2">•</span>
                    <div>{achievement}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <ScrollText className="text-blue-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">Key Policies</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <ul className="space-y-4">
                {ruler.policies.map((policy, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-blue-800 mr-2">•</span>
                    <div>{policy}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Monuments Section */}
      {rulerMonuments.length > 0 && (
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Landmark className="text-amber-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Monuments Built by {ruler.name}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rulerMonuments.map(monument => (
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
            <div className="flex items-center mb-6">
              <BookOpen className="text-amber-700 mr-3" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">UPSC Notes: Key Points to Remember</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">1.</span>
                  <div>
                    <span className="font-semibold">Timeline:</span> {ruler.name} ruled from {ruler.reign} as part of the {dynasty.name}
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">2.</span>
                  <div>
                    <span className="font-semibold">Key Achievements:</span> {
                      ruler.achievements.slice(0, 2).join(', ') + 
                      (ruler.achievements.length > 2 ? ', among others' : '')
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">3.</span>
                  <div>
                    <span className="font-semibold">Administrative Reforms:</span> {
                      ruler.policies.filter(p => 
                        p.toLowerCase().includes('administrative') || 
                        p.toLowerCase().includes('reform') || 
                        p.toLowerCase().includes('system')
                      ).join(', ') || 'Various administrative measures to strengthen governance'
                    }
                  </div>
                </li>
                <li className="flex">
                  <span className="font-bold text-amber-600 mr-2">4.</span>
                  <div>
                    <span className="font-semibold">Religious Policies:</span> {
                      ruler.policies.filter(p => 
                        p.toLowerCase().includes('religious') || 
                        p.toLowerCase().includes('islam') || 
                        p.toLowerCase().includes('hindu') ||
                        p.toLowerCase().includes('jizya')
                      ).join(', ') || 'Implemented various religious policies affecting social structure'
                    }
                  </div>
                </li>
                {ruler.monuments.length > 0 && (
                  <li className="flex">
                    <span className="font-bold text-amber-600 mr-2">5.</span>
                    <div>
                      <span className="font-semibold">Architectural Legacy:</span> {
                        ruler.monuments.join(', ')
                      }
                    </div>
                  </li>
                )}
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">UPSC Tip:</span> Focus on {ruler.name}'s {
                    ruler.id === "akbar" ? "religious tolerance and administrative reforms" :
                    ruler.id === "alauddin-khalji" ? "market reforms and military campaigns" :
                    ruler.id === "shah-jahan" ? "architectural contributions and centralized administration" :
                    ruler.id === "aurangzeb" ? "religious policies and territorial expansions" :
                    "key policies and achievements"
                  } when comparing with other rulers of the same period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RulerPage;