import React from 'react';

const BackgroundAnimation = ({ type = 'default' }) => {
  const getStyles = () => {
    switch (type) {
      case 'water':
        return 'bg-gradient-to-b from-blue-900/20 to-cyan-900/20';
      case 'electricity':
        return 'bg-gradient-to-tr from-yellow-900/10 via-purple-900/20 to-blue-900/20';
      case 'sanitation':
        return 'bg-gradient-to-bl from-green-900/10 to-teal-900/20';
      case 'roads':
        return 'bg-gradient-to-r from-gray-900/40 via-gray-800/20 to-gray-900/40';
      default:
        return 'bg-gradient-to-br from-indigo-950 via-gray-900 to-black';
    }
  };

  return (
    <div className={`fixed inset-0 z-0 transition-colors duration-1000 ${getStyles()}`}>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-cyan/5 blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default BackgroundAnimation;
