import { useState, useCallback, useEffect, useRef } from 'react';

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef<string>('');
  const startTimeRef = useRef<number>(0);
  const currentPositionRef = useRef<number>(0);

  useEffect(() => {
    const isSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    console.log('Speech synthesis supported:', isSupported);
    setSupported(isSupported);
    
    if (isSupported) {
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        console.log('Available voices:', availableVoices.length);
        setVoices(availableVoices);
        
        if (availableVoices.length > 0 && !selectedVoice) {
          const englishVoice = availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
          console.log('Selected voice:', englishVoice?.name);
          setSelectedVoice(englishVoice);
        }
      };
      
      if (speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
      }
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, [selectedVoice]);

  const cleanup = useCallback(() => {
    console.log('Cleaning up speech synthesis');
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    setSpeaking(false);
    setProgress(0);
    currentUtteranceRef.current = null;
    currentTextRef.current = '';
    startTimeRef.current = 0;
    currentPositionRef.current = 0;
  }, []);

  const speakFromPosition = useCallback((text: string, startPosition: number = 0) => {
    if (!supported) return;
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Cancel any current speech after clearing interval
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      // Wait a bit for cancellation to complete
      setTimeout(() => {
        startSpeechFromPosition(text, startPosition);
      }, 100);
      return;
    }
    
    startSpeechFromPosition(text, startPosition);
  }, [supported, selectedVoice, cleanup]);

  const startSpeechFromPosition = useCallback((text: string, startPosition: number) => {
    const cleanText = text
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!cleanText) return;

    // Find a good starting point at word boundary
    let actualStartPosition = Math.max(0, Math.min(startPosition, cleanText.length));
    if (actualStartPosition > 0) {
      // Look for a word boundary within 30 characters
      for (let i = actualStartPosition; i < Math.min(actualStartPosition + 30, cleanText.length); i++) {
        if (/[\s.,!?;:]/.test(cleanText[i])) {
          actualStartPosition = i + 1;
          break;
        }
      }
    }

    const textToSpeak = cleanText.substring(actualStartPosition);
    if (!textToSpeak.trim()) {
      setProgress(100);
      setSpeaking(false);
      return;
    }

    currentTextRef.current = cleanText;
    currentPositionRef.current = actualStartPosition;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    currentUtteranceRef.current = utterance;
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Calculate duration based on remaining text
    const remainingChars = textToSpeak.length;
    const baseCharsPerSecond = 14;
    const adjustedCharsPerSecond = baseCharsPerSecond * utterance.rate;
    const estimatedDuration = remainingChars / adjustedCharsPerSecond;
    
    // Set total duration based on full text
    const totalChars = cleanText.length;
    const totalDuration = totalChars / adjustedCharsPerSecond;
    setDuration(totalDuration);

    utterance.onstart = () => {
      console.log('Speech started from position:', actualStartPosition);
      setSpeaking(true);
      startTimeRef.current = Date.now();
      
      // Set initial progress based on starting position
      const initialProgress = (actualStartPosition / totalChars) * 100;
      setProgress(initialProgress);
      
      // Update progress based on elapsed time
      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const charsSpoken = elapsed * adjustedCharsPerSecond;
        const currentChar = actualStartPosition + charsSpoken;
        const progressPercent = Math.min((currentChar / totalChars) * 100, 100);
        setProgress(progressPercent);
        
        // Update current position
        currentPositionRef.current = Math.min(currentChar, totalChars);
      }, 100);
    };

    utterance.onend = () => {
      console.log('Speech ended');
      cleanup();
      setProgress(100);
    };

    utterance.onerror = (event) => {
      console.log('Speech error:', event.error);
      // Only cleanup if it's not an interruption from our skip functionality
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.error('Unexpected speech synthesis error:', event.error);
        cleanup();
      }
    };

    try {
      speechSynthesis.speak(utterance);
      console.log('Speech synthesis started from position:', actualStartPosition);
    } catch (error) {
      console.error('Error starting speech:', error);
      cleanup();
    }
  }, [supported, selectedVoice, cleanup]);

  const speak = useCallback((text: string) => {
    speakFromPosition(text, 0);
  }, [speakFromPosition]);

  const stop = useCallback(() => {
    console.log('Stop function called');
    cleanup();
  }, [cleanup]);

  const skipBackward = useCallback(() => {
    if (!supported || !speaking || !currentTextRef.current) {
      console.log('Skip backward: conditions not met', { supported, speaking, hasText: !!currentTextRef.current });
      return;
    }
    
    console.log('Skip backward 15 seconds');
    
    // More conservative character calculation
    const charsPerSecond = 12; // Conservative estimate
    const skipChars = 15 * charsPerSecond;
    
    const newPosition = Math.max(0, currentPositionRef.current - skipChars);
    console.log('Skipping backward from', currentPositionRef.current, 'to', newPosition);
    
    speakFromPosition(currentTextRef.current, newPosition);
  }, [supported, speaking, speakFromPosition]);

  const skipForward = useCallback(() => {
    if (!supported || !speaking || !currentTextRef.current) {
      console.log('Skip forward: conditions not met', { supported, speaking, hasText: !!currentTextRef.current });
      return;
    }
    
    console.log('Skip forward 15 seconds');
    
    // More conservative character calculation
    const charsPerSecond = 12; // Conservative estimate
    const skipChars = 15 * charsPerSecond;
    
    const newPosition = currentPositionRef.current + skipChars;
    console.log('Skipping forward from', currentPositionRef.current, 'to', newPosition);
    
    speakFromPosition(currentTextRef.current, newPosition);
  }, [supported, speaking, speakFromPosition]);

  const changeVoice = useCallback((voice: SpeechSynthesisVoice) => {
    console.log('Changing voice to:', voice.name);
    setSelectedVoice(voice);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    speak,
    stop,
    skipBackward,
    skipForward,
    cleanup,
    speaking,
    progress,
    duration,
    supported,
    voices,
    selectedVoice,
    changeVoice,
  };
}