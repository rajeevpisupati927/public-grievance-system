import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bot, ArrowRight, Activity, Zap, ShieldAlert, Cpu, CheckCircle2, Languages, Server, Database, Shield } from 'lucide-react';
import NeonCard from '../components/NeonCard';
import GlowButton from '../components/GlowButton';
import BackgroundAnimation from '../components/BackgroundAnimation';
import InfoCarousel from '../components/InfoCarousel';
import { routeComplaint } from '../utils/nlpRouting';

const MetricsStrip = () => {
  return (
    <div className="w-full bg-dark-panel/80 border-b border-dark-border py-2 px-3 sm:px-6 flex justify-between items-center text-[10px] sm:text-xs font-mono text-gray-400 absolute top-0 left-0 z-20 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="flex items-center gap-1 sm:gap-1.5"><Shield className="w-3 h-3 text-neon-cyan" /> <span className="hidden sm:inline">IDENTITY STATUS:</span> <span className="text-neon-cyan font-bold">VERIFIED</span></span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center gap-1 sm:gap-1.5"><Activity className="w-3 h-3 text-neon-cyan animate-pulse shrink-0" /> <span className="hidden sm:inline">LIVE SYSTEM HEALTH:</span> 99.9%</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:flex items-center gap-1.5"><Server className="w-3 h-3" /> ACTIVE NODES: 2,420</span>
      </div>
      <div className="flex items-center gap-4">
        <span>NLP LATENCY: <span className="text-neon-cyan font-bold">18ms</span></span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:flex items-center gap-1.5"><Database className="w-3 h-3 text-neon-magenta" /> RESOLVED TODAY: 4,192</span>
      </div>
    </div>
  );
};

const HeatmapSection = () => {
  const [depts, setDepts] = useState([
    { name: 'Water Works', load: 84, color: 'cyan', incidents: 0 },
    { name: 'Electricity', load: 92, color: 'blue', incidents: 0 },
    { name: 'Sanitation', load: 45, color: 'magenta', incidents: 0 },
    { name: 'Roads Dept', load: 68, color: 'purple', incidents: 0 },
  ]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('complaints') || '[]');
    const counters = { water: 0, electricity: 0, sanitation: 0, roads: 0 };
    
    existing.forEach(c => {
      if (counters[c.dept] !== undefined) counters[c.dept]++;
    });

    setDepts(prev => prev.map(d => {
      const idMap = { 'Water Works': 'water', 'Electricity': 'electricity', 'Sanitation': 'sanitation', 'Roads Dept': 'roads' };
      const deptId = idMap[d.name];
      return { ...d, incidents: counters[deptId] || 0 };
    }));
  }, []);

  return (
    <div className="mt-12 md:mt-16 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-sm md:text-xl font-bold flex items-center gap-2">
          <Activity className="w-4 h-4 md:w-5 md:h-5 text-neon-cyan shrink-0" /> 
          LIVE DEPARTMENTAL HEATMAP
        </h3>
        <span className="text-xs font-mono text-gray-500 border border-gray-700 rounded px-2 py-1">AUTO-SYNC: ON</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {depts.map((d, i) => (
          <div key={i} className="glass-panel p-3 md:p-4 rounded-xl border border-dark-border/50 relative overflow-hidden group">
            <div className={`absolute bottom-0 left-0 h-1 bg-neon-${d.color} transition-all duration-1000`} style={{ width: `${d.load}%` }}></div>
            <h4 className="text-gray-300 font-medium text-xs md:text-sm mb-1">{d.name}</h4>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
              <span className={`text-xl md:text-2xl font-bold text-neon-${d.color}`}>{d.load}%</span>
              <span className="text-gray-500 text-[10px] md:text-xs mb-1">{d.incidents} active</span>
            </div>
            <div className={`absolute -right-4 -top-4 w-16 h-16 bg-neon-${d.color} blur-3xl opacity-10 group-hover:opacity-30 transition-opacity`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [complaint, setComplaint] = useState('');
  const [name, setName] = useState('');
  const [isHinglish, setIsHinglish] = useState(false);
  const [aadhaar, setAadhaar] = useState('0000 0000 0000');
  
  useEffect(() => {
    const userEmail = localStorage.getItem('pgrs_auth_token');
    if (userEmail) {
      const users = JSON.parse(localStorage.getItem('pgrs_users') || '{}');
      if (users[userEmail] && users[userEmail].aadhaar) {
        setAadhaar('XXXX XXXX ' + users[userEmail].aadhaar.slice(-4));
      }
    }
  }, []);
  
  // Processing state: 0 = input, 1 = analyzing, 2 = routed/scores, 3 = resolved/redirecting
  const [processState, setProcessState] = useState(0); 
  const [routingResult, setRoutingResult] = useState(null);
  const navigate = useNavigate();

  const triggerN8nWebhook = async (complaintData) => {
    try {
      const userEmail = localStorage.getItem('pgrs_auth_token') || 'anonymous@domain.com';
      const payload = {
        email: userEmail,
        new_complaint: complaintData
      };

      fetch('https://n8n-agent-bottt.onrender.com/webhook/5c2c345c-293d-4a2f-85a6-08e62bdfbad4', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Webhook error:', err));
    } catch (e) {
      console.error('Failed to trigger n8n webhook', e);
    }
  };

  const handleProcess = (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;
    
    setProcessState(1);
    
    // Step 1: Analyze Semantic Data
    setTimeout(() => {
      const result = routeComplaint(complaint);
      setRoutingResult(result);
      setProcessState(2);
      
      if (result.isValid) {
        // Save complaint history
        const newComplaint = {
          id: 'CMP-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
          name: name.trim() || 'Anonymous',
          desc: complaint,
          dept: result.dept,
          status: 'Forwarded to Dept',
          date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        };
        const existing = JSON.parse(localStorage.getItem('complaints') || '[]');
        const updated = [newComplaint, ...existing];
        localStorage.setItem('complaints', JSON.stringify(updated));

        // Let the AI Assistant know dynamically
        window.dispatchEvent(new CustomEvent('pgrs_new_complaint', { detail: newComplaint }));

        triggerN8nWebhook(newComplaint);

        // Step 2: Show routed state then redirect
        setTimeout(() => {
          setProcessState(3);
          
          // Final Redirect
          setTimeout(() => {
            navigate(`/redirect/${result.dept}`, { state: { url: result.url } });
          }, 1500);
        }, 2500);
      } else {
        // Step 2: Show low scores then show rejection
        setTimeout(() => {
          setProcessState(4);
        }, 2000);
      }
    }, 1500);
  };

  const placeholderText = isHinglish 
    ? "Describe issue (e.g. 'Paani nahi aa raha 2 din se', 'Current pass ho raha hai')"
    : "Describe your issue (e.g. 'Water is not coming for 5 days', 'Broken street light')";

  return (
    <>
      <MetricsStrip />
      <BackgroundAnimation type="default" />
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 mt-8 relative z-10 flex flex-col justify-center min-h-[calc(100vh-80px)]">
        
        {processState === 0 ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-12 animate-float">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                AI-DRIVEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">REDRESSAL</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-dark-panel border border-dark-border flex items-center gap-2 text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                  UIDAI: {aadhaar}
                </div>
              </div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
                Intelligent semantic routing for public grievances. Enter your issue below, and our autonomous NLP core will direct you to the exact departmental portal instantly.
              </p>
            </div>

            <InfoCarousel />

            <div className="max-w-3xl mx-auto w-full">
              <NeonCard color="cyan" className="p-1 relative">
                <form onSubmit={handleProcess} className="flex flex-col bg-black/50 rounded-xl overflow-hidden p-2 gap-2 relative z-10 w-full h-full min-h-0 min-w-0 max-w-full">
                  <div className="flex items-center justify-between px-4 pt-2">
                    <input
                      type="text"
                      placeholder="Your Name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-b border-dark-border/50 text-white px-2 py-2 focus:border-neon-cyan focus:outline-none focus:ring-0 text-sm placeholder-gray-600 transition-colors shrink-1 min-w-0"
                    />
                    <button 
                      type="button"
                      onClick={() => setIsHinglish(!isHinglish)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono border transition-colors ${
                        isHinglish 
                          ? 'bg-neon-cyan/20 border-neon-cyan/50 text-white shadow-[0_0_10px_rgba(0,243,255,0.3)]' 
                          : 'glass-panel text-gray-500 border-dark-border hover:text-white'
                      }`}
                    >
                      <Languages className="w-3 h-3" /> 
                      HINGLISH: {isHinglish ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="relative flex items-start w-full max-w-full">
                    <Bot className="w-8 h-8 text-neon-cyan ml-4 mr-2 mt-4 flex-shrink-0" />
                    <textarea
                      placeholder={placeholderText}
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      rows={3}
                      className="flex-1 bg-transparent border-none text-white px-4 py-4 focus:outline-none focus:ring-0 text-lg placeholder-gray-600 w-full min-w-0 block shrink-1 resize-none"
                    />
                    <GlowButton type="submit" color="cyan" className="ml-2 mt-4 flex flex-shrink-0 items-center justify-center gap-2 px-4 sm:px-6 py-2.5 max-w-[150px]">
                      <span className="hidden sm:inline text-xs">ENTER COMPLAINT</span> <Zap className="w-4 h-4 flex-shrink-0" />
                    </GlowButton>
                  </div>
                </form>
              </NeonCard>
            </div>
            
            <HeatmapSection />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto w-full py-12 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-center mb-8">NLP PROCESSING <span className="text-neon-cyan animate-pulse">PROTOCOL</span></h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-dark-border before:to-transparent">
              
              {/* Step 1: Submitted */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-dark-base text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl border border-neon-cyan/30">
                  <h3 className="font-bold text-white mb-1">Grievance Submitted</h3>
                  <p className="text-gray-400 text-sm">Payload encrypted and ingested into pipeline.</p>
                </div>
              </div>

              {/* Step 2: Analyzing */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors ${processState >= 1 ? 'border-white bg-dark-base text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'border-dark-border bg-dark-panel text-gray-500'}`}>
                  {processState === 1 ? <Cpu className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl transition-colors ${processState === 1 ? 'border border-neon-cyan/50 glow-border-cyan' : 'border border-dark-border'}`}>
                  <h3 className={`font-bold mb-1 ${processState >= 1 ? 'text-white' : 'text-gray-500'}`}>Semantic Extraction</h3>
                  <p className={`text-sm ${processState >= 1 ? 'text-gray-400' : 'text-gray-600'}`}>
                    {processState === 1 ? 'Running multi-lingual keyword analysis...' : 'Extraction complete.'}
                  </p>
                </div>
              </div>

              {/* Step 3: Routed & Scores */}
              {processState >= 2 && routingResult && (
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors ${processState >= 2 ? 'border-white bg-dark-base text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'border-dark-border bg-dark-panel text-gray-500'}`}>
                     {processState === 2 ? <Bot className="w-5 h-5 animate-pulse" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl transition-all ${processState === 2 ? 'border border-neon-cyan/50 glow-border-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)]' : 'border border-dark-border'}`}>
                    <h3 className="font-bold text-white mb-2">
                      {routingResult.isValid ? `Target Acquired: ${routingResult.topMatch.name}` : `Classification: Insufficient Confidence`}
                    </h3>
                    <div className="space-y-2 mt-3">
                      {routingResult.allScores.map((score, i) => (
                        <div key={i} className="bg-black/30 p-2 rounded flex justify-between items-center text-xs font-mono">
                          <span className="text-gray-300">{score.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full bg-neon-${score.color}`} style={{ width: `${score.confidence}%` }}></div>
                            </div>
                            <span className={`text-neon-${score.color} w-8 text-right`}>{score.confidence}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Connecting */}
              {processState === 3 && (
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-dark-base text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Zap className="w-5 h-5 animate-ping" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl border border-neon-cyan/50 glow-border-cyan">
                    <h3 className="font-bold text-white mb-1">Connecting to Secure Portal Requesting Authorization...</h3>
                    <p className="text-neon-cyan text-sm animate-pulse mt-2">Redirecting now...</p>
                  </div>
                </div>
              )}

              {/* Step 4: Rejected */}
              {processState === 4 && (
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neon-magenta bg-dark-base text-neon-magenta shadow-[0_0_10px_rgba(255,0,255,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl border border-neon-magenta/50 glow-border-magenta">
                    <h3 className="font-bold text-white mb-1">System Alert: Not a Public Grievance</h3>
                    <p className="text-neon-magenta opacity-90 text-sm mt-2 font-medium">The NLP Router detected extremely low confidence. This issue appears to fall under non-grievance categories (e.g. RTI, subjudice, generic suggestions). Routing aborted.</p>
                    <button onClick={() => { setProcessState(0); setComplaint(''); }} className="mt-4 px-4 py-2 flex items-center gap-2 text-xs font-bold border border-neon-magenta rounded text-neon-magenta hover:bg-neon-magenta/10 transition-colors">START NEW INQUIRY <Activity className="w-3 h-3" /></button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
