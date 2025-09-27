import React from 'react';
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react';

interface FeedbackDashboardProps {
  // Add props as needed
}

const FeedbackDashboard: React.FC<FeedbackDashboardProps> = () => {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
          <p className="text-lg text-gray-300">
            Track your interview progress and improvement over time
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+12%</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Overall Score</h3>
            <p className="text-2xl font-bold text-white">85.2%</p>
            <p className="text-gray-400 text-sm">Last 30 days</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+8%</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Improvement Rate</h3>
            <p className="text-2xl font-bold text-white">23%</p>
            <p className="text-gray-400 text-sm">This month</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-blue-400 text-sm font-medium">New!</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Achievements</h3>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-gray-400 text-sm">Badges earned</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">Goal</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Target Score</h3>
            <p className="text-2xl font-bold text-white">90%</p>
            <p className="text-gray-400 text-sm">5% to go</p>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6">Detailed Performance Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Technical Questions</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <span className="text-white font-medium">78%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Behavioral Questions</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <span className="text-white font-medium">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Communication Skills</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="text-white font-medium">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;