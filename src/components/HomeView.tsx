import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, BookOpen, Lightbulb, Camera } from 'lucide-react';
import { View } from '../types';
import { motion } from 'motion/react';

interface HomeViewProps {
  setCurrentView: (view: View) => void;
}

export function HomeView({ setCurrentView }: HomeViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];

    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300 } }
  };

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0 opacity-50"
        aria-hidden="true"
      />
      <motion.div 
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: -20 }}
        variants={container}
        className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center space-y-8">
          <motion.div variants={item} className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </motion.div>
          
          <motion.h1 variants={item} className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Google AI Workshop
            </span>
          </motion.h1>
          
          <motion.p variants={item} className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
            Learn how to harness the power of generative AI. Explore creative ideas, understand core concepts, and build practical tools using the Gemini API.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('learn')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-500/30"
              aria-label="Start Learning"
            >
              Start Learning
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('gallery')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full font-semibold transition-all shadow-sm"
              aria-label="Discover Ideas"
            >
              Discover Ideas
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div variants={container} className="mt-24 grid md:grid-cols-3 gap-8">
          <motion.div variants={item} whileHover={{ y: -5 }} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Learn Basics</h3>
            <p className="text-slate-600 dark:text-slate-400">Understand what AI can do, how prompting works, and best practices for integration.</p>
          </motion.div>
          
          <motion.div variants={item} whileHover={{ y: -5 }} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="text-purple-600 dark:text-purple-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Explore Gallery</h3>
            <p className="text-slate-600 dark:text-slate-400">Browse a curated list of app ideas and ready-to-use prompts to jumpstart your creativity.</p>
          </motion.div>
          
          <motion.div variants={item} whileHover={{ y: -5 }} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-6">
              <Camera className="text-amber-600 dark:text-amber-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Build & Test</h3>
            <p className="text-slate-600 dark:text-slate-400">Try out the Smart Organizer tool which uses Gemini Vision to analyze and categorize images.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
