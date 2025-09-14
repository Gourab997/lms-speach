import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CheckCircle, Settings, SkipBack, SkipForward, Play } from 'lucide-react';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import type { Content } from '../../types';

interface ContentViewerProps {
  content: Content;
  onComplete: () => void;
  isCompleted: boolean;
}

export function ContentViewer({ content, onComplete, isCompleted }: ContentViewerProps) {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const { speak, stop, skipBackward, skipForward, cleanup, speaking, progress, duration, supported, voices, selectedVoice, changeVoice } = useTextToSpeech();

  // Cleanup text-to-speech when component unmounts or content changes
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Stop speech when content changes
  useEffect(() => {
    cleanup();
  }, [content.id, cleanup]);

  const handleTextToSpeech = () => {
    console.log('Text to speech button clicked, speaking:', speaking);
    if (speaking) {
      stop();
    } else {
      // Strip HTML tags and decode HTML entities for clean text-to-speech
      const cleanText = content.content_data.text || '';
      console.log('Speaking text:', cleanText.substring(0, 100) + '...');
      speak(cleanText);
    }
  };

  const renderTextContent = () => (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Lesson - 2</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content.title}</h1>
      </div>
      
      {/* Content Area */}
      <div className="bg-teal-50 rounded-lg p-8 mb-8 text-center">
        <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-12 h-12 border-2 border-white rounded-full"></div>
        </div>
        <div className="text-teal-600 font-medium text-lg mb-2">NEXUS DRIVER'S ED</div>
        <div className="text-teal-500 text-sm">LEARN FROM THE BEST</div>
      </div>
      
      <div className="prose max-w-none mb-8">
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.content_data.text }}
        />
      </div>
      
      {/* Audio Controls */}
      {supported && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button 
              onClick={skipBackward}
              disabled={!speaking}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={handleTextToSpeech}
              className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
            >
              {speaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <button 
              onClick={skipForward}
              disabled={!speaking}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>{Math.floor((progress / 100) * duration)}s</span>
            <span>{Math.floor(duration)}s</span>
          </div>
          
          {showVoiceSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Voice Settings</h4>
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Select Voice:</label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    if (voice) changeVoice(voice);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  {voices.filter(voice => voice.lang.startsWith('en')).map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <Settings className="w-4 h-4 inline mr-1" />
            Voice Settings
          </button>
        </div>
      )}
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Preview
        </button>
        
        <div className="flex items-center space-x-4">
          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="flex items-center space-x-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as complete</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-teal-600">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
          
          <button className="text-gray-500 hover:text-gray-700">
            Next (18s)
          </button>
        </div>
      </div>
    </div>
  );

  const renderVideoContent = () => (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Lesson - 2</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content.title}</h1>
      </div>
      
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-8">
        <video
          controls
          className="w-full h-full"
          poster={content.content_data.thumbnail}
          onEnded={onComplete}
        >
          <source src={content.content_data.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Preview
        </button>
        
        <div className="flex items-center space-x-4">
          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="flex items-center space-x-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as complete</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-teal-600">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
          
          <button className="text-gray-500 hover:text-gray-700">
            Next (18s)
          </button>
        </div>
      </div>
    </div>
  );

  const renderAudioContent = () => (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Lesson - 2</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content.title}</h1>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-8 rounded-lg text-white mb-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8" />
          </div>
          <p className="text-lg opacity-90">{content.content_data.description}</p>
        </div>
        <audio
          controls
          className="w-full"
          onEnded={onComplete}
        >
          <source src={content.content_data.url} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
      
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Preview
        </button>
        
        <div className="flex items-center space-x-4">
          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="flex items-center space-x-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as complete</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-teal-600">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
          
          <button className="text-gray-500 hover:text-gray-700">
            Next (18s)
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuizContent = () => {
    const quiz = content.content_data;
    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
      const newAnswers = [...quizAnswers];
      newAnswers[questionIndex] = answerIndex;
      setQuizAnswers(newAnswers);
    };

    const handleSubmit = () => {
      const correctAnswers = quiz.questions.filter(
        (q: any, i: number) => quizAnswers[i] === q.correct_answer
      ).length;
      const score = (correctAnswers / quiz.questions.length) * 100;
      
      if (score >= quiz.passing_score) {
        onComplete();
      } else {
        alert(`Score: ${score}%. You need ${quiz.passing_score}% to pass. Try again!`);
      }
    };

    return (
      <div>
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Lesson - 6</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Quiz</h1>
        </div>
        
        <div className="space-y-6 mb-8">
          {quiz.questions.map((question: any, questionIndex: number) => (
            <div key={questionIndex} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option: string, optionIndex: number) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      quizAnswers[questionIndex] === optionIndex
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      checked={quizAnswers[questionIndex] === optionIndex}
                      onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                      className="text-teal-600"
                    />
                    <span className="text-gray-700">{option}</span>
                    {quizAnswers[questionIndex] === optionIndex && (
                      <CheckCircle className="w-4 h-4 text-teal-500 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Preview
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSubmit}
              disabled={quizAnswers.length !== quiz.questions.length}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Submit answer
            </button>
            
            <button className="text-gray-500 hover:text-gray-700">
              Next (18s)
            </button>
          </div>
        </div>
      </div>
    );
  };

  const contentRenderers = {
    text: renderTextContent,
    video: renderVideoContent,
    audio: renderAudioContent,
    quiz: renderQuizContent,
  };

  return (
    <div>
      {contentRenderers[content.type]()}
    </div>
  );
}