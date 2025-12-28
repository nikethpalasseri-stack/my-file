
import { GoogleGenAI, Type } from "@google/genai";
import { StudyNote } from "./types";

// Always initialize with the direct named parameter for apiKey.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudyNotes = async (courseTitle: string, topic: string): Promise<StudyNote> => {
  const prompt = `Generate comprehensive study notes for an M.Sc. Chemistry student on the topic: "${topic}" within the course "${courseTitle}". 
  Provide a detailed summary, key points for quick revision, crucial exam tips, and 3-4 reputable academic reference links (like LibreTexts, ACS, or ResearchGate).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            examTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            references: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING }
                },
                required: ["title", "url"]
              }
            }
          },
          required: ["title", "summary", "keyPoints", "examTips", "references"]
        }
      }
    });

    // Directly access the .text property on the GenerateContentResponse object.
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating study notes:", error);
    throw error;
  }
};
