import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from '../constants';

// Initialize the Gemini client
// Note: In a real production app, never expose keys in client code.
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const generateStudyTip = async (topic: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `I am learning Data Engineering. Give me a concise, high-impact study tip or a "gotcha" to avoid regarding the topic: "${topic}". Keep it under 50 words.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Keep pushing forward! Consistency is key.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Study Tip: Focus on understanding the 'Why', not just the 'How'.";
  }
};

export const explainConcept = async (concept: string): Promise<string> => {
    try {
      const model = 'gemini-2.5-flash';
      const prompt = `Explain the data engineering concept "${concept}" simply, as if I am a junior engineer. Include a real-world use case.`;
  
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
  
      return response.text || "Could not generate explanation.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Unable to connect to AI tutor at the moment.";
    }
  };

export const generateQuiz = async (topic: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a single multiple-choice question about "${topic}" for a Data Engineer. Format: Question, Options, Correct Answer, Explanation.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Quiz generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate quiz.";
  }
};