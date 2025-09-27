import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Video, MessageCircle, BarChart3, BookOpen, ArrowRight, CheckCircle, Zap, Eye, Clock, TrendingUp, Users, Award, Star, Play, ChevronDown } from 'lucide-react';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const elements = [featuresRef.current, benefitsRef.current, processRef.current, statsRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Video,
      title: 'Real-time Analysis',
      description: 'AI-powered speech and body language assessment during your interview practice with instant feedback.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'AI Interview Assistant',
      description: 'Get personalized tips and answers to your interview questions from our intelligent chatbot.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Practice Questions',
      description: 'Domain-specific questions tailored for Computer Science interviews with detailed explanations.',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Comprehensive analysis with actionable insights to improve your interview performance.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Increased Confidence',
      description: 'Build confidence through AI-driven practice sessions and personalized feedback loops.',
      stats: '95% improvement'
    },
    {
      icon: Eye,
      title: 'Better Performance',
      description: 'Enhanced interview skills with real-time body language and speech analysis.',
      stats: '4.9/5 rating'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Practice anytime with our AI-powered system that never sleeps.',
      stats: 'Always ready'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Accelerate your career with improved interview skills and confidence.',
      stats: '3x faster'
    },
    {
      icon: Users,
      title: 'Expert Insights',
      description: 'Learn from industry experts and successful interview patterns.',
      stats: '50k+ users'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join thousands who landed their dream jobs using our platform.',
      stats: '89% success'
    }
  ];

  const processSteps = [
    {
      step: 'Step 1',
      title: 'Smart Assessment',
      description: 'We analyze your current interview skills and identify areas for improvement using advanced AI algorithms.',
      features: ['Skill evaluation', 'Weakness identification', 'Strength mapping', 'Personalized roadmap']
    },
    {
      step: 'Step 2',
      title: 'AI-Powered Practice',
      description: 'Practice with our intelligent system that provides real-time feedback on speech, body language, and content.',
      features: ['Real-time feedback', 'Speech analysis', 'Body language tracking', 'Content evaluation']
    },
    {
      step: 'Step 3',
      title: 'Continuous Learning',
      description: 'Our AI learns from your progress and adapts to provide increasingly personalized coaching.',
      features: ['Adaptive learning', 'Progress tracking', 'Custom recommendations', 'Skill development']
    },
    {
      step: 'Step 4',
      title: 'Interview Success',
      description: 'Apply your improved skills in real interviews with confidence and achieve your career goals.',
      features: ['Confidence boost', 'Skill mastery', 'Career advancement', 'Success tracking']
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Successful Interviews', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '4.9/5', label: 'User Rating', icon: Star },
    { number: '24/7', label: 'AI Availability', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium mb-8 backdrop-blur-sm">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center mr-2">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-sm"></div>
              </div>
              Devgent AI
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to ace your
              <br />
              <span className="text-white">
                next interview?
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join millions of professionals who have improved their interview skills
              <br />
              with our AI-powered platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/interview"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 transition-all duration-500 flex items-center justify-center space-x-3 relative overflow-hidden"
              >
                <span className="relative z-10">Start Free Practice</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div className="text-gray-400 text-sm">
              It's Free
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Innovative services for growth
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored solutions to streamline, innovate, and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Mock Interview Sessions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Practice with realistic interview scenarios tailored to your industry and experience level.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get detailed insights on speech patterns, body language, content structure, and confidence levels.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Personalized Feedback
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Receive tailored recommendations and improvement tips based on your specific performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Get Started in 3 simple steps
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A simple, effective approach to experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Choose Your Domain
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Select from various computer science domains and difficulty levels
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Start Recording
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Practice with AI-generated questions while being recorded
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Get Instant Feedback
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Receive detailed analysis and actionable improvement tips
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="font-bold text-xl text-white">Devgent AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in AI solutions, creating smarter systems for smarter businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Sections</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Practice</div>
                <div>Mock Interview</div>
                <div>Analytics</div>
                <div>Resources</div>
                <div>AI Coach</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Pages</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Home</div>
                <div>Mock Interview</div>
                <div>Analytics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;