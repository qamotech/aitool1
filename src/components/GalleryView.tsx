import React, { useState } from 'react';
import { Lightbulb, Copy, CheckCircle, Tag } from 'lucide-react';
import { ideas } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export function GalleryView() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allTags = ['All', ...Array.from(new Set(ideas.flatMap(idea => idea.tags)))];
  
  const filteredIdeas = filter === 'All' 
    ? ideas 
    : ideas.filter(idea => idea.tags.includes(filter));

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <Lightbulb className="text-yellow-500" />
          Discover & Remix App Ideas
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Browse these AI application concepts. Copy the prompt to use as a starting point for your own project.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tag
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredIdeas.map((idea) => (
            <motion.div 
              layout
              variants={item}
              initial="hidden"
              animate="show"
              exit="exit"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              key={idea.id} 
              className="flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30 text-xs font-medium text-amber-700 dark:text-amber-400">
                      <Tag size={12} className="text-amber-500" />
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{idea.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {idea.description}
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Base Prompt</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(idea.id, idea.prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-amber-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      {copiedId === idea.id ? (
                        <motion.div 
                          key="copied"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
                        >
                          <CheckCircle size={16} />
                          Copied!
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy size={16} className="text-slate-400" />
                          Remix
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 line-clamp-3 italic">
                  "{idea.prompt}"
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
