export type View = 'home' | 'learn' | 'gallery' | 'organize' | 'summarizer' | 'code-explainer' | 'resume' | 'travel' | 'translator' | 'email' | 'story' | 'sentiment' | 'settings' | 'effects';

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  prompt: string;
}
