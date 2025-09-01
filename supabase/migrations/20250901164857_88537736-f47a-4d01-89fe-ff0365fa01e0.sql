-- Enable password strength and leaked password protection for better security
ALTER SYSTEM SET password_encryption = 'scram-sha-256';

-- Update auth configuration to enable leaked password protection
UPDATE auth.config 
SET config = jsonb_set(
  COALESCE(config, '{}'::jsonb),
  '{security, password_strength}',
  '{"enabled": true, "min_length": 8, "require_upper": true, "require_lower": true, "require_numbers": true, "require_symbols": true, "hibp_enabled": true}'::jsonb
);