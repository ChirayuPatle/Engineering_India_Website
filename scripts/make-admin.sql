-- Make a user an ADMIN
-- Replace 'your@email.com' with the actual email address

-- Option 1: Update by email
UPDATE user 
SET role = 'ADMIN' 
WHERE email = 'your@email.com';

-- Option 2: Update by user ID
UPDATE user 
SET role = 'ADMIN' 
WHERE id = 'user_id_here';

-- Verify the change
SELECT id, name, email, role 
FROM user 
WHERE email = 'your@email.com';

-- View all admins
SELECT id, name, email, role, created_at 
FROM user 
WHERE role = 'ADMIN';

-- Make a user a MODERATOR
UPDATE user 
SET role = 'MODERATOR' 
WHERE email = 'moderator@email.com';

-- Reset user to regular USER role
UPDATE user 
SET role = 'USER' 
WHERE email = 'regular@email.com';
