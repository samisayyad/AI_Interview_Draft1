import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, MicOff, Video, VideoOff, Play, Square, RotateCcw } from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const questions = [
    "Tell me about yourself and your background in computer science.",
    "Describe a challenging programming project you've worked on. What technologies did you use?",
    "How do you approach debugging a complex software issue?",
    "Explain the difference between procedural and object-oriented programming.",
    "What's your experience with data structures and algorithms?"
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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      stopRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen py-8">
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
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
              <div className="aspect-video relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!cameraEnabled && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                    <VideoOff className="w-16 h-16 text-slate-400" />
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
                        ? 'bg-slate-700/80 text-white hover:bg-slate-600/80' 
                        : 'bg-red-600/80 text-white hover:bg-red-500/80'
                    } shadow-lg`}
                  >
                    {cameraEnabled ? <Camera className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      micEnabled 
                        ? 'bg-slate-700/80 text-white hover:bg-slate-600/80' 
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
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50">
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
                  <p className="text-slate-300 text-sm">
                    When you're ready, click "Start Interview" to begin your practice session.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    {questions[currentQuestion]}
                  </p>
                  <div className="text-sm text-slate-400">
                    Take your time to think and answer naturally.
                  </div>
                </div>
              )}
            </div>

            {/* Progress */}
            {!preparationMode && (
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Questions Completed</span>
                    <span className="text-white">{currentQuestion} / {questions.length}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-slate-400">
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Interview</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
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