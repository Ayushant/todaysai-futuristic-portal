
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Location = {
  id: string;
  name: string;
  type: 'headquarters' | 'office' | 'client' | 'deployment';
  coordinates: [number, number]; // [x%, y%] as percentages of the map container
  region: string;
};

const locations: Location[] = [
  // Headquarters and offices
  { id: 'pune', name: 'Pune', type: 'headquarters', coordinates: [68.5, 47.5], region: 'Asia' },
  { id: 'singapore', name: 'Singapore', type: 'office', coordinates: [73.5, 49.5], region: 'Asia' },
  { id: 'berlin', name: 'Berlin', type: 'office', coordinates: [50.5, 37.5], region: 'Europe' },
  
  // Clients and deployments
  { id: 'tokyo', name: 'Tokyo', type: 'client', coordinates: [80.5, 41.5], region: 'Asia' },
  { id: 'sydney', name: 'Sydney', type: 'deployment', coordinates: [82.5, 62.5], region: 'Australia' },
  { id: 'dubai', name: 'Dubai', type: 'client', coordinates: [61.5, 45.5], region: 'Middle East' },
  { id: 'london', name: 'London', type: 'client', coordinates: [47.5, 36.5], region: 'Europe' },
  { id: 'paris', name: 'Paris', type: 'deployment', coordinates: [48.5, 38.5], region: 'Europe' },
  { id: 'newyork', name: 'New York', type: 'client', coordinates: [28.5, 41.5], region: 'North America' },
  { id: 'sf', name: 'San Francisco', type: 'deployment', coordinates: [20.5, 41.5], region: 'North America' },
  { id: 'toronto', name: 'Toronto', type: 'client', coordinates: [26.5, 39.5], region: 'North America' },
  { id: 'mexico', name: 'Mexico City', type: 'deployment', coordinates: [25.5, 47.5], region: 'North America' },
  { id: 'saopaulo', name: 'São Paulo', type: 'client', coordinates: [32.5, 57.5], region: 'South America' },
  { id: 'capetown', name: 'Cape Town', type: 'deployment', coordinates: [52.5, 60.5], region: 'Africa' },
];

const GlobalImpact = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = React.useState<string | null>(null);

  const regions = Array.from(new Set(locations.map(loc => loc.region)));

  // Function to create connection lines
  useEffect(() => {
    // This would normally be done with SVG paths, but for simplicity we're using a basic approach
    // A production version would implement proper curved SVG paths between locations
    const createConnectionLines = () => {
      // Implementation would go here in a production environment
      console.log('Connection lines would be created here');
    };
    
    createConnectionLines();
  }, []);

  const filterByRegion = (location: Location) => {
    if (!activeRegion) return true;
    return location.region === activeRegion;
  };
  
  return (
    <section className="py-20 relative overflow-hidden bg-navy">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-elecblue/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-techpurple/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">Global Impact</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            From our roots in Pune to clients and deployments worldwide, see how TodaysAi is 
            transforming industries across the globe.
          </p>
        </div>
        
        {/* Region filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button 
            className={`px-4 py-2 rounded-full text-sm ${!activeRegion ? 'bg-techpurple text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
            onClick={() => setActiveRegion(null)}
          >
            All Regions
          </button>
          {regions.map(region => (
            <button 
              key={region}
              className={`px-4 py-2 rounded-full text-sm ${activeRegion === region ? 'bg-techpurple text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
        
        {/* World map */}
        <div 
          ref={mapContainerRef}
          className="relative w-full h-[500px] glass-card overflow-hidden"
        >
          {/* Map background */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* This would be a detailed world map SVG in a production environment */}
              <path d="M150,100 Q400,50 600,100 T850,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M100,200 Q350,150 550,200 T900,200" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M200,300 Q400,250 600,300 T850,300" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>
          </div>
          
          {/* Location markers */}
          {locations.filter(filterByRegion).map((location) => (
            <motion.div
              key={location.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute"
              style={{ 
                left: `${location.coordinates[0]}%`,
                top: `${location.coordinates[1]}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                className={`relative group cursor-pointer`}
                title={location.name}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${
                    location.type === 'headquarters' 
                      ? 'bg-neon-purple' 
                      : location.type === 'office'
                      ? 'bg-neon-blue'
                      : location.type === 'client'
                      ? 'bg-neon-green'
                      : 'bg-neon-pink'
                  }`}
                ></div>
                <div className="absolute inset-0 animate-pulse-glow rounded-full" style={{ 
                  background: `${
                    location.type === 'headquarters' 
                      ? 'rgba(177, 78, 255, 0.5)' 
                      : location.type === 'office'
                      ? 'rgba(13, 204, 255, 0.5)'
                      : location.type === 'client'
                      ? 'rgba(0, 255, 163, 0.5)'
                      : 'rgba(255, 94, 223, 0.5)'
                  }`,
                  filter: 'blur(6px)',
                }}></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-navy-200 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                    <div className="font-semibold">{location.name}</div>
                    <div className="capitalize text-white/70">{location.type}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-neon-purple mr-2"></span>
            <span className="text-white/80 text-sm">Headquarters</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-neon-blue mr-2"></span>
            <span className="text-white/80 text-sm">Offices</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-neon-green mr-2"></span>
            <span className="text-white/80 text-sm">Clients</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-neon-pink mr-2"></span>
            <span className="text-white/80 text-sm">AI Deployments</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpact;
