import { Ruler } from '../types';

export const rulers: Ruler[] = [
  // Mamluk/Slave Dynasty
  {
    id: "qutb-ud-din-aibak",
    name: "Qutb ud-Din Aibak",
    dynastyId: "mamluk-dynasty",
    reign: "1206-1210",
    description: "Qutb ud-Din Aibak was the founder of the Mamluk dynasty. He was a former slave who rose to become a general in Muhammad Ghori's army and later became the first Sultan of Delhi.",
    achievements: [
      "Established the first Muslim dynasty in India",
      "Started the construction of Qutub Minar",
      "Expanded the territories in North India"
    ],
    policies: [
      "Maintained administrative continuity with previous rulers",
      "Encouraged art and architecture",
      "Established a centralized administration"
    ],
    monuments: ["Qutub Minar", "Quwwat-ul-Islam Mosque"],
    image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg"
  },
  {
    id: "iltutmish",
    name: "Shams ud-Din Iltutmish",
    dynastyId: "mamluk-dynasty",
    reign: "1211-1236",
    description: "Iltutmish was the third ruler of the Mamluk dynasty and is considered the real founder of the Delhi Sultanate. He was a slave of Qutb ud-Din Aibak who rose to become his son-in-law and successor.",
    achievements: [
      "Saved Delhi Sultanate from Mongol invasions",
      "Introduced silver currency (tanka) and copper currency (jital)",
      "Completed the construction of Qutub Minar",
      "Got recognition from the Abbasid Caliphate"
    ],
    policies: [
      "Established Iqta System for land administration",
      "Organized the nobility into 'The Forty' (Turkan-i-Chahalgani)",
      "Reformed the military administration"
    ],
    monuments: ["Completed Qutub Minar", "Hauz-i-Shamsi", "Sultan Ghari Tomb"],
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
  },
  {
    id: "razia-sultana",
    name: "Razia Sultana",
    dynastyId: "mamluk-dynasty",
    reign: "1236-1240",
    description: "Razia Sultana was the first and only female ruler of the Delhi Sultanate. She was the daughter of Iltutmish and was designated as his successor by him, overlooking his sons.",
    achievements: [
      "First female Muslim ruler in the Indian subcontinent",
      "Challenged the nobility by asserting her authority",
      "Demonstrated exceptional leadership abilities in a male-dominated society"
    ],
    policies: [
      "Tried to break the power of Turkish nobility",
      "Maintained religious tolerance",
      "Promoted meritocracy over aristocracy"
    ],
    monuments: [],
    image: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg"
  },
  
  // Khalji Dynasty
  {
    id: "alauddin-khalji",
    name: "Alauddin Khalji",
    dynastyId: "khalji-dynasty",
    reign: "1296-1316",
    description: "Alauddin Khalji was the most powerful ruler of the Khalji dynasty. He expanded the Delhi Sultanate into South India and implemented numerous administrative reforms.",
    achievements: [
      "Successful defense against multiple Mongol invasions",
      "Extended empire into South India for the first time",
      "Implemented market control system and price regulations",
      "Military campaigns against Rajput kingdoms and Southern states"
    ],
    policies: [
      "Market control policies (fixed prices for goods)",
      "Land revenue reforms (increased to 50% of produce)",
      "Military reforms and creation of a standing army",
      "Prohibition of alcohol and social gatherings of nobles"
    ],
    monuments: ["Alai Darwaza", "Alai Minar", "Siri Fort", "Hauz Khas"],
    image: "https://images.pexels.com/photos/5244186/pexels-photo-5244186.jpeg"
  },
  
  // Tughlaq Dynasty
  {
    id: "muhammad-bin-tughlaq",
    name: "Muhammad bin Tughlaq",
    dynastyId: "tughlaq-dynasty",
    reign: "1325-1351",
    description: "Muhammad bin Tughlaq was the second ruler of the Tughlaq dynasty. He is known for his controversial policies and administrative experiments, which often failed despite their innovative nature.",
    achievements: [
      "Expanded the Sultanate to its largest territorial extent",
      "Introduced token currency system (copper coins)",
      "Attempted agricultural reforms and tax policies"
    ],
    policies: [
      "Transfer of capital from Delhi to Daulatabad",
      "Introduction of token currency",
      "Taxation in the Doab region",
      "Planned invasion of Khurasan and creation of a new department of agriculture"
    ],
    monuments: ["Tughlaqabad Fort"],
    image: "https://images.pexels.com/photos/9582344/pexels-photo-9582344.jpeg"
  },
  {
    id: "firoz-shah-tughlaq",
    name: "Firoz Shah Tughlaq",
    dynastyId: "tughlaq-dynasty",
    reign: "1351-1388",
    description: "Firoz Shah Tughlaq was the third ruler of the Tughlaq dynasty. He is known for his peaceful reign and numerous public works projects.",
    achievements: [
      "Built numerous cities, mosques, madrasas, and hospitals",
      "Encouraged agriculture through irrigation projects",
      "Promoted education and scholarship"
    ],
    policies: [
      "Abolished torture and harsh punishments",
      "Discontinued unpopular taxes",
      "Built canals for irrigation",
      "Created the Diwan-i-Khairat (department of charity)"
    ],
    monuments: ["Firoz Shah Kotla", "Hauz Khas Complex", "Jami Masjid of Delhi"],
    image: "https://images.pexels.com/photos/236415/pexels-photo-236415.jpeg"
  },
  
  // Lodi Dynasty
  {
    id: "ibrahim-lodi",
    name: "Ibrahim Lodi",
    dynastyId: "lodi-dynasty",
    reign: "1517-1526",
    description: "Ibrahim Lodi was the last ruler of the Lodi dynasty and the Delhi Sultanate. His reign ended with his defeat at the First Battle of Panipat against Babur, who then established the Mughal Empire.",
    achievements: [
      "Maintained control over the declining Delhi Sultanate",
      "Fought against various rebellions by nobles"
    ],
    policies: [
      "Attempted to centralize administration",
      "Tried to curb the power of Afghan nobles",
      "Implemented strict control measures"
    ],
    monuments: ["Lodi Gardens structures"],
    image: "https://images.pexels.com/photos/10803612/pexels-photo-10803612.jpeg"
  },
  
  // Mughal Empire
  {
    id: "babur",
    name: "Babur",
    dynastyId: "mughal-empire",
    reign: "1526-1530",
    description: "Babur was the founder of the Mughal Empire. He was a descendant of Timur and Genghis Khan who came to India from Central Asia and defeated Ibrahim Lodi at the First Battle of Panipat.",
    achievements: [
      "Established the Mughal Empire in India",
      "Victory at the First Battle of Panipat using superior military tactics",
      "Introduced new military technology including artillery and firearms",
      "Wrote the Baburnama, a detailed memoir of his life"
    ],
    policies: [
      "Religious tolerance",
      "Maintained existing administrative systems",
      "Distributed lands and wealth to nobles to ensure loyalty"
    ],
    monuments: ["Gardens in Kabul and Lahore", "Mosques in Ayodhya and Sambhal"],
    image: "https://images.pexels.com/photos/799463/pexels-photo-799463.jpeg"
  },
  {
    id: "akbar",
    name: "Akbar the Great",
    dynastyId: "mughal-empire",
    reign: "1556-1605",
    description: "Akbar was the third Mughal emperor and one of the greatest rulers in Indian history. He significantly expanded the empire and implemented numerous religious, social, and administrative reforms.",
    achievements: [
      "Expanded Mughal territory through conquests of Gujarat, Bengal, Kashmir, and parts of Deccan",
      "Established an efficient administrative system",
      "Promoted religious tolerance and cultural integration",
      "Founded Din-i-Ilahi, a syncretic religious movement"
    ],
    policies: [
      "Mansabdari system for military and civil administration",
      "Abolished Jizya tax on non-Muslims",
      "Land revenue reforms under Raja Todar Mal (Zabti system)",
      "Promoted marriages with Rajput princesses for political alliances"
    ],
    monuments: ["Fatehpur Sikri", "Agra Fort", "Buland Darwaza", "Humayun's Tomb"],
    image: "https://images.pexels.com/photos/5637687/pexels-photo-5637687.jpeg"
  },
  {
    id: "jahangir",
    name: "Jahangir",
    dynastyId: "mughal-empire",
    reign: "1605-1627",
    description: "Jahangir was the fourth Mughal emperor. He was known for his love of art and nature, and his reign saw significant cultural development.",
    achievements: [
      "Expanded the empire in the Deccan",
      "Patronage of arts, especially painting",
      "Established the Chain of Justice for public grievances",
      "Wrote his autobiography, Tuzuk-i-Jahangiri"
    ],
    policies: [
      "Continued Akbar's policy of religious tolerance",
      "Implemented the Chain of Justice system",
      "Restricted the consumption of alcohol and drugs",
      "Reformed the judicial system"
    ],
    monuments: ["Parts of Lahore Fort", "Moti Masjid at Lahore", "Gardens in Kashmir"],
    image: "https://images.pexels.com/photos/6462662/pexels-photo-6462662.jpeg"
  },
  {
    id: "shah-jahan",
    name: "Shah Jahan",
    dynastyId: "mughal-empire",
    reign: "1628-1658",
    description: "Shah Jahan was the fifth Mughal emperor, known as the Builder Emperor for his extensive architectural projects, most notably the Taj Mahal.",
    achievements: [
      "Built numerous architectural masterpieces",
      "Expanded the empire further into the Deccan",
      "Developed Delhi as Shahjahanabad (Old Delhi)",
      "Presided over the golden age of Mughal architecture"
    ],
    policies: [
      "Centralized administration",
      "Reimposed Jizya tax briefly",
      "Strengthened imperial authority",
      "Patronage of arts and architecture"
    ],
    monuments: ["Taj Mahal", "Red Fort", "Jama Masjid, Delhi", "Pearl Mosque, Agra", "Shalimar Gardens"],
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg"
  },
  {
    id: "aurangzeb",
    name: "Aurangzeb",
    dynastyId: "mughal-empire",
    reign: "1658-1707",
    description: "Aurangzeb was the sixth Mughal emperor and last of the great Mughals. His reign saw the largest territorial extent of the empire but also the beginning of its decline.",
    achievements: [
      "Expanded the empire to its greatest territorial extent",
      "Conquered the Deccan sultanates",
      "Strengthened Islamic law and governance",
      "Efficient administration and military campaigns"
    ],
    policies: [
      "Reimposed Jizya tax on non-Muslims",
      "Banned music and arts at court",
      "Implemented strict Islamic law (Sharia)",
      "Destroyed some Hindu temples",
      "Increased land revenue to fund military campaigns"
    ],
    monuments: ["Badshahi Mosque, Lahore", "Bibi ka Maqbara", "Pearl Mosque at Delhi"],
    image: "https://images.pexels.com/photos/1161782/pexels-photo-1161782.jpeg"
  },
  
  // Deccan Sultanates
  {
    id: "muhammad-quli-qutb-shah",
    name: "Muhammad Quli Qutb Shah",
    dynastyId: "deccan-sultanates",
    reign: "1580-1612",
    description: "Muhammad Quli Qutb Shah was the fifth sultan of the Qutb Shahi dynasty of Golconda. He founded the city of Hyderabad and was a patron of the arts.",
    achievements: [
      "Founded the city of Hyderabad in 1591",
      "Patronized literature and arts",
      "Built numerous public works",
      "Promoted Telugu and local cultures alongside Persian"
    ],
    policies: [
      "Religious tolerance",
      "Urban development",
      "Cultural synthesis of Persian and Indian traditions",
      "Water management systems"
    ],
    monuments: ["Charminar", "Mecca Masjid", "Golconda Fort improvements"],
    image: "https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg"
  }
];