import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Route for generating LinkedIn Post with Gemini API
app.post('/api/generate-post', async (req, res) => {
  try {
    const { tone, event, notes, authorName = 'Sarah Lin' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.startsWith('MY_')) {
      // If API key is not yet set or is a placeholder, return immediately so client fallback activates seamlessly
      return res.json({ post: null, note: 'Placeholder or no API key, using smart local templates' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an elite LinkedIn thought-leadership copywriter specializing in viral tech event posts.
Generate a captivating, authentic, high-impact LinkedIn post based on these details:

Attendee Name: ${authorName}
Event Name: ${event?.name || 'Google H2S Bootcamp 2025'}
Event Host / Organizer: ${event?.organizer || 'Google for Developers'}
Tone of Voice: ${tone || 'grateful'} (Options: grateful, professional, takeaways, excited)
Attendee Personal Highlights & What They Learned: ${notes || event?.guidancePrompt || ''}
Official Event Hashtags to incorporate: ${(event?.hashtags || []).join(' ')}

Tone instructions:
- 'grateful': Warm, genuine mentor appreciation, community excitement, tagging @${event?.organizer || 'Google for Developers'}.
- 'professional': Executive, structured, emphasizing technical scalability, architecture decisions, and business impact.
- 'takeaways': Structured bullet points with 💡 or 1️⃣ 2️⃣ 3️⃣ emojis highlighting deep engineering lessons.
- 'excited': High-octane momentum, hackathon energy, celebratory emojis (🚀⚡🔥), demo day excitement.

Formatting rules:
- Format cleanly with paragraph breaks.
- Tag @${event?.organizer || 'Google for Developers'} naturally in the body.
- End with the official event hashtags.
- Do NOT include placeholder tokens like [Your Name] or [Link]. Return ONLY the final ready-to-publish post text.`;

    // Timeout protection for API call (max 5s)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Generation timeout')), 5000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);
    const postText = (response as any).text?.trim();
    return res.json({ post: postText });
  } catch (error: any) {
    console.error('Gemini post generation error:', error);
    return res.json({ post: null, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In development mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EventPulse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
