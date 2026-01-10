-- Create characters table for storing user-generated characters
-- Run this SQL in your Supabase SQL Editor (https://app.supabase.com/project/YOUR_PROJECT/sql)

CREATE TABLE IF NOT EXISTS characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic character info
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  setting TEXT NOT NULL,
  relationship TEXT NOT NULL,
  
  -- Personality sliders (0-100)
  personality_warmth INTEGER NOT NULL DEFAULT 50,
  personality_confidence INTEGER NOT NULL DEFAULT 50,
  personality_calmness INTEGER NOT NULL DEFAULT 50,
  personality_reserve INTEGER NOT NULL DEFAULT 50,
  
  -- Optional style settings
  backstory_style TEXT,
  speech_tone TEXT,
  speech_vocabulary TEXT,
  speech_patterns TEXT,
  content_rating TEXT,
  topics TEXT,
  tone TEXT,
  
  -- Generated content
  generated_personality TEXT,
  generated_backstory TEXT,
  generated_traits TEXT,
  generated_speech TEXT,
  generated_initial_message TEXT,
  generated_scenario TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster user queries
CREATE INDEX IF NOT EXISTS characters_user_id_idx ON characters(user_id);
CREATE INDEX IF NOT EXISTS characters_created_at_idx ON characters(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only view their own characters
CREATE POLICY "Users can view their own characters" ON characters
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own characters
CREATE POLICY "Users can insert their own characters" ON characters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own characters
CREATE POLICY "Users can update their own characters" ON characters
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own characters
CREATE POLICY "Users can delete their own characters" ON characters
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_characters_updated_at ON characters;
CREATE TRIGGER update_characters_updated_at
  BEFORE UPDATE ON characters
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
