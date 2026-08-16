import { Idea } from './types';

export const ideas: Idea[] = [
  {
    id: '1',
    title: 'Meeting Notes Summarizer',
    description: 'Automatically condense long transcripts into bullet points with actionable next steps.',
    tags: ['Productivity', 'Text', 'Gemini'],
    prompt: 'Summarize the following meeting transcript. Provide a 2-3 sentence overview, followed by a bulleted list of key decisions and a section for action items assigned to individuals.'
  },
  {
    id: '2',
    title: 'Code Refactoring Assistant',
    description: 'Get suggestions to improve code readability, performance, and security.',
    tags: ['Development', 'Code', 'Gemini'],
    prompt: 'Review the following code snippet. Suggest improvements for readability, modern syntax, and potential performance optimizations. Please provide the refactored code and explain the changes.'
  },
  {
    id: '3',
    title: 'Creative Story Generator',
    description: 'Input a genre and character, and get a short creative story.',
    tags: ['Creative', 'Text', 'Gemini'],
    prompt: 'Write a short science fiction story about a time-traveling historian who accidentally leaves their smartphone in ancient Rome. Keep the tone lighthearted and humorous.'
  },
  {
    id: '4',
    title: 'Recipe from Ingredients (Vision)',
    description: 'Take a picture of your fridge, and get recipe suggestions based on what you have.',
    tags: ['Food', 'Vision', 'Gemini'],
    prompt: 'Based on the items visible in this image of a refrigerator, suggest three distinct recipes I could make. For each recipe, list the ingredients needed and a brief set of instructions.'
  },
  {
    id: '5',
    title: 'Language Translator & Tutor',
    description: 'Translate text and get cultural context or grammar explanations.',
    tags: ['Education', 'Language', 'Gemini'],
    prompt: 'Translate the following English phrase into Japanese: "Where is the nearest train station?". Also provide the romanization (romaji), and explain any grammar rules or cultural context useful for a traveler.'
  },
  {
    id: '6',
    title: 'UI Component Generator',
    description: 'Describe a component, and generate the React/Tailwind code.',
    tags: ['Design', 'Code', 'Gemini'],
    prompt: 'Generate a React functional component for a modern pricing table using Tailwind CSS. It should have three tiers (Basic, Pro, Enterprise), highlight the Pro tier, and be fully responsive.'
  }
];
