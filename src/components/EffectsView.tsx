import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Zap, Sparkles } from 'lucide-react';

export function EffectsView() {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const effects = [
    { name: 'Float', class: 'animate-float', color: 'text-blue-500' },
    { name: 'Pulse Glow', class: 'animate-pulse-glow', color: 'text-purple-500' },
    { name: 'Wiggle', class: 'animate-wiggle', color: 'text-amber-500' },
    { name: 'Bounce Slow', class: 'animate-bounce-slow', color: 'text-emerald-500' },
    { name: 'Spin Slow', class: 'animate-spin-slow', color: 'text-pink-500' },
    { name: 'Gradient X', class: 'animate-gradient-x bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto]', color: 'text-white' },
    { name: 'Gradient Y', class: 'animate-gradient-y bg-gradient-to-b from-blue-500 via-emerald-500 to-blue-500 bg-[length:100%_200%]', color: 'text-white' },
    { name: 'Slide Up', class: 'animate-slide-up', color: 'text-cyan-500' },
    { name: 'Slide Down', class: 'animate-slide-down', color: 'text-sky-500' },
    { name: 'Slide Left', class: 'animate-slide-left', color: 'text-indigo-500' },
    { name: 'Slide Right', class: 'animate-slide-right', color: 'text-violet-500' },
    { name: 'Scale In', class: 'animate-scale-in', color: 'text-fuchsia-500' },
    { name: 'Scale Out', class: 'animate-scale-out', color: 'text-rose-500' },
    { name: 'Flip In', class: 'animate-flip-in', color: 'text-orange-500' },
    { name: 'Rotate In', class: 'animate-rotate-in', color: 'text-lime-500' },
    { name: 'Swing', class: 'animate-swing', color: 'text-green-500' },
    { name: 'Tada', class: 'animate-tada', color: 'text-teal-500' },
    { name: 'Rubber Band', class: 'animate-rubber-band', color: 'text-blue-600' },
    { name: 'Flash', class: 'animate-flash', color: 'text-purple-600' },
    { name: 'Pop', class: 'animate-pop', color: 'text-pink-600' },
    { name: 'Shimmer', class: 'animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:1000px_100%]', color: 'text-slate-500' },
    { name: 'Ken Burns', class: 'animate-ken-burns', color: 'text-amber-600' },
    { name: 'Border Spin', class: 'animated-border', color: 'text-emerald-600' },
    { name: 'Custom Hover', class: 'hover:rotate-6 hover:scale-110 transition-all duration-300', color: 'text-blue-500' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <Wand2 className="text-pink-500" />
          Effects & Animations Playground
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          24 custom animations and effects to enhance the user experience. Click to test them out!
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {effects.map((effect, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="flex flex-col items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                setActiveEffect(effect.name);
                setTimeout(() => setActiveEffect(null), 2000);
              }}
              className="w-full relative h-32 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-md transition-shadow flex items-center justify-center p-4"
            >
              <div 
                className={`w-full h-full flex items-center justify-center rounded-xl font-semibold text-slate-700 dark:text-slate-200 ${
                  activeEffect === effect.name || effect.class.includes('infinite') || effect.class.includes('hover') 
                    ? effect.class 
                    : ''
                } ${!effect.class.includes('bg-') ? 'bg-slate-50 dark:bg-slate-900/50' : ''}`}
              >
                {effect.class.includes('border') ? (
                  <div className="bg-white dark:bg-slate-800 w-full h-full rounded-xl flex items-center justify-center">
                    <Sparkles className={effect.color} />
                  </div>
                ) : (
                  <Sparkles className={effect.class.includes('bg-') ? 'text-white drop-shadow-md' : effect.color} />
                )}
              </div>
            </button>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{effect.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
