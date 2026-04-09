import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, AlertOctagon, Scale, BookOpen, Briefcase, MessageSquare, Droplet, Zap, Trash2, Route, HeartPulse, CheckCircle2 } from 'lucide-react';

const InfoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide1 = {
    title: "FOLLOWING ARE NOT TREATED AS GRIEVANCE",
    color: "neon-magenta",
    icon: <AlertOctagon className="w-6 h-6 text-neon-magenta animate-pulse" />,
    items: [
      { text: "RTI matters", icon: <BookOpen className="w-5 h-5 text-gray-400" /> },
      { text: "Religious matters", icon: <Info className="w-5 h-5 text-gray-400" /> },
      { text: "Service Matters of Govt. Employees", icon: <Briefcase className="w-5 h-5 text-gray-400" /> },
      { text: "Court related / Subjudice matters", icon: <Scale className="w-5 h-5 text-gray-400" /> },
      { text: "Suggestions", icon: <MessageSquare className="w-5 h-5 text-gray-400" /> },
    ]
  };

  const slide2 = {
    title: "FOLLOWING ARE TREATED AS GRIEVANCE",
    color: "neon-cyan",
    icon: <CheckCircle2 className="w-6 h-6 text-neon-cyan" />,
    items: [
      { text: "Water Supply Issues", icon: <Droplet className="w-5 h-5 text-neon-cyan/70" /> },
      { text: "Electricity Outages & Billing", icon: <Zap className="w-5 h-5 text-neon-cyan/70" /> },
      { text: "Sanitation / Garbage Collection", icon: <Trash2 className="w-5 h-5 text-neon-cyan/70" /> },
      { text: "Road Maintenance / Potholes", icon: <Route className="w-5 h-5 text-neon-cyan/70" /> },
      { text: "Public Health Concerns", icon: <HeartPulse className="w-5 h-5 text-neon-cyan/70" /> },
    ]
  };

  const currentData = currentSlide === 0 ? slide1 : slide2;

  const shadowClass = currentSlide === 0 
    ? "shadow-[0_0_20px_rgba(255,0,255,0.15)]" 
    : "shadow-[0_0_20px_rgba(0,243,255,0.15)]";

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 relative group">
      
      {/* Container with dynamic border and glow based on slide */}
      <div className={`glass-panel rounded-xl border border-${currentData.color}/50 overflow-hidden transition-all duration-700 ${shadowClass}`}>
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-dark-border/50 bg-black/20">
          <div className="flex items-center gap-3">
            {currentData.icon}
            <h2 className="text-lg md:text-xl font-bold tracking-wide text-white">
              {currentData.title}
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-1 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="p-1 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 relative min-h-[160px]">
          {/* We use a key to force animation re-trigger on slide change */}
          <div key={currentSlide} className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-500">
            {currentData.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black/30 px-4 py-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                <div className="shrink-0 p-2 glass-panel rounded-full border-dark-border">
                  {item.icon}
                </div>
                <span className="text-gray-300 font-medium text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 pb-4">
          <div className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${currentSlide === 0 ? `bg-${slide1.color} shadow-[0_0_8px_rgba(255,0,255,0.8)]` : 'bg-gray-600'}`}/>
          <div className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${currentSlide === 1 ? `bg-${slide2.color} shadow-[0_0_8px_rgba(0,243,255,0.8)]` : 'bg-gray-600'}`}/>
        </div>
      </div>
    </div>
  );
};

export default InfoCarousel;
