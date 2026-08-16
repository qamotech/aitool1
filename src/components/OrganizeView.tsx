import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export function OrganizeView() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/gemini/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }
      
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the image.');
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
          transition={{ type: "spring" as const }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-3"
        >
          <Camera className="text-emerald-500" />
          Smart Organizer
        </motion.h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Upload a photo of a messy desk, closet, or workspace. AI will suggest how to reorganize it.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6 md:p-8 transition-all">
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="space-y-6 flex flex-col h-full">
            <motion.div 
              whileHover={!image ? { scale: 1.02 } : {}}
              whileTap={!image ? { scale: 0.98 } : {}}
              className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors ${
                image 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                  : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer hover:border-emerald-400'
              }`}
              onClick={() => !image && fileInputRef.current?.click()}
              style={{ minHeight: '300px' }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              <AnimatePresence mode="wait">
                {image ? (
                  <motion.div 
                    key="image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-full h-full flex flex-col items-center"
                  >
                    <img src={image} alt="Preview" className="max-h-64 object-contain rounded-lg shadow-sm" />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        setResult(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="mt-4 px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                    >
                      Remove Image
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Upload a photo</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">PNG, JPG up to 10MB</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: image && !loading ? 1.02 : 1 }}
              whileTap={{ scale: image && !loading ? 0.98 : 1 }}
              onClick={analyzeImage}
              disabled={!image || loading}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                !image || loading
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Loader2 />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <ImageIcon />
                  Analyze and Organize
                </>
              )}
            </motion.button>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col h-full min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
              <Sparkles className="text-emerald-500 w-5 h-5" />
              AI Suggestions
            </h3>
            
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
                  <Sparkles className="w-12 h-12 mb-3 text-emerald-400/50" />
                  <p>Upload an image and click analyze to get tailored organization tips powered by Gemini Vision.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
