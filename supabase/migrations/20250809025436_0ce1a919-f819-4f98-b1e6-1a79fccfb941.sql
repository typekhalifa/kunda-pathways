-- Fix the newsletter campaigns status constraint to include 'sending' and 'sent' statuses
DO $$
BEGIN
    -- Drop existing check constraint if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'newsletter_campaigns'::regclass 
        AND contype = 'c' 
        AND conname LIKE '%status%'
    ) THEN
        ALTER TABLE newsletter_campaigns DROP CONSTRAINT IF EXISTS newsletter_campaigns_status_check;
    END IF;
    
    -- Add new constraint with all valid statuses
    ALTER TABLE newsletter_campaigns 
    ADD CONSTRAINT newsletter_campaigns_status_check 
    CHECK (status IN ('draft', 'sending', 'sent', 'failed'));
END $$;