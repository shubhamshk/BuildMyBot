import { createClient } from './client';

export interface SavedCharacter {
  id: string;
  user_id: string;
  name: string;
  age: string;
  gender: string;
  setting: string;
  relationship: string;
  personality_warmth: number;
  personality_confidence: number;
  personality_calmness: number;
  personality_reserve: number;
  backstory_style?: string;
  speech_tone?: string;
  speech_vocabulary?: string;
  speech_patterns?: string;
  content_rating?: string;
  topics?: string;
  tone?: string;
  generated_personality?: string;
  generated_backstory?: string;
  generated_traits?: string;
  generated_speech?: string;
  generated_initial_message?: string;
  generated_scenario?: string;
  created_at: string;
  updated_at: string;
}

export interface CharacterInput {
  name: string;
  age: string;
  gender: string;
  setting: string;
  relationship: string;
  personality: {
    warmth: number;
    confidence: number;
    calmness: number;
    reserve: number;
  };
  backstoryStyle?: string;
  speechRules?: {
    tone?: string;
    vocabulary?: string;
    patterns?: string;
  };
  boundaries?: {
    contentRating?: string;
    topics?: string;
    tone?: string;
  };
  generatedContent?: {
    personality?: string;
    backstory?: string;
    traits?: string;
    speech?: string;
    initialMessage?: string;
    scenario?: string;
  };
}

// Save a character to Supabase
export async function saveCharacter(character: CharacterInput): Promise<{ data: SavedCharacter | null; error: string | null }> {
  const supabase = createClient();
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { data: null, error: 'User not authenticated' };
  }

  const characterData = {
    user_id: user.id,
    name: character.name,
    age: character.age,
    gender: character.gender,
    setting: character.setting,
    relationship: character.relationship,
    personality_warmth: character.personality.warmth,
    personality_confidence: character.personality.confidence,
    personality_calmness: character.personality.calmness,
    personality_reserve: character.personality.reserve,
    backstory_style: character.backstoryStyle || null,
    speech_tone: character.speechRules?.tone || null,
    speech_vocabulary: character.speechRules?.vocabulary || null,
    speech_patterns: character.speechRules?.patterns || null,
    content_rating: character.boundaries?.contentRating || null,
    topics: character.boundaries?.topics || null,
    tone: character.boundaries?.tone || null,
    generated_personality: character.generatedContent?.personality || null,
    generated_backstory: character.generatedContent?.backstory || null,
    generated_traits: character.generatedContent?.traits || null,
    generated_speech: character.generatedContent?.speech || null,
    generated_initial_message: character.generatedContent?.initialMessage || null,
    generated_scenario: character.generatedContent?.scenario || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('characters')
    .insert(characterData)
    .select()
    .single();

  if (error) {
    console.error('Error saving character:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

// Get all characters for the current user
export async function getUserCharacters(): Promise<{ data: SavedCharacter[]; error: string | null }> {
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { data: [], error: 'User not authenticated' };
  }

  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching characters:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [], error: null };
}

// Get a single character by ID
export async function getCharacterById(characterId: string): Promise<{ data: SavedCharacter | null; error: string | null }> {
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { data: null, error: 'User not authenticated' };
  }

  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('id', characterId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching character:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

// Update a character
export async function updateCharacterById(
  characterId: string,
  updates: Partial<CharacterInput>
): Promise<{ data: SavedCharacter | null; error: string | null }> {
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { data: null, error: 'User not authenticated' };
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (updates.name) updateData.name = updates.name;
  if (updates.age) updateData.age = updates.age;
  if (updates.gender) updateData.gender = updates.gender;
  if (updates.setting) updateData.setting = updates.setting;
  if (updates.relationship) updateData.relationship = updates.relationship;
  if (updates.personality) {
    updateData.personality_warmth = updates.personality.warmth;
    updateData.personality_confidence = updates.personality.confidence;
    updateData.personality_calmness = updates.personality.calmness;
    updateData.personality_reserve = updates.personality.reserve;
  }
  if (updates.backstoryStyle) updateData.backstory_style = updates.backstoryStyle;
  if (updates.speechRules) {
    updateData.speech_tone = updates.speechRules.tone;
    updateData.speech_vocabulary = updates.speechRules.vocabulary;
    updateData.speech_patterns = updates.speechRules.patterns;
  }
  if (updates.boundaries) {
    updateData.content_rating = updates.boundaries.contentRating;
    updateData.topics = updates.boundaries.topics;
    updateData.tone = updates.boundaries.tone;
  }
  if (updates.generatedContent) {
    updateData.generated_personality = updates.generatedContent.personality;
    updateData.generated_backstory = updates.generatedContent.backstory;
    updateData.generated_traits = updates.generatedContent.traits;
    updateData.generated_speech = updates.generatedContent.speech;
    updateData.generated_initial_message = updates.generatedContent.initialMessage;
    updateData.generated_scenario = updates.generatedContent.scenario;
  }

  const { data, error } = await supabase
    .from('characters')
    .update(updateData)
    .eq('id', characterId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating character:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

// Delete a character
export async function deleteCharacter(characterId: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: 'User not authenticated' };
  }

  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', characterId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting character:', error);
    return { error: error.message };
  }

  return { error: null };
}

// Get current user
export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    return { user: null, error: error.message };
  }
  
  return { user, error: null };
}

// Convert SavedCharacter to CharacterInput format for use in context
export function savedCharacterToInput(saved: SavedCharacter): CharacterInput {
  return {
    name: saved.name,
    age: saved.age,
    gender: saved.gender,
    setting: saved.setting,
    relationship: saved.relationship,
    personality: {
      warmth: saved.personality_warmth,
      confidence: saved.personality_confidence,
      calmness: saved.personality_calmness,
      reserve: saved.personality_reserve,
    },
    backstoryStyle: saved.backstory_style || undefined,
    speechRules: {
      tone: saved.speech_tone || undefined,
      vocabulary: saved.speech_vocabulary || undefined,
      patterns: saved.speech_patterns || undefined,
    },
    boundaries: {
      contentRating: saved.content_rating || undefined,
      topics: saved.topics || undefined,
      tone: saved.tone || undefined,
    },
    generatedContent: {
      personality: saved.generated_personality || undefined,
      backstory: saved.generated_backstory || undefined,
      traits: saved.generated_traits || undefined,
      speech: saved.generated_speech || undefined,
      initialMessage: saved.generated_initial_message || undefined,
      scenario: saved.generated_scenario || undefined,
    },
  };
}
