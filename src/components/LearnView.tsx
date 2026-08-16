import React from 'react';
import { BookOpen, Code, Cpu, MessageSquare, Image as ImageIcon, Type, FileJson } from 'lucide-react';
import { motion } from 'motion/react';

export function LearnView() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 200 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, x: 20 }}
      variants={container}
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12"
    >
      <div className="space-y-4">
        <motion.h2 variants={item} className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <BookOpen className="text-purple-500" />
          Learn AI Concepts
        </motion.h2>
        <motion.p variants={item} className="text-lg text-slate-600 dark:text-slate-300">
          Master the fundamentals of working with Generative AI and the Gemini API.
        </motion.p>
      </div>

      <div className="space-y-8">
        <motion.section variants={item} whileHover={{ scale: 1.01 }} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Effective Prompting</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                The key to getting great results is being specific and providing context. A good prompt includes:
              </p>
              
              <div className="mb-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-center">
                  <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 w-full md:w-auto">
                    <span className="block text-xs uppercase text-slate-400 font-bold mb-1">Role</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">"You are an expert chef"</span>
                  </div>
                  <div className="text-slate-400 font-bold text-xl">+</div>
                  <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 w-full md:w-auto">
                    <span className="block text-xs uppercase text-slate-400 font-bold mb-1">Task</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">"Create a menu"</span>
                  </div>
                  <div className="text-slate-400 font-bold text-xl">+</div>
                  <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 w-full md:w-auto">
                    <span className="block text-xs uppercase text-slate-400 font-bold mb-1">Context</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">"Only vegetarian"</span>
                  </div>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Role:</strong> Set the persona for the AI to adopt.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Task:</strong> Clearly define what you want the AI to do.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Context:</strong> Provide background information or constraints.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Format:</strong> Specify how you want the output (e.g., Markdown, JSON).</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} whileHover={{ scale: 1.01 }} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex-shrink-0">
              <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Multimodal Capabilities</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Gemini isn't just text. It can understand and reason across text, images, and audio. 
                When you pass an image to the API, the model "sees" the contents and can answer questions, 
                extract text, or generate code based on a mockup.
              </p>

              <div className="flex flex-wrap gap-4 items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl shadow-sm border border-rose-200 dark:border-rose-800/50 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-rose-500" />
                  </div>
                  <span className="text-xs font-medium text-rose-600 dark:text-rose-400">Image</span>
                </div>
                <div className="text-slate-300 dark:text-slate-600 text-xl font-bold">+</div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl shadow-sm border border-sky-200 dark:border-sky-800/50 flex items-center justify-center">
                    <Type className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="text-xs font-medium text-sky-600 dark:text-sky-400">Text</span>
                </div>
                <div className="text-slate-300 dark:text-slate-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Gemini</span>
                </div>
                <div className="text-slate-300 dark:text-slate-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800/50 flex items-center justify-center">
                    <FileJson className="w-6 h-6 text-amber-500" />
                  </div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Result</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} whileHover={{ scale: 1.01 }} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex-shrink-0">
              <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="w-full">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">API Integration</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Always call the Gemini API from the server to protect your API keys. Here's a basic example:
              </p>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-800">
                <pre className="text-sm text-blue-300 font-mono">
{`import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Hello, World!",
});

console.log(response.text);`}
                </pre>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
