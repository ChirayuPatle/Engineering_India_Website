-- Fix corrupted data in hackathon table where column names were stored as values
UPDATE `hackathon` 
SET 
  `round1_ppt_url` = NULL,
  `round1_status` = 'not_submitted',
  `round1_submitted_at` = NULL
WHERE 
  `round1_ppt_url` = 'round1_ppt_url' 
  OR `round1_status` = 'round1_status';
