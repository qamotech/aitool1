/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, Download } from 'lucide-react';
import { View } from './types';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { GalleryView } from './components/GalleryView';
import { OrganizeView } from './components/OrganizeView';
import { SettingsView } from './components/SettingsView';
import { GenericTextTool } from './components/tools/GenericTextTool';
import { EffectsView } from './components/EffectsView';
import { FileText, Code, FileBadge, Plane, Languages, Mail, BookHeart, Smile } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert("To install this app, select 'Add to Home Screen' from your browser menu.");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView key="home" setCurrentView={setCurrentView} />;
      case 'learn': return <LearnView key="learn" />;
      case 'gallery': return <GalleryView key="gallery" />;
      case 'organize': return <OrganizeView key="organize" />;
      case 'summarizer': return (
        <GenericTextTool
          key="summarizer"
          title="Text Summarizer"
          description="Paste a long article or text, and get a concise summary."
          icon={FileText}
          inputPlaceholder="Paste your long text here..."
          buttonText="Summarize"
          systemInstruction="You are an expert summarizer. Take the user's text and provide a concise, accurate summary highlighting the key points. Format the output with clear bullet points."
          isLargeInput={true}
          colorClass="text-indigo-500"
        />
      );
      case 'code-explainer': return (
        <GenericTextTool
          key="code-explainer"
          title="Code Explainer"
          description="Paste a block of code, and get a step-by-step plain-English explanation."
          icon={Code}
          inputPlaceholder="Paste your code snippet here..."
          buttonText="Explain Code"
          systemInstruction="You are a senior software engineer mentoring a junior. The user will provide a code snippet. Explain what the code does step-by-step in clear, easy-to-understand language. Also, mention any potential improvements or bugs if obvious."
          isLargeInput={true}
          colorClass="text-cyan-500"
        />
      );
      case 'resume': return (
        <GenericTextTool
          key="resume"
          title="Resume Tailorer"
          description="Provide a brief summary of your skills and a target job, and get a tailored bio/skills section."
          icon={FileBadge}
          inputPlaceholder="e.g. I am a frontend dev with React skills. Target: Senior Frontend Engineer at a startup..."
          buttonText="Tailor Resume"
          systemInstruction="You are an expert career coach. The user will provide their skills and a target job description. Write a compelling, professional professional summary (3-4 sentences) and a suggested list of top 5 bullet points to highlight on their resume."
          isLargeInput={true}
          colorClass="text-rose-500"
        />
      );
      case 'travel': return (
        <GenericTextTool
          key="travel"
          title="Travel Planner"
          description="Enter a destination and how many days, and get a suggested itinerary."
          icon={Plane}
          inputPlaceholder="e.g. 5 days in Kyoto, Japan"
          buttonText="Plan Trip"
          systemInstruction="You are a luxury travel concierge. Create a detailed, day-by-day itinerary for the requested destination and duration. Include realistic travel times, highly-rated restaurants, and a mix of popular and hidden-gem attractions. Format nicely with markdown."
          colorClass="text-sky-500"
        />
      );
      case 'translator': return (
        <GenericTextTool
          key="translator"
          title="Language Translator"
          description="Type a phrase and target language, and get a contextual translation."
          icon={Languages}
          inputPlaceholder="e.g. 'How much does this cost?' in Italian"
          buttonText="Translate"
          systemInstruction="You are an expert linguist and translator. The user will provide a phrase and a target language. Provide the direct translation, the romanized pronunciation (if applicable), and 1-2 cultural context tips or alternative ways to say it depending on formality."
          colorClass="text-fuchsia-500"
        />
      );
      case 'email': return (
        <GenericTextTool
          key="email"
          title="Email Drafter"
          description="Describe the purpose and tone of the email you want to send."
          icon={Mail}
          inputPlaceholder="e.g. Follow up on a job interview with Acme Corp, polite and enthusiastic tone."
          buttonText="Draft Email"
          systemInstruction="You are an executive assistant. Draft a professional, well-written email based on the user's instructions. Include placeholder brackets like [Name] for information that needs to be filled in. Keep it concise and action-oriented."
          isLargeInput={true}
          colorClass="text-orange-500"
        />
      );
      case 'story': return (
        <GenericTextTool
          key="story"
          title="Creative Story Writer"
          description="Give a small prompt, character, or setting, and get a short story."
          icon={BookHeart}
          inputPlaceholder="e.g. A detective who can only solve crimes while asleep."
          buttonText="Write Story"
          systemInstruction="You are an award-winning creative fiction author. Write a compelling, imaginative short story (around 400-500 words) based on the user's prompt. Focus on strong character development and vivid imagery."
          isLargeInput={true}
          colorClass="text-red-500"
        />
      );
      case 'sentiment': return (
        <GenericTextTool
          key="sentiment"
          title="Sentiment Analyzer"
          description="Paste a review, tweet, or message, and understand its emotional tone."
          icon={Smile}
          inputPlaceholder="Paste the text you want to analyze..."
          buttonText="Analyze"
          systemInstruction="You are an expert psychologist and data analyst. Analyze the sentiment of the provided text. State clearly if it is POSITIVE, NEGATIVE, or NEUTRAL. Then, provide a short 2-3 sentence breakdown of the underlying emotions, tone, and potential intent of the author."
          isLargeInput={true}
          colorClass="text-lime-500"
        />
      );
      case 'settings': return <SettingsView key="settings" />;
      case 'effects': return <EffectsView key="effects" />;
      default: return <HomeView key="home" setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100 flex">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstallClick}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium border border-blue-200 dark:border-blue-800"
            >
              <Download size={16} />
              <span>Install App</span>
            </motion.button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {renderView()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
