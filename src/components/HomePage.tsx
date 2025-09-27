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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              New: AI-Powered Interview Assistant
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">
                {' '}Interview Skills
              </span>
              <br />
              with AI Precision
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your interview performance with cutting-edge AI technology. Get real-time feedback on speech, 
              body language, and content delivery. Practice with our intelligent assistant and land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/interview"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 transition-all duration-500 flex items-center justify-center space-x-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Video className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Start Interview Practice</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/chatbot"
                className="group bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-semibold text-lg border border-white/20 hover:border-white/40 hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-500 flex items-center justify-center space-x-3"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Chat with AI Assistant</span>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-slate-400 mx-auto" />
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 opacity-0 translate-y-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            AI-Powered Interview Solutions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the future of interview preparation with our comprehensive AI-driven platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div ref={benefitsRef} className="bg-slate-800/30 backdrop-blur-md py-20 opacity-0 translate-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              The Key Benefits of AI for Your Interview Success
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover how AI automation enhances your interview skills, reduces preparation time, 
              and drives career growth with smarter, faster learning processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-purple-400 font-bold text-sm">{benefit.stats}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div ref={processRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 opacity-0 translate-y-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            How Our AI Interview System Works
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our intelligent system guides you through a comprehensive interview preparation journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                  {step.step}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {step.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {step.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md py-20 opacity-0 translate-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-center border border-slate-700/50 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Join thousands of successful candidates who improved their interview performance with our 
              AI-powered platform. Start your journey to career success today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/interview"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 transition-all duration-500 inline-flex items-center space-x-3"
              >
                <Play className="w-6 h-6" />
                <span>Start Free Practice</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/practice"
                className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-semibold text-lg border border-white/20 hover:border-white/40 hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-500 inline-flex items-center space-x-3"
              >
                <BookOpen className="w-6 h-6" />
                <span>Explore Questions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;