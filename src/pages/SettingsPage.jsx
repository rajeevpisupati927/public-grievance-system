import React, { useState } from 'react';
import { User, Lock, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import GlowButton from '../components/GlowButton';
import BackgroundAnimation from '../components/BackgroundAnimation';

const SettingsPage = () => {
  const userEmail = localStorage.getItem('pgrs_auth_token') || 'citizen@domain.com';
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('pgrs_users') || '{}');
    const user = users[userEmail];

    if (!user || user.password !== currentPassword) {
      setMessage({ type: 'error', text: 'Incorrect current password.' });
      return;
    }

    // Save
    user.password = newPassword;
    localStorage.setItem('pgrs_users', JSON.stringify(users));
    
    // Reset forms
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage({ type: 'success', text: 'Account configuration successfully synchronized.' });
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 mt-16 relative z-10 flex flex-col">
      <BackgroundAnimation type="default" />
      
      <div className="flex items-center gap-4 mb-8 border-b border-dark-border pb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="p-4 rounded-xl glass-panel border border-neon-cyan/50 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
          <User className="w-8 h-8 text-neon-cyan" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-white">ACCOUNT <span className="text-neon-cyan font-light">SETTINGS</span></h1>
          <p className="text-gray-400 mt-1">Manage your centralized civic profile and security constraints.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Info panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-dark-border shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Identity Overview</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Registered Node</label>
                <div className="text-white font-mono break-all">{userEmail}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Access Level</label>
                <div className="text-neon-cyan flex items-center gap-1 font-medium"><CheckCircle2 className="w-4 h-4" /> Standard Citizen</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-dark-border shadow-lg opacity-70">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
              Notification Preferences
              <span className="text-[10px] bg-dark-border px-2 py-0.5 rounded uppercase font-bold text-gray-400">Locked</span>
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-not-allowed">
                 <input type="checkbox" disabled checked className="w-4 h-4 rounded appearance-none checked:bg-neon-cyan/20 border border-neon-cyan" />
                 <span className="text-sm text-gray-400">Email Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-not-allowed">
                 <input type="checkbox" disabled checked className="w-4 h-4 rounded appearance-none checked:bg-neon-cyan/20 border border-neon-cyan" />
                 <span className="text-sm text-gray-400">SMS Updates</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">Preferences are managed at the terminal level in this build.</p>
          </div>
        </div>

        {/* Security panel */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-dark-border shadow-lg h-full">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-neon-blue" />
              <h2 className="text-2xl font-bold text-white">Security Integrity</h2>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-xl">
              Ensure your account passkey remains secure. You can update your encryption credentials below.
            </p>

            {message.type === 'error' && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 animate-in shake">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <span>{message.text}</span>
              </div>
            )}
            
            {message.type === 'success' && (
              <div className="mb-6 p-4 bg-green-900/10 border border-neon-cyan/30 rounded-xl flex items-center gap-3 text-neon-cyan animate-in fade-in duration-300">
                 <CheckCircle2 className="w-5 h-5 shrink-0" />
                 <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-md">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Passkey</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-dark-border/80 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-1 focus:ring-neon-blue focus:border-neon-blue transition-colors"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">New Passkey</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-dark-border/80 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Confirm New Passkey</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-dark-border/80 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-colors"
                />
              </div>

              <GlowButton type="submit" color="blue" className="pt-4 mt-4 w-auto flex items-center gap-2 px-8">
                <Save className="w-5 h-5" /> SYNCHRONIZE DATA
              </GlowButton>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
