ALTER TABLE `hackathon` ADD `round1_ppt_url` text;--> statement-breakpoint
ALTER TABLE `hackathon` ADD `round1_submitted_at` integer;--> statement-breakpoint
ALTER TABLE `hackathon` ADD `round1_status` text DEFAULT 'not_submitted';