import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, MicOff, Video, VideoOff, Play, Square, RotateCcw, CheckCircle, Code } from 'lucide-react';

interface InterviewSessionProps {
  onComplete: (data: any) => void;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [preparationMode, setPreparationMode] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number | string}>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const questions = [
    // MCQ Questions (7) - Mixed domains
    {
      type: 'mcq',
      domain: 'Data Structures & Algorithms',
      question: "What is the time complexity of accessing an element in an array by index?",
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 0
    },
    {
      type: 'mcq',
      domain: 'Algorithms',
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
      correctAnswer: 1
    },
    {
      type: 'mcq',
      domain: 'Object-Oriented Programming',
      question: "Which OOP principle allows a class to inherit properties from another class?",
      options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
      correctAnswer: 1
    },
    {
      type: 'mcq',
      domain: 'Database Management',
      question: "What does ACID stand for in database transactions?",
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Accuracy, Consistency, Integrity, Durability',
        'Atomicity, Concurrency, Isolation, Durability',
        'Accuracy, Concurrency, Integrity, Dependency'
      ],
      correctAnswer: 0
    },
    {
      type: 'mcq',
      domain: 'Web Development',
      question: "Which HTTP method is used to retrieve data from a server?",
      options: ['POST', 'PUT', 'GET', 'DELETE'],
      correctAnswer: 2
    },
    {
      type: 'mcq',
      domain: 'System Design',
      question: "What is the primary purpose of a load balancer in system architecture?",
      options: [
        'Data encryption',
        'Distribute incoming requests across multiple servers',
        'Store user sessions',
        'Compress data'
      ],
      correctAnswer: 1
    },
    {
      type: 'mcq',
      domain: 'Algorithms',
      question: "What is the space complexity of the recursive Fibonacci algorithm?",
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 1
    },
    // Coding Questions (3) - Advanced topics
    {
      type: 'coding',
      domain: 'Data Structures & Algorithms',
      question: "Implement a function to reverse a linked list iteratively. Write your approach and the main logic.",
      codeTemplate: `class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    // Your approach here
}`
    },
    {
      type: 'coding',
      domain: 'Dynamic Programming',
      question: "Implement a function to find the longest common subsequence of two strings using dynamic programming. Explain your approach.",
      codeTemplate: `function longestCommonSubsequence(text1, text2) {
    // Your approach here
}`
    },
    {
      type: 'coding',
      domain: 'System Design',
      question: "Implement a basic LRU (Least Recently Used) cache with get and put operations. Explain the data structures you would use.",
      codeTemplate: `class LRUCache {
    constructor(capacity) {
        // Your approach here
    }
    
    get(key) {
        // Your implementation
    }
    
    put(key, value) {
        // Your implementation
    }
}`
    }
  ];

  useEffect(() => {
    if (cameraEnabled) {
      startCamera();
    }
    return () => {
      stopCamera();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cameraEnabled]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: cameraEnabled, 
        audio: micEnabled 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setPreparationMode(false);
    setTimer(0);
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Generate mock feedback data
    const feedbackData = {
      speechAnalysis: {
        score: Math.floor(Math.random() * 30) + 70,
        tone: Math.floor(Math.random() * 25) + 75,
        pace: Math.floor(Math.random() * 20) + 80,
        clarity: Math.floor(Math.random() * 15) + 85,
        filler_words: Math.floor(Math.random() * 10) + 5,
      },
      bodyLanguage: {
        score: Math.floor(Math.random() * 25) + 65,
        posture: Math.floor(Math.random() * 20) + 70,
        eye_contact: Math.floor(Math.random() * 30) + 60,
        gestures: Math.floor(Math.random() * 15) + 75,
        facial_expression: Math.floor(Math.random() * 10) + 80,
      },
      contentAnalysis: {
        score: Math.floor(Math.random() * 15) + 80,
        relevance: Math.floor(Math.random() * 10) + 85,
        structure: Math.floor(Math.random() * 20) + 75,
        technical_accuracy: Math.floor(Math.random() * 25) + 70,
        examples: Math.floor(Math.random() * 30) + 60,
      },
      questions: questions.slice(0, currentQuestion + 1),
      duration: timer,
    };

    onComplete(feedbackData);
    navigate('/feedback');
  };

  const nextQuestion = () => {
    // Save current answer
    if (questions[currentQuestion].type === 'mcq' && selectedAnswer !== null) {
      setUserAnswers(prev => ({ ...prev, [currentQuestion]: selectedAnswer }));
    }
    
    setSelectedAnswer(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      stopRecording();
    }
  };

  const handleMCQAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = questions[currentQuestion];
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-2">
            {preparationMode ? 'Interview Preparation' : 'Mock Interview Session'}
          </h1>
          <p className="text-slate-300">
            {preparationMode 
              ? 'Get ready for your interview. Check your camera and microphone.'
              : `Question ${currentQuestion + 1} of ${questions.length}`
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Feed */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-200">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
              <div className="aspect-video relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!cameraEnabled && (
                  <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
                    <VideoOff className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">REC {formatTime(timer)}</span>
                  </div>
                )}

                {/* Controls overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      cameraEnabled 
                        ? 'bg-gray-700/80 text-white hover:bg-gray-600/80' 
                        : 'bg-red-600/80 text-white hover:bg-red-500/80'
                    } shadow-lg`}
                  >
                    {cameraEnabled ? <Camera className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      micEnabled 
                        ? 'bg-gray-700/80 text-white hover:bg-gray-600/80' 
                        : 'bg-red-600/80 text-white hover:bg-red-500/80'
                    } shadow-lg`}
                  >
                    {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Question Panel */}
          <div className="space-y-6 animate-fade-in-up animation-delay-400">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">
                {preparationMode ? 'Setup Complete?' : 'Current Question'}
              </h3>
              
              {preparationMode ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <Camera className="w-5 h-5" />
                    <span>Camera: {cameraEnabled ? 'Ready' : 'Disabled'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400">
                    <Mic className="w-5 h-5" />
                    <span>Microphone: {micEnabled ? 'Ready' : 'Disabled'}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    When you're ready, click "Start Interview" to begin your practice session.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentQuestionData.type === 'mcq' 
                          ? 'text-blue-400 bg-blue-400/20' 
                          : 'text-purple-400 bg-purple-400/20'
                      }`}>
                        {currentQuestionData.type === 'mcq' ? 'MCQ' : 'CODING'}
                      </span>
                    </div>
                    <p className="text-white leading-relaxed mb-4">
                      {currentQuestionData.question}
                    </p>
                  </div>
                  
                  {currentQuestionData.type === 'mcq' ? (
                    <div className="space-y-3">
                      {currentQuestionData.options?.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                            selectedAnswer === index
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion}`}
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => handleMCQAnswer(index)}
                            className="text-blue-500"
                          />
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <Code className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-gray-300">Code Template:</span>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{currentQuestionData.codeTemplate}</code>
                        </pre>
                      </div>
                      <div className="text-sm text-gray-400">
                        Explain your approach and walk through your solution step by step.
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-400 mt-4">
                    {currentQuestionData.type === 'mcq' 
                      ? 'Select your answer and click Next Question to continue.'
                      : 'Take your time to explain your approach and implementation.'
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Progress */}
            {!preparationMode && (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Questions Completed</span>
                    <span className="text-white">{currentQuestion} / {questions.length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Time: {formatTime(timer)}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {preparationMode ? (
                <button
                  onClick={startRecording}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Interview</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionData.type === 'mcq' && selectedAnswer === null}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                  </button>
                  
                  <button
                    onClick={stopRecording}
                    className="w-full bg-red-600/80 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-500 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Square className="w-4 h-4" />
                    <span>End Interview</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;