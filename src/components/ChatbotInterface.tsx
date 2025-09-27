import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, HelpCircle, BookOpen } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotInterfaceProps {
  history: Message[];
  onUpdateHistory: (history: Message[]) => void;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ history, onUpdateHistory }) => {
  const [messages, setMessages] = useState<Message[]>(history);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How do I answer 'Tell me about yourself'?",
    "What are good questions to ask the interviewer?",
    "How do I handle technical interview questions?",
    "How can I improve my body language?",
    "What should I wear to an interview?"
  ];

  // Predefined responses for common interview questions
  const responses = {
    default: "I'm here to help you with interview preparation! You can ask me about interview techniques, common questions, body language tips, or any other interview-related topics.",
    
    "tell me about yourself": "The 'Tell me about yourself' question is your elevator pitch! Structure it in 3 parts: 1) Your current situation/background, 2) Relevant experience and skills, 3) Why you're interested in this role. Keep it under 2 minutes and focus on what's relevant to the job.",
    
    "body language": "Great body language tips: 1) Maintain eye contact 70-80% of the time, 2) Sit up straight with shoulders back, 3) Use open gestures (avoid crossing arms), 4) Mirror the interviewer's energy level, 5) Smile genuinely when appropriate. Practice these in front of a mirror!",
    
    "technical interview": "For technical interviews: 1) Think out loud - explain your approach, 2) Ask clarifying questions, 3) Start with a simple solution, then optimize, 4) Use specific examples from your experience, 5) Practice coding on a whiteboard or paper beforehand.",
    
    "questions to ask": "Great questions to ask: 1) 'What does success look like in this role?', 2) 'What are the biggest challenges facing the team?', 3) 'How would you describe the company culture?', 4) 'What opportunities are there for growth?', 5) 'What's your favorite part about working here?'",
    
    "what to wear": "Interview attire tips: 1) Dress one level above the company's daily dress code, 2) Choose conservative colors (navy, black, gray), 3) Ensure clothes fit well and are wrinkle-free, 4) Keep accessories minimal, 5) Pay attention to grooming details. When in doubt, slightly overdress rather than underdress.",
    
    "nervousness": "To manage interview nerves: 1) Practice deep breathing exercises, 2) Prepare thoroughly - know your stories, 3) Arrive 10 minutes early to settle in, 4) Remember that some nerves are normal and show you care, 5) Visualize success beforehand, 6) Focus on the conversation, not the outcome.",
    
    "salary negotiation": "Salary negotiation tips: 1) Research market rates first, 2) Let them make the first offer if possible, 3) Consider the whole package (benefits, PTO, growth), 4) Be confident but respectful, 5) Practice your negotiation beforehand, 6) Have a backup plan if they can't meet your ask.",
    
    "follow up": "Post-interview follow-up: 1) Send a thank-you email within 24 hours, 2) Mention specific topics discussed, 3) Reiterate your interest, 4) Include any additional information they requested, 5) If no response in a week, one polite follow-up is appropriate."
  };

  useEffect(() => {
    scrollToBottom();
    onUpdateHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage("Hi! I'm your AI Interview Assistant. I'm here to help you prepare for interviews with tips, practice questions, and personalized advice. What would you like to know?");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: Date.now().toString() + '_bot',
      text,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for specific keywords/phrases
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Additional keyword matching
    if (lowerInput.includes('nervous') || lowerInput.includes('anxiety')) {
      return responses.nervousness;
    }
    
    if (lowerInput.includes('salary') || lowerInput.includes('negotiat')) {
      return responses['salary negotiation'];
    }
    
    if (lowerInput.includes('follow up') || lowerInput.includes('thank you')) {
      return responses['follow up'];
    }
    
    if (lowerInput.includes('star method') || lowerInput.includes('behavioral')) {
      return "The STAR method is perfect for behavioral questions: Situation (context), Task (what needed to be done), Action (what you did), Result (the outcome). This structure keeps your answers focused and demonstrates your impact clearly.";
    }
    
    if (lowerInput.includes('weakness') || lowerInput.includes('greatest weakness')) {
      return "When discussing weaknesses: 1) Choose something real but not job-critical, 2) Explain steps you're taking to improve, 3) Show self-awareness, 4) Keep it brief. Example: 'I used to struggle with public speaking, so I joined Toastmasters and now regularly present to our team.'";
    }
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userInput = inputText.trim();
    setInputText('');
    addUserMessage(userInput);
    
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const response = getBotResponse(userInput);
      setIsTyping(false);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText('');
    addUserMessage(question);
    
    setIsTyping(true);
    setTimeout(() => {
      const response = getBotResponse(question);
      setIsTyping(false);
      addBotMessage(response);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Interview Assistant</h1>
          <p className="text-lg text-gray-300">
            Get personalized interview tips and practice with our intelligent assistant
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-700/50 backdrop-blur-sm text-gray-200 border border-gray-600/50'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <div
                    className={`text-xs mt-2 ${
                      message.isBot ? 'text-slate-400' : 'text-purple-100'
                      message.isBot ? 'text-gray-400' : 'text-blue-100'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                
                {!message.isBot && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm px-4 py-3 rounded-2xl border border-gray-600/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
           <div className="border-t border-gray-600/50 p-6 bg-gray-900/30">
             <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Quick Questions
              </h3>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-2 bg-gray-700/50 backdrop-blur-sm text-gray-300 text-sm rounded-lg border border-gray-600/50 hover:border-blue-500/50 hover:bg-gray-600/50 transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-600/50 p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about interview tips, techniques, or any questions..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-2xl animate-fade-in-up animation-delay-400">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-semibold">Pro Tips</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>For better responses:</strong> Be specific with your questions and mention your industry or role type.
            </div>
            <div>
              <strong>Practice makes perfect:</strong> Use the feedback from your mock interviews to ask follow-up questions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;