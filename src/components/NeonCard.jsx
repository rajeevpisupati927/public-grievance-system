import React from 'react';

const NeonCard = ({ children, className = '', color = 'cyan', onClick }) => {
  const borderColors = {
    cyan: 'glow-border-cyan',
    blue: 'glow-border-blue',
    magenta: 'glow-border-magenta',
    purple: 'glow-border-purple',
  };

  return (
    <div 
      onClick={onClick}
      className={`glass-panel rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${borderColors[color] || borderColors.cyan} ${className}`}
    >
      {children}
    </div>
  );
};

export default NeonCard;
