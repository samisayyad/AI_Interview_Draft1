import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock, Star, Shuffle, Filter, Code, CheckCircle } from 'lucide-react';

interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  type: 'mcq' | 'coding';
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options?: MCQOption[];
  correctAnswer?: string;
  explanation?: string;
  codeTemplate?: string;
  expectedOutput?: string;
  testCases?: Array<{
    input: string;
    output: string;
  }>;
  tips: string[];
  estimatedTime: number;
}

const PracticeQuestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState<{[key: string]: boolean}>({});

  const categories = ['All', 'Data Structures', 'Algorithms', 'System Design', 'Object-Oriented Programming', 'Database', 'Web Development'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const types = ['All', 'MCQ', 'Coding'];

  const questions: Question[] = [
    // MCQ Questions (7)
    {
      id: '1',
      type: 'mcq',
      category: 'Data Structures',
      difficulty: 'Easy',
      question: 'What is the time complexity of accessing an element in an array by index?',
      options: [
        { id: 'a', text: 'O(1)', isCorrect: true },
        { id: 'b', text: 'O(n)', isCorrect: false },
        { id: 'c', text: 'O(log n)', isCorrect: false },
        { id: 'd', text: 'O(n²)', isCorrect: false }
      ],
      correctAnswer: 'O(1)',
      explanation: 'Array elements are stored in contiguous memory locations, allowing direct access by index in constant time.',
      tips: [
        'Arrays provide random access to elements',
        'Index-based access is independent of array size',
        'Memory address calculation: base_address + (index * element_size)'
      ],
      estimatedTime: 2
    },
    {
      id: '2',
      type: 'mcq',
      category: 'Algorithms',
      difficulty: 'Medium',
      question: 'Which sorting algorithm has the best average-case time complexity?',
      options: [
        { id: 'a', text: 'Bubble Sort', isCorrect: false },
        { id: 'b', text: 'Quick Sort', isCorrect: true },
        { id: 'c', text: 'Selection Sort', isCorrect: false },
        { id: 'd', text: 'Insertion Sort', isCorrect: false }
      ],
      correctAnswer: 'Quick Sort',
      explanation: 'Quick Sort has an average-case time complexity of O(n log n), which is optimal for comparison-based sorting algorithms.',
      tips: [
        'Quick Sort uses divide-and-conquer approach',
        'Pivot selection affects performance',
        'Worst case is O(n²) but average case is O(n log n)'
      ],
      estimatedTime: 3
    },
    {
      id: '3',
      type: 'mcq',
      category: 'Object-Oriented Programming',
      difficulty: 'Easy',
      question: 'Which OOP principle allows a class to inherit properties from another class?',
      options: [
        { id: 'a', text: 'Encapsulation', isCorrect: false },
        { id: 'b', text: 'Inheritance', isCorrect: true },
        { id: 'c', text: 'Polymorphism', isCorrect: false },
        { id: 'd', text: 'Abstraction', isCorrect: false }
      ],
      correctAnswer: 'Inheritance',
      explanation: 'Inheritance allows a class (child/derived) to inherit properties and methods from another class (parent/base).',
      tips: [
        'Promotes code reusability',
        'Creates "is-a" relationships',
        'Child classes can override parent methods'
      ],
      estimatedTime: 2
    },
    {
      id: '4',
      type: 'mcq',
      category: 'Database',
      difficulty: 'Medium',
      question: 'What does ACID stand for in database transactions?',
      options: [
        { id: 'a', text: 'Atomicity, Consistency, Isolation, Durability', isCorrect: true },
        { id: 'b', text: 'Accuracy, Consistency, Integrity, Durability', isCorrect: false },
        { id: 'c', text: 'Atomicity, Concurrency, Isolation, Durability', isCorrect: false },
        { id: 'd', text: 'Accuracy, Concurrency, Integrity, Dependency', isCorrect: false }
      ],
      correctAnswer: 'Atomicity, Consistency, Isolation, Durability',
      explanation: 'ACID properties ensure reliable database transactions: Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions), Durability (permanent changes).',
      tips: [
        'Essential for database reliability',
        'Each property serves a specific purpose',
        'Critical for multi-user database systems'
      ],
      estimatedTime: 3
    },
    {
      id: '5',
      type: 'mcq',
      category: 'Web Development',
      difficulty: 'Easy',
      question: 'Which HTTP method is used to retrieve data from a server?',
      options: [
        { id: 'a', text: 'POST', isCorrect: false },
        { id: 'b', text: 'PUT', isCorrect: false },
        { id: 'c', text: 'GET', isCorrect: true },
        { id: 'd', text: 'DELETE', isCorrect: false }
      ],
      correctAnswer: 'GET',
      explanation: 'GET method is used to retrieve data from a server. It should be safe and idempotent.',
      tips: [
        'GET requests should not modify server state',
        'Parameters are sent in URL query string',
        'Can be cached by browsers'
      ],
      estimatedTime: 2
    },
    {
      id: '6',
      type: 'mcq',
      category: 'System Design',
      difficulty: 'Hard',
      question: 'What is the primary purpose of a load balancer in system architecture?',
      options: [
        { id: 'a', text: 'Data encryption', isCorrect: false },
        { id: 'b', text: 'Distribute incoming requests across multiple servers', isCorrect: true },
        { id: 'c', text: 'Store user sessions', isCorrect: false },
        { id: 'd', text: 'Compress data', isCorrect: false }
      ],
      correctAnswer: 'Distribute incoming requests across multiple servers',
      explanation: 'Load balancers distribute incoming network traffic across multiple servers to ensure no single server becomes overwhelmed.',
      tips: [
        'Improves system availability and reliability',
        'Can use various algorithms (round-robin, least connections)',
        'Essential for high-traffic applications'
      ],
      estimatedTime: 4
    },
    {
      id: '7',
      type: 'mcq',
      category: 'Algorithms',
      difficulty: 'Medium',
      question: 'What is the space complexity of the recursive Fibonacci algorithm?',
      options: [
        { id: 'a', text: 'O(1)', isCorrect: false },
        { id: 'b', text: 'O(n)', isCorrect: true },
        { id: 'c', text: 'O(log n)', isCorrect: false },
        { id: 'd', text: 'O(n²)', isCorrect: false }
      ],
      correctAnswer: 'O(n)',
      explanation: 'The recursive Fibonacci algorithm has O(n) space complexity due to the maximum depth of the call stack.',
      tips: [
        'Call stack depth determines space complexity',
        'Each recursive call adds a frame to the stack',
        'Dynamic programming can optimize this'
      ],
      estimatedTime: 3
    },

    // Coding Questions (3)
    {
      id: '8',
      type: 'coding',
      category: 'Data Structures',
      difficulty: 'Medium',
      question: 'Implement a function to reverse a linked list iteratively.',
      codeTemplate: `class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    // Your code here
    
}`,
      expectedOutput: 'Reversed linked list',
      testCases: [
        { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' },
        { input: '[1,2]', output: '[2,1]' },
        { input: '[]', output: '[]' }
      ],
      tips: [
        'Use three pointers: prev, current, next',
        'Iterate through the list once',
        'Handle edge cases (empty list, single node)',
        'Time complexity should be O(n), space O(1)'
      ],
      estimatedTime: 15
    },
    {
      id: '9',
      type: 'coding',
      category: 'Algorithms',
      difficulty: 'Hard',
      question: 'Implement a function to find the longest common subsequence of two strings using dynamic programming.',
      codeTemplate: `function longestCommonSubsequence(text1, text2) {
    // Your code here
    
}`,
      expectedOutput: 'Length of longest common subsequence',
      testCases: [
        { input: '"abcde", "ace"', output: '3' },
        { input: '"abc", "abc"', output: '3' },
        { input: '"abc", "def"', output: '0' }
      ],
      tips: [
        'Create a 2D DP table',
        'If characters match, add 1 to diagonal value',
        'If characters don\'t match, take max of left and top',
        'Time complexity: O(m*n), Space: O(m*n)'
      ],
      estimatedTime: 25
    },
    {
      id: '10',
      type: 'coding',
      category: 'Data Structures',
      difficulty: 'Medium',
      question: 'Implement a basic LRU (Least Recently Used) cache with get and put operations.',
      codeTemplate: `class LRUCache {
    constructor(capacity) {
        // Your code here
    }
    
    get(key) {
        // Your code here
    }
    
    put(key, value) {
        // Your code here
    }
}`,
      expectedOutput: 'LRU Cache implementation',
      testCases: [
        { input: 'capacity=2, put(1,1), put(2,2), get(1)', output: '1' },
        { input: 'put(3,3), get(2)', output: '-1' },
        { input: 'put(4,4), get(1), get(3), get(4)', output: '-1, 3, 4' }
      ],
      tips: [
        'Use HashMap + Doubly Linked List',
        'HashMap for O(1) access, DLL for O(1) insertion/deletion',
        'Move accessed items to front',
        'Remove least recently used when capacity exceeded'
      ],
      estimatedTime: 20
    }
  ];

  const filteredQuestions = questions.filter(question => {
    const categoryMatch = selectedCategory === 'All' || question.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
    const typeMatch = selectedType === 'All' || 
      (selectedType === 'MCQ' && question.type === 'mcq') ||
      (selectedType === 'Coding' && question.type === 'coding');
    return categoryMatch && difficultyMatch && typeMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'mcq' ? 'text-blue-400 bg-blue-400/20' : 'text-purple-400 bg-purple-400/20';
  };

  const handleMCQAnswer = (questionId: string, selectedOption: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const showMCQResult = (questionId: string) => {
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const mcqQuestions = questions.filter(q => q.type === 'mcq');
  const codingQuestions = questions.filter(q => q.type === 'coding');

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Interview Practice Questions</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Master your interview skills with our comprehensive collection of MCQ and coding questions
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-5 gap-4 mb-8 animate-fade-in-up animation-delay-200">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400 mb-1">{questions.length}</div>
            <div className="text-sm text-gray-300">Total Questions</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400 mb-1">{mcqQuestions.length}</div>
            <div className="text-sm text-gray-300">MCQ Questions</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-purple-400 mb-1">{codingQuestions.length}</div>
            <div className="text-sm text-gray-300">Coding Questions</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-yellow-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {questions.filter(q => q.difficulty === 'Medium').length}
            </div>
            <div className="text-sm text-gray-300">Medium Level</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-red-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {questions.filter(q => q.difficulty === 'Hard').length}
            </div>
            <div className="text-sm text-gray-300">Hard Level</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Filters:</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredQuestions.length} of {questions.length} questions
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 animate-fade-in-up animation-delay-600">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
              <div
                className="p-6 cursor-pointer hover:bg-gray-700/30 transition-all duration-300"
                onClick={() => setExpandedQuestion(
                  expandedQuestion === question.id ? null : question.id
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(question.type)}`}>
                        {question.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="text-sm text-gray-400">{question.category}</span>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{question.estimatedTime} min</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {question.question}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      expandedQuestion === question.id ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedQuestion === question.id && (
                <div className="border-t border-gray-600/50 p-6 bg-gray-900/30">
                  {question.type === 'mcq' ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-4">Choose the correct answer:</h4>
                        <div className="space-y-3">
                          {question.options?.map((option) => (
                            <label
                              key={option.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                userAnswers[question.id] === option.text
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/30'
                              } ${
                                showResults[question.id] && option.isCorrect
                                  ? 'border-green-500 bg-green-500/10'
                                  : showResults[question.id] && userAnswers[question.id] === option.text && !option.isCorrect
                                  ? 'border-red-500 bg-red-500/10'
                                  : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option.text}
                                checked={userAnswers[question.id] === option.text}
                                onChange={() => handleMCQAnswer(question.id, option.text)}
                                className="text-blue-500"
                                disabled={showResults[question.id]}
                              />
                              <span className="text-gray-300">{option.text}</span>
                              {showResults[question.id] && option.isCorrect && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                              )}
                            </label>
                          ))}
                        </div>
                        
                        {userAnswers[question.id] && !showResults[question.id] && (
                          <button
                            onClick={() => showMCQResult(question.id)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                          >
                            Check Answer
                          </button>
                        )}
                        
                        {showResults[question.id] && (
                          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                            <h5 className="font-semibold text-white mb-2">Explanation:</h5>
                            <p className="text-gray-300 text-sm">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-4 flex items-center">
                          <Code className="w-4 h-4 mr-2 text-purple-400" />
                          Code Template
                        </h4>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/50 overflow-x-auto">
                          <pre className="text-sm text-gray-300">
                            <code>{question.codeTemplate}</code>
                          </pre>
                        </div>
                      </div>
                      
                      {question.testCases && (
                        <div>
                          <h4 className="font-semibold text-white mb-3">Test Cases:</h4>
                          <div className="space-y-2">
                            {question.testCases.map((testCase, index) => (
                              <div key={index} className="bg-gray-700/50 p-3 rounded-lg text-sm">
                                <div className="text-gray-300">
                                  <span className="text-blue-400">Input:</span> {testCase.input}
                                </div>
                                <div className="text-gray-300">
                                  <span className="text-green-400">Output:</span> {testCase.output}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-white mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      Key Points to Remember
                    </h4>
                    <ul className="space-y-2">
                      {question.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                      Start Practice
                    </button>
                    <button className="bg-gray-700/50 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg text-sm font-medium border border-gray-600/50 hover:border-blue-500/50 hover:bg-gray-600/50 transition-all duration-300">
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
            <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No questions found</h3>
            <p className="text-gray-300">Try adjusting your filters to see more questions.</p>
          </div>
        )}

        {/* Action Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center shadow-2xl animate-fade-in-up animation-delay-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Test Your Skills?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start a comprehensive practice session with both MCQ and coding questions to evaluate your complete skill set.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-white/20">
              Start Mixed Practice
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/30 hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Coding Challenge Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;