import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Languages } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHinglish, setIsHinglish] = useState(false);
  const [messages, setMessages] = useState([]);
  
  // Set initial message depending on language toggle
  useEffect(() => {
    if (messages.length === 0 || messages.length === 1) {
      setMessages([{
        id: 1,
        sender: 'bot',
        text: isHinglish 
          ? "Namaste! Main aapka AI Assistant hoon. Apni samasya batayein aur main aapko turant upay (remedies) sujhaunga jab tak officials reply karte hain."
          : "Hello! I am your AI Assistant. Tell me what issue you are facing, and I will suggest some immediate remedies you can take while you await the official department's response."
      }]);
    }
  }, [isHinglish]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateRemedy = React.useCallback((text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('water') || lowerText.includes('pani') || lowerText.includes('leak')) {
      return isHinglish 
        ? "Lagta hai pani ki samasya hai. **Turant upay:** Kripya GHMC portal par check karein. Agar pipe leak hai, to mainline valve band kar dein. Paani ki turant jarurat ho to portal se tanker book kar sakte hain."
        : "It looks like you're facing water issues. **Immediate remedy:** Check the municipal portal for localized scheduled outages. If it's a pipe leak, temporarily turn off your mainline valve to prevent water damage. If you need drinking water immediately, you can book a municipal water tanker via the portal.";
    }
    if (lowerText.includes('electricity') || lowerText.includes('power') || lowerText.includes('bijli') || lowerText.includes('current')) {
      return isHinglish
        ? "Lagta hai bijli ki samasya hai. **Turant upay:** Apna main circuit breaker check karein. Agar pure area mein light nahi hai, to sensitive electronics unplug kar dein taaki light aane par damage na ho. Gire hue taaron se door rahein!"
        : "It sounds like a power or electricity issue. **Immediate remedy:** Check your main circuit breaker first. If it's an area-wide outage, unplug sensitive electronics to protect them from surges when the power returns. Stay away from any fallen lines!";
    }
    if (lowerText.includes('road') || lowerText.includes('pothole') || lowerText.includes('sadak')) {
      return isHinglish
        ? "Sadak ya pothole (gadda) ki samasya ke liye. **Turant upay:** Agar safe ho to wahan koi nishan laga dein taaki dusre log bach sakein. Agar traffic ke liye bahut khatarnaak hai, to kripya local traffic police helpline par call karein."
        : "For road hazards like potholes or damaged streets. **Immediate remedy:** If possible, place a visible marker near the hazard if it's safe to do so. If it presents an immediate danger to traffic, please dial the local traffic police helpline to secure the area temporarily.";
    }
    if (lowerText.includes('sanitation') || lowerText.includes('garbage') || lowerText.includes('kachra') || lowerText.includes('smell')) {
      return isHinglish
        ? "Kachra ya safai ki samasya ke liye. **Turant upay:** Kachre ko achhe se baandh kar rakhein taaki badboo na faile ya kide na aayein. Agar koi khula naala hai, to kripya door rahein aur bacchon ko bhi samjhayein."
        : "For sanitation or waste accumulation issues. **Immediate remedy:** Ensure any organic waste is securely triple-bagged to avoid spreading odors or attracting pests. If there is an overflowing drain, please keep a safe distance and warn neighbors, especially children.";
    }
    
    return isHinglish
      ? "Maine aapki samasya note kar li hai. **Turant upay:** Jab tak officials aapki complaint check karte hain, kripya safety ka dhyan rakhein. Aap aur jankari ke liye hamara FAQ page bhi dekh sakte hain."
      : "I've noted your issue. **Immediate remedy:** While officials review your formally submitted grievance, please take all necessary standard safety precautions. You can also review our FAQ page for general administrative guidance.";
  }, [isHinglish]);

  // Listen for newly submitted grievances
  useEffect(() => {
    const handleForwardedComplaint = (e) => {
      const { desc, dept } = e.detail;
      
      setIsOpen(true);
      setIsTyping(true);

      setTimeout(() => {
        const remedyText = generateRemedy(desc);
        const cleanDept = dept.toUpperCase() === 'MUNICIPAL' ? 'GENERAL MUNICIPAL' : dept.toUpperCase();
        
        const intro = isHinglish 
          ? `Maine dekha ki aapne abhi-abhi **${cleanDept}** department ko ek grievance forward ki hai. `
          : `I see you just forwarded a grievance to the **${cleanDept}** department. `;
          
        const botMsg = { id: Date.now(), sender: 'bot', text: intro + remedyText };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 2000);
    };

    window.addEventListener('pgrs_new_complaint', handleForwardedComplaint);
    return () => window.removeEventListener('pgrs_new_complaint', handleForwardedComplaint);
  }, [generateRemedy, isHinglish]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const responseText = generateRemedy(userMsg.text);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      <div 
        className={`mb-4 w-80 sm:w-96 glass-panel border border-neon-cyan/40 rounded-2xl overflow-hidden transition-all duration-300 origin-bottom-right shadow-[0_0_30px_rgba(0,243,255,0.15)] ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-dark-panel to-dark-base border-b border-dark-border p-4 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 glass-panel rounded-full border border-neon-cyan/50 shadow-[0_0_10px_rgba(0,243,255,0.3)]">
              <Sparkles className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h3 className="font-bold text-white tracking-wide">PGRS <span className="text-neon-cyan font-light">Assistant</span></h3>
              <p className="text-xs text-neon-cyan animate-pulse">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex gap-2 z-10">
            <button 
              onClick={() => setIsHinglish(!isHinglish)}
              className={`flex items-center justify-center p-1.5 rounded-md border text-xs font-bold transition-colors ${
                isHinglish 
                  ? 'bg-neon-cyan/20 border-neon-cyan/50 text-white' 
                  : 'text-gray-400 border-dark-border hover:text-white hover:bg-white/5'
              }`}
              title="Toggle Hinglish"
            >
              <Languages className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors relative z-10 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4 bg-black/40 scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="shrink-0 flex items-start mt-1">
                {msg.sender === 'bot' ? (
                  <div className="p-1.5 rounded-full border border-dark-border bg-dark-panel">
                    <Bot className="w-4 h-4 text-neon-cyan" />
                  </div>
                ) : (
                  <div className="p-1.5 rounded-full border border-neon-magenta/50 bg-dark-panel">
                    <User className="w-4 h-4 text-neon-magenta" />
                  </div>
                )}
              </div>
              <div 
                className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-dark-panel/80 border border-dark-border text-gray-200 rounded-tl-sm' 
                    : 'bg-neon-magenta/10 border border-neon-magenta/30 text-white rounded-tr-sm'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<span class="text-neon-cyan font-bold">$1</span>') }}
              />
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 flex-row">
              <div className="shrink-0 flex items-start mt-1">
                <div className="p-1.5 rounded-full border border-dark-border bg-dark-panel">
                  <Bot className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-dark-panel/80 border border-dark-border rounded-tl-sm flex gap-1 items-center h-10">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-dark-border bg-dark-panel/90 backdrop-blur">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isHinglish ? "Type karein yahan..." : "Type your issue for a remedy..."}
              className="flex-1 bg-black/50 border border-dark-border rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors placeholder-gray-500"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-neon-cyan/10 disabled:hover:text-neon-cyan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 ${isOpen ? 'bg-dark-panel border border-neon-cyan/50 text-neon-cyan' : 'bg-neon-cyan text-black'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AIAssistant;
