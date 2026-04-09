import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints') || '[]');
    setHistory(stored);
  }, []);

  return (
    <>
      <BackgroundAnimation type="default" />
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col min-h-[calc(100vh-80px)]">
        
        <div className="w-full max-w-6xl mx-auto mt-12 mb-12">
          <div className="flex items-center justify-center gap-4 mb-10">
            <Activity className="w-10 h-10 text-neon-cyan" />
            <h2 className="text-4xl font-bold tracking-tight">History</h2>
          </div>
          
          <div className="glass-panel rounded-2xl overflow-hidden border-dark-border/50 shadow-[0_0_30px_rgba(0,243,255,0.05)] text-sm md:text-base">
            {history.length === 0 ? (
              <div className="p-12 text-center text-gray-500 font-medium tracking-wide">No complaints registered yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-black/60 border-b border-dark-border/50">
                      <th className="p-5 font-semibold text-gray-300">Tracking ID</th>
                      <th className="p-5 font-semibold text-gray-300">Name</th>
                      <th className="p-5 font-semibold text-gray-300">Issue</th>
                      <th className="p-5 font-semibold text-gray-300">Department</th>
                      <th className="p-5 font-semibold text-gray-300">Status</th>
                      <th className="p-5 font-semibold text-gray-300">Date Logged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, idx) => (
                      <tr key={idx} className="border-b border-dark-border/20 hover:bg-white/5 transition-colors">
                        <td className="p-5 font-mono text-neon-blue">{item.id}</td>
                        <td className="p-5 text-gray-200">{item.name}</td>
                        <td className="p-5 text-gray-400 max-w-[200px] sm:max-w-[300px] truncate" title={item.desc}>{item.desc}</td>
                        <td className="p-5 uppercase text-xs font-bold text-neon-purple tracking-widest">{item.dept}</td>
                        <td className="p-5">
                          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-5 text-gray-500 font-mono text-xs">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default HistoryPage;
