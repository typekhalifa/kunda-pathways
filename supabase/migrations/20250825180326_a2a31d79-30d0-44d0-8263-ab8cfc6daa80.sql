-- Add missing columns to packages table for auto-generated package configurations
ALTER TABLE packages 
ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT 29,
ADD COLUMN IF NOT EXISTS is_auto_generated boolean DEFAULT false;