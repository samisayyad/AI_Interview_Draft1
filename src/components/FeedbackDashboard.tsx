import React from 'react';
import { BarChart3, TrendingUp, Award, Target, Brain, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackDashboardProps {
  data?: any;
}

const FeedbackDashboard: React.FC<FeedbackDashboardProps> = ({ data }) => {
  // Mock data if no real data is provided
  const mockData = {
    speechAnalysis: {
      score: 85,
      tone: 78,
      pace: 82,
      clarity: 88,
      filler_words: 7,
    },
    bodyLanguage: {
      score: 79,
      posture: 85,
      eye_contact: 72,
      gestures: 81,
      facial_expression: 86,
    },
    contentAnalysis: {
      score: 91,
      relevance: 89,
      structure: 87,
      technical_accuracy: 93,
      examples: 88,
    },
    questions: 10,
    duration: 1847, // seconds
  };

  const feedbackData = data || mockData;

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Interview Performance Report</h1>
          <p className="text-lg text-gray-300">
            Detailed analysis of your interview performance with actionable insights
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-center shadow-2xl animate-fade-in-up animation-delay-200">
          <h2 className="text-2xl font-bold text-white mb-2">Overall Performance Score</h2>
          <div className="text-6xl font-bold text-white mb-4">
            {Math.round((feedbackData.speechAnalysis.score + feedbackData.bodyLanguage.score + feedbackData.contentAnalysis.score) / 3)}%
          </div>
          <p className="text-blue-100">
            Great job! You're performing above average in most areas.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up animation-delay-400">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">Excellent</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Content Quality</h3>
            <p className="text-2xl font-bold text-white">{feedbackData.contentAnalysis.score}%</p>
            <p className="text-gray-400 text-sm">Technical accuracy & relevance</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-blue-400 text-sm font-medium">Good</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Speech Analysis</h3>
            <p className="text-2xl font-bold text-white">{feedbackData.speechAnalysis.score}%</p>
            <p className="text-gray-400 text-sm">Clarity, pace & tone</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">Needs Work</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Body Language</h3>
            <p className="text-2xl font-bold text-white">{feedbackData.bodyLanguage.score}%</p>
            <p className="text-gray-400 text-sm">Posture & gestures</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-purple-400 text-sm font-medium">Duration</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Interview Time</h3>
            <p className="text-2xl font-bold text-white">{Math.floor(feedbackData.duration / 60)}m</p>
            <p className="text-gray-400 text-sm">{feedbackData.questions} questions answered</p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8 animate-fade-in-up animation-delay-600">
          {/* Speech Analysis */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-400" />
              Speech Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Clarity</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${feedbackData.speechAnalysis.clarity}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.speechAnalysis.clarity}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Pace</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: `${feedbackData.speechAnalysis.pace}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.speechAnalysis.pace}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Tone</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: `${feedbackData.speechAnalysis.tone}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.speechAnalysis.tone}%</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Filler Words</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Used {feedbackData.speechAnalysis.filler_words} filler words. Try to reduce "um", "uh", and "like".
                </p>
              </div>
            </div>
          </div>

          {/* Body Language */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-400" />
              Body Language
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Posture</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${feedbackData.bodyLanguage.posture}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.bodyLanguage.posture}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Eye Contact</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: `${feedbackData.bodyLanguage.eye_contact}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.bodyLanguage.eye_contact}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Gestures</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: `${feedbackData.bodyLanguage.gestures}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.bodyLanguage.gestures}%</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Improvement Tip</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Try to maintain more consistent eye contact with the camera. Aim for 70-80% eye contact.
                </p>
              </div>
            </div>
          </div>

          {/* Content Analysis */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Content Quality
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Relevance</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${feedbackData.contentAnalysis.relevance}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.contentAnalysis.relevance}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Structure</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: `${feedbackData.contentAnalysis.structure}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.contentAnalysis.structure}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Technical Accuracy</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${feedbackData.contentAnalysis.technical_accuracy}%`}}></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{feedbackData.contentAnalysis.technical_accuracy}%</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Strength</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Excellent technical knowledge and clear explanations with relevant examples.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 animate-fade-in-up animation-delay-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-yellow-400" />
            Personalized Recommendations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Areas to Improve</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-yellow-400 mb-1">Eye Contact</div>
                    <div className="text-sm text-gray-300">Practice maintaining eye contact with the camera for 70-80% of the time.</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-orange-400 mb-1">Reduce Filler Words</div>
                    <div className="text-sm text-gray-300">Try pausing instead of using "um" or "uh". Practice speaking more deliberately.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Your Strengths</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-400 mb-1">Technical Knowledge</div>
                    <div className="text-sm text-gray-300">Excellent understanding of technical concepts with clear explanations.</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-400 mb-1">Speech Clarity</div>
                    <div className="text-sm text-gray-300">Your speech is clear and well-paced, making it easy to understand.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up animation-delay-1000">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
            Practice Again
          </button>
          <button className="bg-gray-700/50 backdrop-blur-sm text-gray-300 px-8 py-4 rounded-xl font-semibold border border-gray-600/50 hover:border-blue-500/50 hover:bg-gray-600/50 transition-all duration-300">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;