
export interface CharacterState {
  name: string;
  age: string;
  gender: string;
  setting: string;
  relationship: string;
  personality: {
    warmth: number; // 0 (Warm) to 100 (Cold)
    confidence: number; // 0 (Shy) to 100 (Confident)
    calmness: number; // 0 (Calm) to 100 (Chaotic)
    reserve: number; // 0 (Emotional) to 100 (Reserved)
  };
  generatedProfile?: GeneratedProfile;
}

export interface GeneratedProfile {
  title: string;
  personalitySummary: string;
  backstory: string;
  speechMannerisms: {
    tone: string;
    vocabulary: string;
    quote: string;
  };
  sampleFirstMessage: string;
}

export interface PromptSettings {
  compositionType: string;
  isSfw: boolean;
  artStyle: string;
  environment: string;
  cameraLens: string;
  lighting: string;
}
