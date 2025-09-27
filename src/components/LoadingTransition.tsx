import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface LoadingTransitionProps {
  isLoading: boolean;
}

const LoadingTransition: React.FC<LoadingTransitionProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-10 h-10 text-white animate-bounce" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">
          InterviewAI
        </h2>
        
        {/* Loading Bar */}
        <div className="w-64 h-1 bg-slate-700 rounded-full mx-auto mb-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-loading-bar"></div>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
        
        <p className="text-slate-300 mt-4 animate-pulse">
          Preparing your AI experience...
        </p>
      </div>
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingTransition;