import React, { useState } from 'react';
import { Mail, Lock, Shield, ArrowRight, UserPlus, LogIn, AlertCircle, Fingerprint, Loader2 } from 'lucide-react';
import GlowButton from '../components/GlowButton';
import BackgroundAnimation from '../components/BackgroundAnimation';

// Verhoeff algorithm arrays for Aadhaar checksum verification
const d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
const p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

const validateAadhaarChecksum = (aadhaarStr) => {
  let c = 0;
  let invertedArray = aadhaarStr.split('').map(Number).reverse();
  for (let i = 0; i < invertedArray.length; i++) {
    c = d[c][p[i % 8][invertedArray[i]]];
  }
  return c === 0;
};

const AuthPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isVerifying) return;
    setError('');

    if (!email || !password || (isSignUp && !aadhaar)) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('pgrs_users') || '{}');

    if (isSignUp) {
      if (users[email]) {
        setError('An account with this email already exists.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (!/^\d{12}$/.test(aadhaar)) {
        setError('Invalid Aadhaar Number. Must be exactly 12 digits.');
        return;
      }
      
      setIsVerifying(true);
      // Simulate external UIDAI API verification flow
      setTimeout(() => {
        setIsVerifying(false);

        // Verify cryptographic checksum (Verhoeff) to reject fake Aadhaars
        if (!validateAadhaarChecksum(aadhaar)) {
          setError('UIDAI Verification Failed: Invalid or synthetic Aadhaar ID.');
          return;
        }

        // Save new user
        users[email] = { password, aadhaar };
        localStorage.setItem('pgrs_users', JSON.stringify(users));
        
        // Auto login after sign up
        localStorage.setItem('pgrs_auth_token', email);
        onLogin();
      }, 2000);
    } else {
      // Log In
      if (!users[email] || users[email].password !== password) {
        setError('Invalid email or password.');
        return;
      }
      
      // Success
      localStorage.setItem('pgrs_auth_token', email);
      onLogin();
    }
  };

  return (
    <>
      <BackgroundAnimation type="default" />
      <div className="flex-1 w-full min-h-screen flex items-center justify-center relative z-10 px-4">
        
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative">
          
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta rounded-2xl blur opacity-30"></div>
          
          <div className="bg-dark-panel/90 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 sm:p-8 shadow-2xl relative flex flex-col">
            
            <div className="flex flex-col items-center mb-8">
              <div className="p-3 glass-panel rounded-full border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.3)] mb-4">
                <Shield className="w-8 h-8 text-neon-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-widest text-center">
                PGRS <span className="text-neon-cyan font-light">SYSTEM</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest text-center">
                {isSignUp ? 'Create Account' : 'Log In'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-sm animate-in shake">
                 <AlertCircle className="w-4 h-4 shrink-0" />
                 <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                  Email Classification
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-dark-border/80 rounded-xl bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-colors"
                    placeholder="citizen@domain.com"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                    Aadhaar ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Fingerprint className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      required={isSignUp}
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="block w-full pl-10 pr-3 py-3 border border-dark-border/80 rounded-xl bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-colors"
                      placeholder="12-Digit UIDAI Number"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5 mb-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Secure Passkey
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-dark-border/80 rounded-xl bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <GlowButton type="submit" disabled={isVerifying} color="cyan" className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold tracking-wide mt-2">
                {isVerifying ? (
                   <><Loader2 className="w-5 h-5 animate-spin" /> VERIFYING AADHAAR...</>
                ) : isSignUp ? (
                   <><UserPlus className="w-5 h-5" /> CREATE ACCOUNT</>
                ) : (
                   <><LogIn className="w-5 h-5" /> LOG IN</>
                )}
              </GlowButton>
            </form>

            <div className="mt-8 pt-6 border-t border-dark-border flex flex-col items-center">
              <p className="text-gray-400 text-sm mb-3">
                {isSignUp 
                  ? 'Already have an account?' 
                  : "Don't have an account yet?"}
              </p>
              <button 
                onClick={() => { 
                  setIsSignUp(!isSignUp); 
                  setError(''); 
                  setEmail(''); 
                  setPassword(''); 
                }}
                className="text-white hover:text-neon-cyan font-semibold text-sm transition-colors flex items-center gap-1 group"
              >
                {isSignUp ? 'Switch to Login' : 'Create an Account'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
