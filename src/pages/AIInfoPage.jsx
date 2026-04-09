import React from 'react';
import { Network, Database, Cpu, Search, Activity, Share2 } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import NeonCard from '../components/NeonCard';

const AIInfoPage = () => {
  return (
    <>
      <BackgroundAnimation type="default" />
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 relative z-10 text-white">
        
        <div className="text-center mb-16">
          <Cpu className="w-16 h-16 text-neon-purple mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-magenta">Architecture</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Understand how our autonomous agentic NLP core efficiently identifies, scopes, and routes public grievances at scale.
          </p>
        </div>

        <div className="space-y-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent -translate-x-1/2 z-0"></div>

          {/* Timeline Node 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/2 flex justify-end">
              <NeonCard color="cyan" className="max-w-md w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-neon-cyan/20 p-3 rounded-lg"><Search className="text-neon-cyan w-6 h-6" /></div>
                  <h3 className="text-xl font-bold">1. Semantic Input</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Citizens submit natural language grievances. The payload is instantly analyzed using locally scoped NLP heuristics to strip noise and isolate core entities (e.g., 'water', 'voltage').
                </p>
              </NeonCard>
            </div>
            <div className="hidden md:flex w-12 h-12 bg-black border-2 border-neon-cyan rounded-full items-center justify-center z-10 shadow-[0_0_15px_rgba(0,243,255,0.5)]">
               <span className="font-bold text-neon-cyan">1</span>
            </div>
            <div className="md:w-1/2"></div>
          </div>

          {/* Timeline Node 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative z-10">
            <div className="md:w-1/2 flex justify-start">
              <NeonCard color="purple" className="max-w-md w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-neon-purple/20 p-3 rounded-lg"><Network className="text-neon-purple w-6 h-6" /></div>
                  <h3 className="text-xl font-bold">2. Intent Classification</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Extracted keywords map onto deterministic routing graphs. The system assigns a canonical domain ID (e.g., 'tgt_electricity_grid_01') avoiding LLM hallucination and ensuring compliance.
                </p>
              </NeonCard>
            </div>
            <div className="hidden md:flex w-12 h-12 bg-black border-2 border-neon-purple rounded-full items-center justify-center z-10 shadow-[0_0_15px_rgba(181,0,255,0.5)]">
               <span className="font-bold text-neon-purple">2</span>
            </div>
            <div className="md:w-1/2"></div>
          </div>

          {/* Timeline Node 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/2 flex justify-end">
              <NeonCard color="blue" className="max-w-md w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-neon-blue/20 p-3 rounded-lg"><Share2 className="text-neon-blue w-6 h-6" /></div>
                  <h3 className="text-xl font-bold">3. Seamless Handoff</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The UI transitions the user context seamlessly into the specific state portal target URL using zero-latency redirection, completely bypassing intermediate authentication screens when applicable.
                </p>
              </NeonCard>
            </div>
            <div className="hidden md:flex w-12 h-12 bg-black border-2 border-neon-blue rounded-full items-center justify-center z-10 shadow-[0_0_15px_rgba(0,102,255,0.5)]">
               <span className="font-bold text-neon-blue">3</span>
            </div>
            <div className="md:w-1/2"></div>
          </div>

        </div>

      </div>
    </>
  );
};

export default AIInfoPage;
