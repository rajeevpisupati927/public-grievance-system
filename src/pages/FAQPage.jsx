import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "What are the contact details of the Department of Administrative Reforms and Public Grievances?",
    answer: "You can reach us at our main office in New Delhi. For specific contact details, please refer to the 'Contact Us' section on the official DARPG website."
  },
  {
    question: "Where can the grievances be sent?",
    answer: "Grievances can be submitted online through the CPGRAMS portal, by postal mail, or handed in personally at the designated grievance counters."
  },
  {
    question: "How do I lodge the grievance?",
    answer: "The easiest way is to register on the CPGRAMS portal, log in, and fill out the online grievance registration form. Be sure to provide all relevant details."
  },
  {
    question: "What happens when I lodge the grievance?",
    answer: "Once lodged, you'll receive a unique registration number. Your grievance is then forwarded to the concerned Ministry/Department for redressal."
  },
  {
    question: "How do I track my grievance?",
    answer: "Use your unique registration number on the 'Track Grievance' page of the CPGRAMS portal to check its real-time status."
  },
  {
    question: "What happens to the grievances? How are the grievances dealt with in Central Ministries/Departments?",
    answer: "Grievances are analyzed and routed to the correct nodal officer. They investigate the matter, take necessary action, and update the status on the portal."
  },
  {
    question: "After redress, can the grievance be re-opened for further correspondence about it having been closed without details etc.?",
    answer: "Generally, yes. If you are unsatisfied or feel no details were provided, you can lodge a follow-up or an appeal referencing the original grievance number."
  },
  {
    question: "What are the contact details of the Nodal Officers of Public Grievances in Ministries/Departments?",
    answer: "A comprehensive directory of Nodal Officers is available on the CPGRAMS platform under the 'Nodal Officers Directory' tab."
  },
  {
    question: "What is the system of granting personal hearing on grievances?",
    answer: "Many departments designate specific days (like Wednesday) where citizens can meet the Director of Public Grievances in person for a hearing."
  },
  {
    question: "What are the types of grievances which are not taken up for redress by the Department?",
    answer: "Sub-judice matters, RTIs, personal disputes, and religious matters are typically excluded from this grievance mechanism."
  },
  {
    question: "What is the role of Department of Administrative Reforms and Public Grievances (DARPG) with reference to the grievances concerning Central Ministries/Departments/ Organizations?",
    answer: "DARPG acts as the facilitator and monitoring agency. We ensure that Central Ministries process grievances promptly and efficiently."
  },
  {
    question: "What is the role of Department of Administrative Reforms and Public Grievances (DARPG) with reference to the grievances concerning State Government?",
    answer: "For State matters, DARPG forwards the received grievances to the respective State Governments, as states have their own grievance redressal mechanisms."
  },
  {
    question: "What is the time limit for redress of grievance?",
    answer: "The standard time limit is typically 30 to 60 days, though this can vary depending on the complexity of the issue."
  },
  {
    question: "What action can be taken by me in case of non-redress of my grievance within the prescribed time?",
    answer: "You can send a reminder through the portal or file an appeal to the designated Appellate Authority in the respective department."
  },
  {
    question: "What can a citizen do if he is not satisfied with the redressal of his grievance?",
    answer: "You have the right to file an appeal against the decision through the CPGRAMS portal's appeal mechanism."
  },
  {
    question: "How to deactivate CPGRAMS account?",
    answer: "Currently, you need to send a formal request through the portal's support or contact us page to process an account deactivation."
  },
  {
    question: "How to change the details of the Nodal Grievance Officer and Nodal Appellate Authority in the portal?",
    answer: "These details are updated by the system administrators of the respective departments, not by individual users."
  },
  {
    question: "Whether the Department has operated any feedback call centre?",
    answer: "Yes, feedback call centres are often operational to gather citizen feedback on the quality of grievance redressal."
  }
];

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  return (
    <div className={`mb-4 glass-panel rounded-xl overflow-hidden transition-all duration-300 border border-transparent ${isOpen ? 'glow-border-cyan' : 'border-dark-border'}`}>
      <button 
        onClick={() => toggleOpen(index)}
        className="w-full text-left px-6 py-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
      >
        <span className="font-semibold text-lg flex gap-3 text-gray-200">
          <span className={`opacity-80 border rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'text-neon-cyan border-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.4)]' : 'text-gray-400 border-gray-600'}`}>
            {index + 1}
          </span>
          <span className="mt-1">{faq.question}</span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neon-cyan shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
        )}
      </button>
      
      <div 
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="text-gray-300 border-l-2 border-neon-cyan/50 pl-4 ml-4 leading-relaxed font-light">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-full p-8 ml-0 md:ml-2 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 glass-panel rounded-xl glow-border-cyan bg-dark-panel/80">
             <HelpCircle className="w-8 h-8 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-wide">
              Frequently Asked <span className="text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">Questions</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">
              Grievance Redress Mechanism in Government of India and the Role of DARPG
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              index={index} 
              isOpen={openIndex === index} 
              toggleOpen={toggleOpen} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
