import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Video, MessageCircle, BarChart3, BookOpen, ArrowRight, CheckCircle, Zap, Eye, Clock, TrendingUp, Users, Award, Star, Play, ChevronDown, Code, Database, Globe, Cpu, Shield, Brain } from 'lucide-react';

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

  const domains = [
    {
      icon: Code,
      title: 'Data Structures & Algorithms',
      description: 'Master arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
      color: 'from-blue-500 to-cyan-500',
      questions: 25
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'SQL queries, database design, normalization, and ACID properties.',
      color: 'from-green-500 to-teal-500',
      questions: 20
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Frontend, backend, APIs, frameworks, and web technologies.',
      color: 'from-purple-500 to-pink-500',
      questions: 30
    },
    {
      icon: Cpu,
      title: 'System Design',
      description: 'Scalability, load balancing, microservices, and architecture patterns.',
      color: 'from-orange-500 to-red-500',
      questions: 18
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Security protocols, encryption, vulnerability assessment, and ethical hacking.',
      color: 'from-red-500 to-pink-500',
      questions: 22
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'AI algorithms, neural networks, data science, and predictive modeling.',
      color: 'from-indigo-500 to-purple-500',
      questions: 28
    }
  ];

  const features = [
    {
      icon: Video,
      title: 'Mock Interview Sessions',
      description: 'Practice with realistic interview scenarios tailored to your industry and experience level.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'AI-Powered Analysis',
      description: 'Get detailed insights on speech patterns, body language, content structure, and confidence levels.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageCircle,
      title: 'Personalized Feedback',
      description: 'Receive tailored recommendations and improvement tips based on your specific performance.',
      gradient: 'from-green-500 to-teal-500'
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
              DevGent AI
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
                to="/practice"
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

      {/* CS Domains Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Computer Science Domain
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select from specialized domains to practice targeted interview questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <Link
                key={index}
                to={`/practice?domain=${encodeURIComponent(domain.title)}`}
                className="group bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${domain.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <domain.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {domain.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {domain.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-400 font-medium">
                    {domain.questions} Questions
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
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
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="mb-6">
                  <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-600/50 transition-colors duration-300">
                    <feature.icon className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Tracking Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Progress Tracking
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Monitor your improvement over time with detailed analytics and performance metrics.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Work Efficiency</span>
                    <span className="text-green-400 font-bold">+23%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Overall Score</span>
                    <span className="text-blue-400 font-bold">48.9%</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Overall new you have 48.9% better compared to previous week.
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Filters:</span>
                  <button className="text-blue-400 text-sm">Export</button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-gray-300">Work Efficiency</span>
                    <div className="w-20 bg-gray-600 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-gray-300">Cost Reduction</span>
                    <div className="w-20 bg-gray-600 rounded-full h-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-gray-300">Automated Tasks</span>
                    <div className="w-20 bg-gray-600 rounded-full h-1">
                      <div className="bg-purple-500 h-1 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-gray-300">Lead Nurturing</span>
                    <div className="w-20 bg-gray-600 rounded-full h-1">
                      <div className="bg-orange-500 h-1 rounded-full" style={{width: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Consulting Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-white font-medium">On Call..</div>
                    <div className="text-gray-400 text-sm">Mic On</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <div className="text-blue-400 text-2xl font-bold mb-1">AI</div>
                    <div className="text-gray-300 text-sm">Developer</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2"></div>
                    <div className="text-gray-300 text-sm">Sales expert</div>
                  </div>
                </div>
                <div className="bg-red-600 text-white text-center py-2 rounded-lg font-medium">
                  End Call
                </div>
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">Note Taking...</div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-700 rounded"></div>
                    <div className="w-3/4 h-1 bg-gray-700 rounded"></div>
                    <div className="w-1/2 h-1 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                AI Consulting
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Work with our experts to develop personalized AI strategies that streamline operations and deliver impactful results.
              </p>
              <Link
                to="/chatbot"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start AI Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-900/50 py-20">
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
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center group hover:border-blue-500/50 transition-all duration-300">
              <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-600/50 transition-colors duration-300">
                <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                Choose Your Domain
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Select from various computer science domains and difficulty levels
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center group hover:border-blue-500/50 transition-all duration-300">
              <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-600/50 transition-colors duration-300">
                <Video className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                Start Recording
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Practice with AI-generated questions while being recorded
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center group hover:border-blue-500/50 transition-all duration-300">
              <div className="w-full h-48 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-600/50 transition-colors duration-300">
                <BarChart3 className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                Get Instant Feedback
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Receive detailed analysis and actionable improvement tips
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
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
                <span className="font-bold text-xl text-white">DevGent AI</span>
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