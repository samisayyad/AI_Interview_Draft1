import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, MessageCircle, RefreshCw, Download, Share2 } from 'lucide-react';

interface FeedbackData {
  speechAnalysis: {
    score: number;
    tone: number;
    pace: number;
    clarity: number;
    filler_words: number;
  };
  bodyLanguage: {
    score: number;
    posture: number;
    eye_contact: number;
    gestures: number;
    facial_expression: number;
  };
  contentAnalysis: {
    score: number;
    relevance: number;
    structure: number;
    technical_accuracy: number;
    examples: number;
  };
  questions: string[];
  duration: number;
}

interface FeedbackDashboardProps {
  data: FeedbackData | null;
}

const FeedbackDashboard: React.FC<FeedbackDashboardProps> = ({ data }) => {
  const [animatedScores, setAnimatedScores] = useState({
    speech: 0,
    body: 0,
    content: 0
  });

  useEffect(() => {
    if (data) {
      // Animate scores
      const timer = setTimeout(() => {
        setAnimatedScores({
          speech: data.speechAnalysis.score,
          body: data.bodyLanguage.score,
          content: data.contentAnalysis.score
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">No Interview Data</h2>
            <p className="text-slate-600 mb-6">
              Complete an interview session to see your detailed feedback and analysis.
            </p>
            <Link
              to="/interview"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Interview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const overallScore = Math.round((animatedScores.speech + animatedScores.body + animatedScores.content) / 3);

  const recommendations = [
    {
      category: 'Speech',
      score: data.speechAnalysis.score,
      tips: [
        'Practice varying your tone to maintain engagement',
        'Reduce filler words by pausing instead',
        'Speak at a moderate pace for better comprehension'
      ]
    },
    {
      category: 'Body Language',
      score: data.bodyLanguage.score,
      tips: [
        'Maintain eye contact 70-80% of the time',
        'Keep an upright, confident posture',
        'Use natural hand gestures to emphasize points'
      ]
    },
    {
      category: 'Content',
      score: data.contentAnalysis.score,
      tips: [
        'Structure answers using STAR method',
        'Include specific technical examples',
        'Connect your experience to the role requirements'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Interview Analysis</h1>
          <p className="text-lg text-slate-600">
            Detailed feedback on your interview performance
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <button className="flex items-center space-x-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <Share2 className="w-4 h-4" />
              <span>Share Results</span>
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(overallScore / 100) * 314} 314`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">{overallScore}</div>
                  <div className="text-sm text-slate-600">Overall</div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {overallScore >= 80 ? 'Excellent Performance!' : 
               overallScore >= 60 ? 'Good Performance!' : 'Room for Improvement'}
            </h2>
            <p className="text-slate-600">
              Interview Duration: {formatDuration(data.duration)} • {data.questions.length} Questions
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Speech Analysis</h3>
              <div className={`text-2xl font-bold ${getScoreColor(animatedScores.speech)}`}>
                {animatedScores.speech}%
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Tone Variation</span>
                <span>{data.speechAnalysis.tone}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Speaking Pace</span>
                <span>{data.speechAnalysis.pace}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Clarity</span>
                <span>{data.speechAnalysis.clarity}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Filler Words</span>
                <span className="text-red-600">{data.speechAnalysis.filler_words}</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
              <div 
                className={`bg-gradient-to-r ${getScoreGradient(animatedScores.speech)} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${animatedScores.speech}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Body Language</h3>
              <div className={`text-2xl font-bold ${getScoreColor(animatedScores.body)}`}>
                {animatedScores.body}%
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Posture</span>
                <span>{data.bodyLanguage.posture}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Eye Contact</span>
                <span>{data.bodyLanguage.eye_contact}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gestures</span>
                <span>{data.bodyLanguage.gestures}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Facial Expression</span>
                <span>{data.bodyLanguage.facial_expression}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
              <div 
                className={`bg-gradient-to-r ${getScoreGradient(animatedScores.body)} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${animatedScores.body}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Content Quality</h3>
              <div className={`text-2xl font-bold ${getScoreColor(animatedScores.content)}`}>
                {animatedScores.content}%
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Relevance</span>
                <span>{data.contentAnalysis.relevance}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Structure</span>
                <span>{data.contentAnalysis.structure}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Technical Accuracy</span>
                <span>{data.contentAnalysis.technical_accuracy}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Examples</span>
                <span>{data.contentAnalysis.examples}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
              <div 
                className={`bg-gradient-to-r ${getScoreGradient(animatedScores.content)} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${animatedScores.content}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-slate-700/50 mb-8 animate-fade-in-up animation-delay-600">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
            Personalized Recommendations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">{rec.category}</h3>
                  <span className={`text-sm font-medium ${getScoreColor(rec.score)}`}>
                    {rec.score}%
                  </span>
                </div>
                <ul className="space-y-2">
                  {rec.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-slate-300 flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
          <Link
            to="/interview"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Practice Again</span>
          </Link>
          
          <Link
            to="/chatbot"
            className="bg-slate-800/50 backdrop-blur-md text-slate-300 px-8 py-4 rounded-xl font-semibold border-2 border-slate-600/50 hover:border-purple-500/50 hover:bg-slate-700/50 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Ask AI Assistant</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;