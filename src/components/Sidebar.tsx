import React from 'react';
import { View } from '../types';
import { Home, BookOpen, Lightbulb, Camera, Settings, FileText, Code, FileBadge, Plane, Languages, Mail, BookHeart, Smile, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, group: 'Main', color: 'text-blue-500' },
    { id: 'learn', label: 'Learn AI', icon: BookOpen, group: 'Main', color: 'text-purple-500' },
    { id: 'gallery', label: 'Discover Ideas', icon: Lightbulb, group: 'Main', color: 'text-yellow-500' },
    { id: 'effects', label: 'Effects & UI', icon: Sparkles, group: 'Main', color: 'text-pink-500' },
    
    { id: 'organize', label: 'Smart Organizer', icon: Camera, group: 'Tools', color: 'text-emerald-500' },
    { id: 'summarizer', label: 'Text Summarizer', icon: FileText, group: 'Tools', color: 'text-indigo-500' },
    { id: 'code-explainer', label: 'Code Explainer', icon: Code, group: 'Tools', color: 'text-cyan-500' },
    { id: 'resume', label: 'Resume Tailorer', icon: FileBadge, group: 'Tools', color: 'text-rose-500' },
    { id: 'travel', label: 'Travel Planner', icon: Plane, group: 'Tools', color: 'text-sky-500' },
    { id: 'translator', label: 'Translator', icon: Languages, group: 'Tools', color: 'text-fuchsia-500' },
    { id: 'email', label: 'Email Drafter', icon: Mail, group: 'Tools', color: 'text-orange-500' },
    { id: 'story', label: 'Story Generator', icon: BookHeart, group: 'Tools', color: 'text-red-500' },
    { id: 'sentiment', label: 'Sentiment Analyzer', icon: Smile, group: 'Tools', color: 'text-lime-500' },
    
    { id: 'settings', label: 'Settings', icon: Settings, group: 'Config', color: 'text-slate-500' },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 flex items-center justify-between"
          >
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Lightbulb size={20} />
              </span>
              AI Workshop
            </h1>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </motion.div>
          
          <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1 px-4 space-y-1 overflow-y-auto pb-6"
          >
            {['Main', 'Tools', 'Config'].map((group) => (
              <div key={group} className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {group}
                </div>
                {navItems.filter(item => item.group === group).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCurrentView(item.id as View);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 mb-1 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon size={18} className={isActive ? item.color : item.color + ' opacity-80'} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </motion.nav>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-500 text-center">
              Powered by Google Gemini
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
