import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import InterviewSession from './components/InterviewSession';
import FeedbackDashboard from './components/FeedbackDashboard';
import ChatbotInterface from './components/ChatbotInterface';
import PracticeQuestions from './components/PracticeQuestions';
import Navigation from './components/Navigation';
import LoadingTransition from './components/LoadingTransition';

const AppContent = () => {
  const [feedbackData, setFeedbackData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <LoadingTransition isLoading={isLoading} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/interview" 
            element={<InterviewSession onComplete={setFeedbackData} />} 
          />
          <Route 
            path="/feedback" 
            element={<FeedbackDashboard data={feedbackData} />} 
          />
          <Route 
            path="/chatbot" 
            element={
              <ChatbotInterface 
                history={chatHistory} 
                onUpdateHistory={setChatHistory} 
              />
            } 
          />
          <Route path="/practice" element={<PracticeQuestions />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;