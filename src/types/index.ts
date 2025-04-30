export interface Dynasty {
  id: string;
  name: string;
  period: string;
  description: string;
  image: string;
  color: string;
}

export interface Ruler {
  id: string;
  name: string;
  dynastyId: string;
  reign: string;
  description: string;
  achievements: string[];
  policies: string[];
  monuments: string[];
  image: string;
}

export interface Monument {
  id: string;
  name: string;
  location: string;
  builtBy: string; // rulerId
  year: string;
  description: string;
  significance: string;
  image: string;
}

export interface Mahajanapada {
  id: string;
  name: string;
  capital: string;
  period: string;
  description: string;
  rulers: MahajanapadaRuler[];
  monuments: string[];
  significance: string;
  image: string;
}

export interface MahajanapadaRuler {
  name: string;
  period: string;
  achievements: string[];
  significance: string;
}