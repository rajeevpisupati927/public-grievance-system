import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, Home, Grid, Cpu, Activity, HelpCircle, LogOut, User, Settings, ShieldCheck, ChevronDown } from 'lucide-react';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userEmail = localStorage.getItem('pgrs_auth_token') || 'citizen@domain.com';

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium transition-colors text-neon-cyan hover:text-white px-3 py-1.5 border border-dark-border hover:border-neon-cyan/50 hover:bg-neon-cyan/10 rounded-full shadow-[0_0_10px_rgba(0,243,255,0)] hover:shadow-[0_0_10px_rgba(0,243,255,0.2)]"
      >
        <div className="w-6 h-6 rounded-full bg-black border border-neon-cyan/50 flex items-center justify-center overflow-hidden shrink-0">
          <User className="w-3.5 h-3.5" />
        </div>
        <span className="max-w-[80px] sm:max-w-[120px] truncate">{userEmail.split('@')[0]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 glass-panel border border-dark-border rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-dark-border bg-black/40">
             <div className="text-white text-sm font-semibold truncate" title={userEmail}>{userEmail}</div>
             <div className="text-neon-cyan text-xs flex items-center gap-1 mt-1"><ShieldCheck className="w-3 h-3" /> Verified Citizen</div>
          </div>
          
          <div className="py-2 flex flex-col">
            <button onClick={() => { setIsOpen(false); navigate('/history'); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-border/50 flex items-center gap-2 transition-colors">
              <Activity className="w-4 h-4 text-neon-blue" />
              My Grievances
            </button>
            <button onClick={() => { setIsOpen(false); navigate('/settings'); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-border/50 flex items-center gap-2 transition-colors">
              <Settings className="w-4 h-4 text-gray-400" />
              Account Settings
            </button>
          </div>

          <div className="border-t border-dark-border py-2">
            <button 
              onClick={() => { setIsOpen(false); onLogout(); }} 
              className="w-full text-left px-4 py-2 text-sm text-neon-magenta hover:bg-neon-magenta/10 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" /> 
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ onLogout }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-dark-border py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
          <span className="text-xl font-bold tracking-widest text-white drop-shadow-md">
            PGRS <span className="text-neon-cyan font-light">SYSTEM</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-8">
            <NavLink to="/" className={({isActive}) => `flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-cyan ${isActive ? 'text-neon-cyan outline-none' : 'text-gray-400'}`}>
              <Home className="w-4 h-4" /> DASHBOARD
            </NavLink>
            <NavLink to="/portals" className={({isActive}) => `flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-blue ${isActive ? 'text-neon-blue outline-none' : 'text-gray-400'}`}>
              <Grid className="w-4 h-4" /> PORTALS
            </NavLink>
            <NavLink to="/ai-info" className={({isActive}) => `flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-purple ${isActive ? 'text-neon-purple outline-none' : 'text-gray-400'}`}>
              <Cpu className="w-4 h-4" /> AI CORE
            </NavLink>
            <NavLink to="/history" className={({isActive}) => `flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-cyan ${isActive ? 'text-neon-cyan outline-none' : 'text-gray-400'}`}>
              <Activity className="w-4 h-4" /> HISTORY
            </NavLink>
            <NavLink to="/faq" className={({isActive}) => `flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-cyan ${isActive ? 'text-neon-cyan outline-none' : 'text-gray-400'}`}>
              <HelpCircle className="w-4 h-4" /> FAQ
            </NavLink>
          </div>
          {onLogout && (
            <ProfileDropdown onLogout={onLogout} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
