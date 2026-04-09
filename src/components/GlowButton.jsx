import React from 'react';

const GlowButton = ({ children, onClick, color = 'cyan', type = 'button', className = '' }) => {
  const colorStyles = {
    cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/50 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_#00f3ff]',
    blue: 'bg-neon-blue/10 text-neon-blue border-neon-blue/50 hover:bg-neon-blue hover:text-white hover:shadow-[0_0_20px_#0066ff]',
    magenta: 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta/50 hover:bg-neon-magenta hover:text-white hover:shadow-[0_0_20px_#ff00ff]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-md border font-semibold tracking-wide uppercase transition-all duration-300 active:scale-95 ${colorStyles[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlowButton;
