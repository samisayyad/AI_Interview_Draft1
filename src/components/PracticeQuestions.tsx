import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Clock, Star, Shuffle, Filter, Code, CheckCircle, ArrowLeft, Play, Target, Video } from 'lucide-react';

interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  type: 'mcq' | 'coding';
  domain: string;
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
  const [searchParams] = useSearchParams();
  const selectedDomain = searchParams.get('domain') || 'All';
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState<{[key: string]: boolean}>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const types = ['All', 'MCQ', 'Coding'];

  const allQuestions: Question[] = [
    // Data Structures & Algorithms
    {
      id: 'dsa-1',
      type: 'mcq',
      domain: 'Data Structures & Algorithms',
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
      id: 'dsa-2',
      type: 'mcq',
      domain: 'Data Structures & Algorithms',
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
      id: 'dsa-3',
      type: 'mcq',
      domain: 'Data Structures & Algorithms',
      difficulty: 'Hard',
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
      estimatedTime: 4
    },
    {
      id: 'dsa-4',
      type: 'coding',
      domain: 'Data Structures & Algorithms',
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
      id: 'dsa-5',
      type: 'coding',
      domain: 'Data Structures & Algorithms',
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

    // Database Management
    {
      id: 'db-1',
      type: 'mcq',
      domain: 'Database Management',
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
      id: 'db-2',
      type: 'mcq',
      domain: 'Database Management',
      difficulty: 'Easy',
      question: 'Which SQL command is used to retrieve data from a database?',
      options: [
        { id: 'a', text: 'INSERT', isCorrect: false },
        { id: 'b', text: 'UPDATE', isCorrect: false },
        { id: 'c', text: 'SELECT', isCorrect: true },
        { id: 'd', text: 'DELETE', isCorrect: false }
      ],
      correctAnswer: 'SELECT',
      explanation: 'SELECT is the SQL command used to query and retrieve data from database tables.',
      tips: [
        'SELECT is the most commonly used SQL command',
        'Can be combined with WHERE, ORDER BY, GROUP BY',
        'Forms the basis of all data retrieval operations'
      ],
      estimatedTime: 2
    },
    {
      id: 'db-3',
      type: 'coding',
      domain: 'Database Management',
      difficulty: 'Medium',
      question: 'Write a SQL query to find the second highest salary from an Employee table.',
      codeTemplate: `-- Employee table structure:
-- id (INT), name (VARCHAR), salary (DECIMAL)

SELECT 
-- Your query here

FROM Employee
-- Complete the query`,
      expectedOutput: 'Second highest salary value',
      testCases: [
        { input: 'Salaries: [100, 200, 300]', output: '200' },
        { input: 'Salaries: [100, 100, 200]', output: '100' },
        { input: 'Salaries: [100]', output: 'NULL' }
      ],
      tips: [
        'Use DISTINCT to handle duplicate salaries',
        'Consider using LIMIT with OFFSET',
        'Alternative: Use subquery with MAX function',
        'Handle edge case when there\'s no second highest'
      ],
      estimatedTime: 10
    },

    // Web Development
    {
      id: 'web-1',
      type: 'mcq',
      domain: 'Web Development',
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
      id: 'web-2',
      type: 'mcq',
      domain: 'Web Development',
      difficulty: 'Medium',
      question: 'What is the purpose of the Virtual DOM in React?',
      options: [
        { id: 'a', text: 'To replace the real DOM completely', isCorrect: false },
        { id: 'b', text: 'To optimize rendering performance', isCorrect: true },
        { id: 'c', text: 'To handle server-side rendering', isCorrect: false },
        { id: 'd', text: 'To manage component state', isCorrect: false }
      ],
      correctAnswer: 'To optimize rendering performance',
      explanation: 'Virtual DOM is a JavaScript representation of the real DOM that allows React to efficiently update the UI by comparing changes and updating only what\'s necessary.',
      tips: [
        'Virtual DOM enables efficient diffing',
        'Reduces expensive DOM manipulations',
        'Allows for batched updates'
      ],
      estimatedTime: 3
    },
    {
      id: 'web-3',
      type: 'coding',
      domain: 'Web Development',
      difficulty: 'Medium',
      question: 'Create a JavaScript function that debounces another function.',
      codeTemplate: `function debounce(func, delay) {
    // Your implementation here
    
}

// Usage example:
// const debouncedFunction = debounce(() => console.log('Called!'), 300);`,
      expectedOutput: 'Debounced function that delays execution',
      testCases: [
        { input: 'Multiple rapid calls', output: 'Only last call executes after delay' },
        { input: 'Single call', output: 'Executes after delay' },
        { input: 'Calls with different delays', output: 'Respects specified delay' }
      ],
      tips: [
        'Use setTimeout to delay execution',
        'Clear previous timeout on new calls',
        'Return a function that wraps the original',
        'Preserve function context and arguments'
      ],
      estimatedTime: 12
    },

    // System Design
    {
      id: 'sys-1',
      type: 'mcq',
      domain: 'System Design',
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
      id: 'sys-2',
      type: 'mcq',
      domain: 'System Design',
      difficulty: 'Medium',
      question: 'Which database type is best suited for handling large amounts of unstructured data?',
      options: [
        { id: 'a', text: 'Relational Database', isCorrect: false },
        { id: 'b', text: 'NoSQL Database', isCorrect: true },
        { id: 'c', text: 'In-memory Database', isCorrect: false },
        { id: 'd', text: 'Graph Database', isCorrect: false }
      ],
      correctAnswer: 'NoSQL Database',
      explanation: 'NoSQL databases are designed to handle large volumes of unstructured or semi-structured data with flexible schemas.',
      tips: [
        'NoSQL offers horizontal scalability',
        'Better for rapid development and iteration',
        'Examples: MongoDB, Cassandra, DynamoDB'
      ],
      estimatedTime: 3
    },

    // Cybersecurity
    {
      id: 'sec-1',
      type: 'mcq',
      domain: 'Cybersecurity',
      difficulty: 'Medium',
      question: 'What is the primary purpose of encryption?',
      options: [
        { id: 'a', text: 'To compress data', isCorrect: false },
        { id: 'b', text: 'To protect data confidentiality', isCorrect: true },
        { id: 'c', text: 'To improve performance', isCorrect: false },
        { id: 'd', text: 'To reduce storage space', isCorrect: false }
      ],
      correctAnswer: 'To protect data confidentiality',
      explanation: 'Encryption transforms readable data into an unreadable format to protect it from unauthorized access.',
      tips: [
        'Encryption ensures data confidentiality',
        'Uses algorithms and keys for transformation',
        'Essential for secure data transmission'
      ],
      estimatedTime: 3
    },
    {
      id: 'sec-2',
      type: 'mcq',
      domain: 'Cybersecurity',
      difficulty: 'Hard',
      question: 'Which type of attack involves overwhelming a system with traffic?',
      options: [
        { id: 'a', text: 'SQL Injection', isCorrect: false },
        { id: 'b', text: 'Cross-Site Scripting (XSS)', isCorrect: false },
        { id: 'c', text: 'Distributed Denial of Service (DDoS)', isCorrect: true },
        { id: 'd', text: 'Man-in-the-Middle', isCorrect: false }
      ],
      correctAnswer: 'Distributed Denial of Service (DDoS)',
      explanation: 'DDoS attacks overwhelm a target system with traffic from multiple sources, making it unavailable to legitimate users.',
      tips: [
        'DDoS uses multiple compromised systems',
        'Aims to disrupt service availability',
        'Can be mitigated with proper infrastructure'
      ],
      estimatedTime: 4
    },

    // Machine Learning
    {
      id: 'ml-1',
      type: 'mcq',
      domain: 'Machine Learning',
      difficulty: 'Medium',
      question: 'What is the main difference between supervised and unsupervised learning?',
      options: [
        { id: 'a', text: 'Supervised learning uses labeled data, unsupervised does not', isCorrect: true },
        { id: 'b', text: 'Supervised learning is faster than unsupervised', isCorrect: false },
        { id: 'c', text: 'Unsupervised learning requires more data', isCorrect: false },
        { id: 'd', text: 'There is no significant difference', isCorrect: false }
      ],
      correctAnswer: 'Supervised learning uses labeled data, unsupervised does not',
      explanation: 'Supervised learning algorithms learn from labeled training data, while unsupervised learning finds patterns in data without labels.',
      tips: [
        'Supervised: classification, regression',
        'Unsupervised: clustering, dimensionality reduction',
        'Semi-supervised combines both approaches'
      ],
      estimatedTime: 3
    },
    {
      id: 'ml-2',
      type: 'coding',
      domain: 'Machine Learning',
      difficulty: 'Hard',
      question: 'Implement a simple linear regression from scratch using gradient descent.',
      codeTemplate: `import numpy as np

class LinearRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        
    def fit(self, X, y):
        # Your implementation here
        pass
        
    def predict(self, X):
        # Your implementation here
        pass`,
      expectedOutput: 'Linear regression model with fit and predict methods',
      testCases: [
        { input: 'X = [[1], [2], [3]], y = [2, 4, 6]', output: 'Should learn y = 2x relationship' },
        { input: 'X = [[1], [2]], y = [1, 3]', output: 'Should learn y = 2x - 1 relationship' }
      ],
      tips: [
        'Initialize weights and bias to zero',
        'Use gradient descent to minimize cost function',
        'Update weights: w = w - learning_rate * gradient',
        'Cost function: MSE = (1/2m) * sum((y_pred - y)^2)'
      ],
      estimatedTime: 30
    }
  ];

  const filteredQuestions = allQuestions.filter(question => {
    const domainMatch = selectedDomain === 'All' || question.domain === selectedDomain;
    const difficultyMatch = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
    const typeMatch = selectedType === 'All' || 
      (selectedType === 'MCQ' && question.type === 'mcq') ||
      (selectedType === 'Coding' && question.type === 'coding');
    return domainMatch && difficultyMatch && typeMatch;
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

  const startPracticeMode = () => {
    setPracticeMode(true);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setPracticeMode(false);
      // Could navigate to results page here
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (practiceMode && filteredQuestions.length > 0) {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Practice Mode Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setPracticeMode(false)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Questions</span>
            </button>
            <div className="text-center">
              <div className="text-white font-semibold">
                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
              </div>
              <div className="text-gray-400 text-sm">{selectedDomain}</div>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/50 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(currentQuestion.type)}`}>
                {currentQuestion.type.toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{currentQuestion.estimatedTime} min</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'mcq' ? (
              <div className="space-y-4">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      userAnswers[currentQuestion.id] === option.text
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/30'
                    } ${
                      showResults[currentQuestion.id] && option.isCorrect
                        ? 'border-green-500 bg-green-500/10'
                        : showResults[currentQuestion.id] && userAnswers[currentQuestion.id] === option.text && !option.isCorrect
                        ? 'border-red-500 bg-red-500/10'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.text}
                      checked={userAnswers[currentQuestion.id] === option.text}
                      onChange={() => handleMCQAnswer(currentQuestion.id, option.text)}
                      className="text-blue-500"
                      disabled={showResults[currentQuestion.id]}
                    />
                    <span className="text-gray-300 flex-1">{option.text}</span>
                    {showResults[currentQuestion.id] && option.isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </label>
                ))}
                
                {userAnswers[currentQuestion.id] && !showResults[currentQuestion.id] && (
                  <button
                    onClick={() => showMCQResult(currentQuestion.id)}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Check Answer
                  </button>
                )}
                
                {showResults[currentQuestion.id] && (
                  <div className="mt-6 p-6 bg-gray-700/50 rounded-xl">
                    <h4 className="font-semibold text-white mb-3">Explanation:</h4>
                    <p className="text-gray-300 mb-4">{currentQuestion.explanation}</p>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Key Points:</h5>
                      <ul className="space-y-1">
                        {currentQuestion.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-600/50 overflow-x-auto">
                  <div className="flex items-center space-x-2 mb-4">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span className="font-medium text-gray-300">Code Template:</span>
                  </div>
                  <pre className="text-sm text-gray-300">
                    <code>{currentQuestion.codeTemplate}</code>
                  </pre>
                </div>
                
                {currentQuestion.testCases && (
                  <div>
                    <h4 className="font-semibold text-white mb-3">Test Cases:</h4>
                    <div className="space-y-3">
                      {currentQuestion.testCases.map((testCase, index) => (
                        <div key={index} className="bg-gray-700/50 p-4 rounded-xl">
                          <div className="text-gray-300 mb-1">
                            <span className="text-blue-400 font-medium">Input:</span> {testCase.input}
                          </div>
                          <div className="text-gray-300">
                            <span className="text-green-400 font-medium">Expected Output:</span> {testCase.output}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-white mb-3">Tips:</h4>
                  <ul className="space-y-2">
                    {currentQuestion.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextQuestion}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>{currentQuestionIndex === filteredQuestions.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {selectedDomain !== 'All' && (
              <Link
                to="/practice"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Domains</span>
              </Link>
            )}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {selectedDomain === 'All' ? 'Interview Practice Questions' : selectedDomain}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {selectedDomain === 'All' 
              ? 'Master your interview skills with our comprehensive collection of questions'
              : 'Practice domain-specific questions to excel in your interviews'
            }
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8 animate-fade-in-up animation-delay-200">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400 mb-1">{filteredQuestions.length}</div>
            <div className="text-sm text-gray-300">Total Questions</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {filteredQuestions.filter(q => q.type === 'mcq').length}
            </div>
            <div className="text-sm text-gray-300">MCQ Questions</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {filteredQuestions.filter(q => q.type === 'coding').length}
            </div>
            <div className="text-sm text-gray-300">Coding Questions</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50 text-center hover:border-green-500/50 transition-all duration-300">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {Math.round(filteredQuestions.reduce((acc, q) => acc + q.estimatedTime, 0) / filteredQuestions.length) || 0}
            </div>
            <div className="text-sm text-gray-300">Avg. Time (min)</div>
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

            {filteredQuestions.length > 0 && (
              <button
                onClick={startPracticeMode}
                className="ml-auto flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                <span>Start Practice</span>
              </button>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredQuestions.length} questions
            {selectedDomain !== 'All' && ` in ${selectedDomain}`}
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
                      <span className="text-sm text-gray-400">{question.domain}</span>
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
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No questions found</h3>
            <p className="text-gray-300">Try adjusting your filters to see more questions.</p>
          </div>
        )}

        {/* Action Section */}
        {filteredQuestions.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center shadow-2xl animate-fade-in-up animation-delay-800">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Test Your Skills?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start a comprehensive practice session with questions from {selectedDomain === 'All' ? 'all domains' : selectedDomain}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startPracticeMode}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Practice Session</span>
              </button>
              <Link
                to="/interview"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/30 hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Video className="w-5 h-5" />
                <span>Mock Interview</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeQuestions;