import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Droplet, Trash2, Route, Shield } from 'lucide-react';
import NeonCard from '../components/NeonCard';
import BackgroundAnimation from '../components/BackgroundAnimation';

const portals = [
  {
    id: 'electricity',
    title: 'Electricity Board',
    desc: 'Power outages, billing issues, transformer damages.',
    icon: Zap,
    color: 'blue',
    url: 'https://tgsouthernpower.org/'
  },
  {
    id: 'water',
    title: 'Water Works',
    desc: 'Supply shortage, leaks, quality issues.',
    icon: Droplet,
    color: 'cyan',
    url: 'https://www.ghmc.gov.in/'
  },
  {
    id: 'sanitation',
    title: 'Sanitation Dept',
    desc: 'Garbage collection, drainage blocks.',
    icon: Trash2,
    color: 'magenta',
    url: 'https://www.ghmc.gov.in/'
  },
  {
    id: 'roads',
    title: 'Roads & Infrastructure',
    desc: 'Potholes, streetlights, pathway repair.',
    icon: Route,
    color: 'purple',
    url: 'https://www.ghmc.gov.in/'
  },
  {
    id: 'municipal',
    title: 'General Municipal',
    desc: 'Other local civic grievances.',
    icon: Shield,
    color: 'cyan',
    url: 'https://www.ghmc.gov.in/'
  }
];

const ComplaintPortal = () => {
  const navigate = useNavigate();

  const handlePortalClick = (dept, url) => {
    navigate(`/redirect/${dept}`, { state: { url } });
  };

  return (
    <>
      <BackgroundAnimation type="default" />
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            DEPARTMENT <span className="text-neon-cyan">PORTALS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Direct access to specific state grid integrations. Select the relevant domain below to be transparently linked to the authentic registry interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <NeonCard 
              key={portal.id} 
              color={portal.color} 
              className="flex flex-col h-full ring-transparent group"
              onClick={() => handlePortalClick(portal.id, portal.url)}
            >
              <div className={`p-4 rounded-full w-max mb-6 glass-panel border-${portal.color}-500/30 group-hover:bg-neon-${portal.color}/10 transition-colors`}>
                <portal.icon className={`w-8 h-8 text-neon-${portal.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{portal.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{portal.desc}</p>
              
              <div className={`flex items-center text-sm font-semibold text-neon-${portal.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                INITIATE LINK <Zap className="w-4 h-4 ml-2" />
              </div>
            </NeonCard>
          ))}
        </div>

      </div>
    </>
  );
};

export default ComplaintPortal;
