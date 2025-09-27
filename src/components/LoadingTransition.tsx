import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface LoadingTransitionProps {
  isLoading: boolean;
}

const LoadingTransition: React.FC<LoadingTransitionProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-lg animate-bounce"></div>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-spin">
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">
          DevGent AI
        </h2>
        
        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-loading-bar"></div>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
        
        <p className="text-gray-300 mt-4 animate-pulse">
          Preparing your AI experience...
        </p>
      </div>
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingTransition;