import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

/**
 * Sends a code snippet to the Gemini API and returns AI-generated
 * title, description, and tags.
 */
export const analyzeSnippet = async (code) => {
  const prompt = `You are a developer assistant. Analyze the following code snippet and respond with ONLY a valid JSON object — no markdown, no code fences, just the raw JSON.

The JSON must have exactly these fields:
{
  "title": "A short, descriptive title for this snippet (max 5 words)",
  "desc": "A one-sentence description of what this code does",
  "tags": ["tag1", "tag2", "tag3"]
}

Tags should include the programming language (e.g. "javascript", "python", "sql", "html", "css") and relevant concepts (e.g. "hook", "utility", "async", "sorting").

Code snippet:
\`\`\`
${code}
\`\`\``;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip any accidental markdown code fences from the response
  const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      title: parsed.title || 'Code Snippet',
      desc: parsed.desc || 'A useful code snippet.',
      tags: Array.isArray(parsed.tags) ? parsed.tags : ['code'],
    };
  } catch {
    // Fallback if JSON parsing fails
    return {
      title: 'Code Snippet',
      desc: 'A useful code snippet.',
      tags: ['code'],
    };
  }
};
