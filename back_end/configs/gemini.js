import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { generarPromptAnalisis } from '../prompts/generarPromptAnalisis.js';
import { parseJSONSafe } from '../utils/parseJSONSafe.js';
dotenv.config()
export const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const checkGeminiAPI = () => {
    if ( !process.env.GEMINI_API_KEY) {
      console.error("Error: env file missing the Gemini API KEY");
      process.exit(1);
    }
}

