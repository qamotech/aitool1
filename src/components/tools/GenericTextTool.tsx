import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Mic, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

interface GenericTextToolProps {
  title: string;
  description: string;
  icon: React.ElementType;
  inputPlaceholder: string;
  buttonText: string;
  systemInstruction: string;
  isLargeInput?: boolean;
  colorClass?: string;
}

export function GenericTextTool({
  title,
  description,
  icon: Icon,
  inputPlaceholder,
  buttonText,
  systemInstruction,
  isLargeInput = false,
  colorClass = 'text-blue-500'
}: GenericTextToolProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Voice Dictation State
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              currentTranscript += transcript + ' ';
            }
          }
          if (currentTranscript) {
            setInput(prev => prev + currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setSpeechRecognition(recognition);
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      speechRecognition?.stop();
    } else {
      speechRecognition?.start();
      setIsListening(true);
    }
  };

  const generateContent = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, systemInstruction }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }
      
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="space-y-4 text-center">
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-3"
        >
          <Icon className={colorClass} />
          {title}
        </motion.h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>

      <div className={`bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8 ${loading ? 'animated-border' : ''}`}>
        <div className="grid md:grid-cols-2 gap-8 relative z-10 bg-white dark:bg-slate-800 rounded-3xl">
          
          <div className="space-y-6 flex flex-col h-full relative">
            {speechRecognition && (
              <button 
                onClick={toggleListening}
                className={`absolute top-4 right-4 p-2 rounded-full z-20 transition-colors ${isListening ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
                title={isListening ? 'Stop recording' : 'Start voice dictation'}
                aria-label={isListening ? 'Stop recording' : 'Start voice dictation'}
              >
                {isListening ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
              </button>
            )}
            
            {isLargeInput ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                onKeyDown={(e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter' && generateContent()}
                className="w-full flex-1 min-h-[250px] p-4 pr-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-blue-500 focus:ring-0 resize-none transition-colors dark:text-white"
                aria-label={inputPlaceholder}
              />
            ) : (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                onKeyDown={(e) => e.key === 'Enter' && generateContent()}
                className="w-full p-4 pr-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-blue-500 focus:ring-0 transition-colors dark:text-white"
                aria-label={inputPlaceholder}
              />
            )}
            
            <motion.button
              whileHover={{ scale: input.trim() && !loading ? 1.02 : 1 }}
              whileTap={{ scale: input.trim() && !loading ? 0.98 : 1 }}
              onClick={generateContent}
              disabled={!input.trim() || loading}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                !input.trim() || loading
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Loader2 />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  {buttonText}
                </>
              )}
            </motion.button>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col h-full min-h-[400px] relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Result</h3>
              {result && (
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
                  title="Copy to clipboard"
                  aria-label="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto prose prose-slate dark:prose-invert prose-sm">
              {error ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                >
                  {error}
                </motion.div>
              ) : result ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.5 }}
                  className="markdown-body"
                >
                  <ReactMarkdown>{result}</ReactMarkdown>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400 opacity-60">
                  <div className="relative w-32 h-32 mb-6">
                    <motion.div 
                      className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute inset-4 bg-blue-200 dark:bg-blue-800/40 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon className={`w-16 h-16 ${colorClass}`} />
                      </motion.div>
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Ready to assist</h4>
                  <p className="max-w-xs mx-auto">Enter your text and run the tool to see the AI's response.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
