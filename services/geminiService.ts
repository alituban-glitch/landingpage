
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getChefRecommendation = async (userPreference: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User preference: "${userPreference}". You are "Chef Budi", a friendly Indonesian chef. Suggest a specific type of Nasi Goreng (like Nasi Goreng Kambing, Gila, or Seafood) based on the user's mood or preference. Keep it short, appetizing, and in Indonesian.`,
      config: {
        systemInstruction: "You are a professional chef specialized in Nasi Goreng. Your goal is to make the user hungry and recommend the perfect variant.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, Chef sedang sibuk di dapur. Tapi saya merekomendasikan Nasi Goreng Spesial kami!";
  }
};
