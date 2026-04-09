import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Loader2, ExternalLink, ShieldCheck, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import GlowButton from '../components/GlowButton';

const WebViewTransition = () => {
  const { dept } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Default map if no state is passed
  const fallbackUrls = {
    water: 'https://www.ghmc.gov.in/',
    electricity: 'https://tgsouthernpower.org/',
    sanitation: 'https://www.ghmc.gov.in/',
    roads: 'https://www.ghmc.gov.in/',
    municipal: 'https://www.ghmc.gov.in/',
  };

  const targetUrl = location.state?.url || fallbackUrls[dept] || fallbackUrls['municipal'];

  const deptInstructions = {
    water: [
      "Navigate to the 'Water & Sewerage' section on the portal.",
      "Click on 'New Grievance' and select 'Water Supply'.",
      "Enter your Customer Account Number (CAN) if you have one."
    ],
    electricity: [
      "Select your specific Circle/Division from the dropdown menu.",
      "Click on 'Lodge a Complaint' (often marked in red).",
      "Keep your 9-digit Consumer Number handy."
    ],
    sanitation: [
      "Look for the 'Health & Sanitation' tab on the homepage.",
      "Uploading a clear photo of the issue highly speeds up resolution.",
      "Provide exact landmark details in the description box."
    ],
    roads: [
      "Go to 'Engineering & Public Works'.",
      "Select 'Potholes / Road Repair' category.",
      "Pinpoint the location using the integrated map feature if available."
    ],
    municipal: [
      "Create a citizen account or choose 'Continue as Guest'.",
      "Select the category that best matches your issue.",
      "Note down the 'Grievance Tracking ID' provided at the end for future reference."
    ]
  };

  const instructions = deptInstructions[dept] || deptInstructions['municipal'];

  useEffect(() => {
    // Simulate secure connection processing
    if (!showInstructions) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setShowInstructions(true), 400); // Small pause at 100%
            return 100;
          }
          return prev + 10; // increment progress
        });
      }, 70);

      return () => clearInterval(interval);
    }
  }, [showInstructions]);

  const handleProceed = () => {
    window.location.replace(targetUrl);
  };

  return (
    <>
      <BackgroundAnimation type={dept || 'default'} />
      <div className="flex-1 w-full flex items-center justify-center relative z-10 px-6 py-12 min-h-[calc(100vh-80px)]">
        
        {!showInstructions ? (
          <div className="glass-panel p-10 rounded-2xl max-w-xl w-full text-center border-neon-cyan/30 flex flex-col items-center animate-pulse-slow">
            <ShieldCheck className="w-16 h-16 text-neon-cyan mb-6 animate-pulse" />
            
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Securing Connection</h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
              Establishing direct encrypted link to the official {dept?.toUpperCase() || 'MUNICIPAL'} grievance portal...
            </p>

            <div className="w-full bg-dark-base rounded-full h-2 mb-6 overflow-hidden border border-gray-800">
              <div 
                className="bg-neon-cyan h-2 rounded-full transition-all ease-out duration-100 shadow-[0_0_10px_#00f3ff]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-3 text-neon-blue font-mono text-sm tracking-widest">
              <Loader2 className="w-4 h-4 animate-spin" />
              ANALYZING DEPT ROUTES...
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 md:p-10 rounded-2xl max-w-2xl w-full border-neon-purple/30 relative overflow-hidden transition-all duration-500 transform translate-y-0 opacity-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-purple"></div>
            
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-neon-purple/20 p-3 rounded-xl flex-shrink-0">
                <Info className="w-8 h-8 text-neon-purple" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">How to file your grievance</h2>
                <p className="text-gray-400 text-sm">
                  The official {dept?.toUpperCase() || 'MUNICIPAL'} portal can be complex. Please follow these simple instructions when you arrive to ensure your complaint is logged correctly:
                </p>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-6 mb-8 border border-dark-border">
              <ul className="space-y-4">
                {instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 bg-neon-blue/5 rounded-xl border border-neon-blue/20">
              <div className="text-sm text-gray-400 break-all w-full sm:max-w-[60%] flex gap-2 items-center font-mono">
                <ExternalLink className="w-4 h-4 flex-shrink-0 text-neon-blue" />
                <span className="truncate" title={targetUrl}>{targetUrl}</span>
              </div>
              <GlowButton color="cyan" onClick={handleProceed} className="w-full sm:w-auto flex items-center justify-center gap-2 whitespace-nowrap px-8 py-3 font-semibold tracking-wider">
                PROCEED <ArrowRight className="w-4 h-4" />
              </GlowButton>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default WebViewTransition;
