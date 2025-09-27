import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock, Star, Shuffle, Filter } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  tips: string[];
  sampleAnswer?: string;
  estimatedTime: number;
}

const PracticeQuestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const categories = ['All', 'Data Structures', 'Algorithms', 'System Design', 'Object-Oriented Programming', 'Behavioral', 'Technical Concepts'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const questions: Question[] = [
    {
      id: '1',
      category: 'Data Structures',
      difficulty: 'Easy',
      question: 'Explain the difference between an array and a linked list. When would you use each?',
      tips: [
        'Discuss memory allocation differences',
        'Compare access time complexities',
        'Mention use cases for each structure',
        'Consider insertion and deletion operations'
      ],
      sampleAnswer: 'Arrays store elements in contiguous memory locations, providing O(1) random access but O(n) insertion/deletion at arbitrary positions. Linked lists store elements in nodes with pointers, offering O(1) insertion/deletion but O(n) access time. Use arrays for frequent random access; use linked lists for frequent insertions/deletions.',
      estimatedTime: 3
    },
    {
      id: '2',
      category: 'Algorithms',
      difficulty: 'Medium',
      question: 'Describe the quicksort algorithm and analyze its time complexity.',
      tips: [
        'Explain the divide-and-conquer approach',
        'Discuss pivot selection strategies',
        'Analyze best, average, and worst-case scenarios',
        'Compare with other sorting algorithms'
      ],
      estimatedTime: 5
    },
    {
      id: '3',
      category: 'System Design',
      difficulty: 'Hard',
      question: 'How would you design a URL shortening service like bit.ly?',
      tips: [
        'Start with functional requirements',
        'Estimate scale and capacity',
        'Design database schema',
        'Discuss caching strategies',
        'Consider load balancing and CDN'
      ],
      estimatedTime: 15
    },
    {
      id: '4',
      category: 'Object-Oriented Programming',
      difficulty: 'Easy',
      question: 'Explain the four pillars of Object-Oriented Programming.',
      tips: [
        'Define each pillar clearly',
        'Provide concrete examples',
        'Explain benefits of each concept',
        'Relate to real-world programming scenarios'
      ],
      sampleAnswer: 'The four pillars are: 1) Encapsulation - bundling data and methods that operate on that data within a single unit, 2) Inheritance - creating new classes based on existing classes, 3) Polymorphism - objects of different types responding to the same interface, 4) Abstraction - hiding complex implementation details while exposing essential features.',
      estimatedTime: 4
    },
    {
      id: '5',
      category: 'Technical Concepts',
      difficulty: 'Medium',
      question: 'What is the difference between synchronous and asynchronous programming?',
      tips: [
        'Define blocking vs non-blocking operations',
        'Explain use cases for each approach',
        'Discuss callbacks, promises, and async/await',
        'Mention performance implications'
      ],
      estimatedTime: 4
    },
    {
      id: '6',
      category: 'Behavioral',
      difficulty: 'Easy',
      question: 'Describe a challenging project you worked on. How did you overcome the difficulties?',
      tips: [
        'Use the STAR method (Situation, Task, Action, Result)',
        'Choose a technical project with clear challenges',
        'Focus on your problem-solving process',
        'Quantify the results when possible'
      ],
      estimatedTime: 5
    },
    {
      id: '7',
      category: 'Algorithms',
      difficulty: 'Hard',
      question: 'Implement a function to find the longest common subsequence of two strings.',
      tips: [
        'Start with a brute force approach',
        'Identify overlapping subproblems',
        'Apply dynamic programming',
        'Optimize space complexity if possible',
        'Test with edge cases'
      ],
      estimatedTime: 20
    },
    {
      id: '8',
      category: 'Data Structures',
      difficulty: 'Medium',
      question: 'How would you implement a LRU (Least Recently Used) cache?',
      tips: [
        'Discuss the required operations and their complexity',
        'Combine hash map and doubly linked list',
        'Explain the eviction strategy',
        'Walk through insertion and access operations'
      ],
      estimatedTime: 10
    }
  ];

  const filteredQuestions = questions.filter(question => {
    const categoryMatch = selectedCategory === 'All' || question.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const shuffleQuestions = () => {
    // Simple shuffle implementation for demo purposes
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    // In a real implementation, you would update the questions state
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Interview Practice Questions</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Prepare for your Computer Science interviews with our curated collection of technical and behavioral questions
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8 animate-fade-in-up animation-delay-200">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 text-center hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-2xl font-bold text-purple-400 mb-1">{questions.length}</div>
            <div className="text-sm text-slate-300">Total Questions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 text-center hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {questions.filter(q => q.difficulty === 'Easy').length}
            </div>
            <div className="text-sm text-slate-300">Easy Questions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {questions.filter(q => q.difficulty === 'Medium').length}
            </div>
            <div className="text-sm text-slate-300">Medium Questions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 text-center hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {questions.filter(q => q.difficulty === 'Hard').length}
            </div>
            <div className="text-sm text-slate-300">Hard Questions</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-slate-300">Filters:</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-300">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-300">Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-1 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <button
              onClick={shuffleQuestions}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/30"
            >
              <Shuffle className="w-4 h-4" />
              <span className="text-sm">Shuffle</span>
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-400">
            Showing {filteredQuestions.length} of {questions.length} questions
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 animate-fade-in-up animation-delay-600">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div
                className="p-6 cursor-pointer hover:bg-slate-700/30 transition-all duration-300"
                onClick={() => setExpandedQuestion(
                  expandedQuestion === question.id ? null : question.id
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="text-sm text-slate-600">{question.category}</span>
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{question.estimatedTime} min</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {question.question}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                      expandedQuestion === question.id ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedQuestion === question.id && (
                <div className="border-t border-slate-600/50 p-6 bg-slate-900/30">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        Key Points to Address
                      </h4>
                      <ul className="space-y-2">
                        {question.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-slate-300 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {question.sampleAnswer && (
                      <div>
                        <h4 className="font-semibold text-white mb-3">Sample Answer</h4>
                        <div className="bg-slate-700/50 backdrop-blur-sm p-4 rounded-lg border border-slate-600/50">
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {question.sampleAnswer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                      Start Practice
                    </button>
                    <button className="bg-slate-700/50 backdrop-blur-sm text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-slate-600/50 hover:border-purple-500/50 hover:bg-slate-600/50 transition-all duration-300">
                      Add to Favorites
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No questions found</h3>
            <p className="text-slate-300">Try adjusting your filters to see more questions.</p>
          </div>
        )}

        {/* Action Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center shadow-2xl animate-fade-in-up animation-delay-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Practice?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Start a mock interview session to get real-time feedback on your answers and improve your performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-white/20">
              Start Mock Interview
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/30 hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Random Question Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;