import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || 'You are a helpful AI assistant.',
        }
      });

      res.json({ result: response.text });
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  });

  app.post('/api/gemini/vision', async (req, res) => {
    try {
      const { image, prompt } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: 'Image is required' });
      }

      // Expected image format: data:image/png;base64,...
      const match = image.match(/^data:(image\/[a-zA-Z]*);base64,(.*)$/);
      if (!match) {
        return res.status(400).json({ error: 'Invalid image format' });
      }

      const mimeType = match[1];
      const base64Data = match[2];

      const imagePart = {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      };

      const textPart = {
        text: prompt || 'Analyze this image and provide suggestions on how to reorganize these items for better productivity and aesthetics. Be structured and calm in your response.',
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction: 'You are a helpful, calm, and highly organized assistant. Your goal is to look at the items in the picture provided by the user and suggest creative, clean, and practical ways to reorganize or utilize them.',
        }
      });

      res.json({ result: response.text });
    } catch (error) {
      console.error('Error calling Gemini Vision API:', error);
      res.status(500).json({ error: 'Failed to analyze image' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
