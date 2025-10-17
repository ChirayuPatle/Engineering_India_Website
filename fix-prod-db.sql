-- Fix production database schema issues
-- This script manually handles the index that's causing issues

-- Drop the problematic index if it exists (ignore errors if it doesn't)
DROP INDEX IF EXISTS event_form_event_id_unique;

-- Recreate the unique constraint on event_id
CREATE UNIQUE INDEX IF NOT EXISTS event_form_event_id_unique ON event_form(event_id);
