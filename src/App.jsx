import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ComplaintPortal from './pages/ComplaintPortal';
import AIInfoPage from './pages/AIInfoPage';
import WebViewTransition from './pages/WebViewTransition';
import HistoryPage from './pages/HistoryPage';
import FAQPage from './pages/FAQPage';
import AIAssistant from './components/AIAssistant';
import AuthPage from './pages/AuthPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('pgrs_auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pgrs_auth_token');
    setIsAuthenticated(false);
  };

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <AuthPage onLogin={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col pt-16 animate-in fade-in duration-500">
        <Navbar onLogout={handleLogout} />
        <main className="flex-grow z-10 flex flex-col relative w-full h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portals" element={<ComplaintPortal />} />
            <Route path="/ai-info" element={<AIInfoPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/redirect/:dept" element={<WebViewTransition />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;
