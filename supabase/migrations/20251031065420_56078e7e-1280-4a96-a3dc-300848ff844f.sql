-- Create conversations table for Aria learning
CREATE TABLE IF NOT EXISTS public.aria_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  is_bot BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_aria_conversations_session ON public.aria_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_aria_conversations_created ON public.aria_conversations(created_at DESC);

-- Enable RLS
ALTER TABLE public.aria_conversations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert conversations (public chatbot)
CREATE POLICY "Anyone can insert conversations" ON public.aria_conversations
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read conversations (for context)
CREATE POLICY "Anyone can read conversations" ON public.aria_conversations
  FOR SELECT USING (true);