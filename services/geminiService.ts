
import { GoogleGenAI, Type } from "@google/genai";
import { CharacterState, GeneratedProfile } from "../types";

export const generateCharacterProfile = async (char: CharacterState): Promise<GeneratedProfile> => {
  // Creating instance right before call to ensure API key freshness
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const prompt = `Act as a world-class anime narrative designer. Create a sophisticated, high-fidelity character profile.
  Focus on high-quality anime tropes (Ufotable/MAPPA style depth). 
  
  CORE PARAMETERS:
  - Name: ${char.name}
  - Stage: ${char.age}
  - Essence: ${char.gender}
  - Context: ${char.setting}
  - Connection: ${char.relationship}
  
  NEURAL MATRIX (0-100%):
  - Warmth/Coldness: ${char.personality.warmth}% (Stoicism level)
  - Confidence: ${char.personality.confidence}% (Dominance level)
  - Calmness/Chaos: ${char.personality.calmness}% (Entropy level)
  - Expression: ${char.personality.reserve}% (Mystery level)
  
  INSTRUCTIONS:
  Include characteristic anime tropes (e.g., Ara Ara, Tsundere, Kuudere, charismatic sensei, elegant matron).
  The output must be evocative, professional, and consistent with the world setting. Use Japanese honorifics where appropriate.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Upgraded to Pro for production-level reasoning
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }, // Enable thinking for better trope integration
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Professional anime archetype title" },
            personalitySummary: { type: Type.STRING, description: "Deep psychological analysis including behavioral tropes" },
            backstory: { type: Type.STRING, description: "Rich world-integrated history" },
            speechMannerisms: {
              type: Type.OBJECT,
              properties: {
                tone: { type: Type.STRING },
                vocabulary: { type: Type.STRING },
                quote: { type: Type.STRING }
              },
              required: ["tone", "vocabulary", "quote"]
            },
            sampleFirstMessage: { type: Type.STRING }
          },
          required: ["title", "personalitySummary", "backstory", "speechMannerisms", "sampleFirstMessage"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Neural response empty.");
    return JSON.parse(text.trim()) as GeneratedProfile;
  } catch (err) {
    console.error("AniSoul Matrix Error:", err);
    throw err;
  }
};
