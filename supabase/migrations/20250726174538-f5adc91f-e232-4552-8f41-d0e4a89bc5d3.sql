-- Update any services with 'additional' category to 'extra-services'
UPDATE services 
SET category = 'extra-services' 
WHERE category = 'additional';