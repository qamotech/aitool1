import React from 'react';
import { Settings, Key, Shield, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function SettingsView() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      variants={container}
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="space-y-4">
        <motion.h2 variants={item} className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <Settings className="text-slate-500" />
          Settings & Configuration
        </motion.h2>
        <motion.p variants={item} className="text-lg text-slate-600 dark:text-slate-300">
          Learn how API keys are managed in this environment.
        </motion.p>
      </div>

      <motion.div variants={item} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all">
        <div className="p-8 space-y-8">
          
          <div className="flex items-start gap-4">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex-shrink-0"
            >
              <Key className="w-6 h-6 text-amber-500" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Gemini API Key</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Your API key is automatically injected securely into the server environment by AI Studio. You do not need to manually enter it here.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                To update your key, use the <strong className="text-slate-900 dark:text-slate-200">Secrets</strong> panel in the AI Studio side navigation.
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-200 dark:bg-slate-700"></div>

          <div className="flex items-start gap-4">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex-shrink-0"
            >
              <Shield className="w-6 h-6 text-emerald-500" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Security Best Practices</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                This application acts as a full-stack environment. All requests to the Gemini API are routed through the local Node.js server to ensure your API keys are never exposed to the browser.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Read security docs <ExternalLink size={16} />
              </a>
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
}
