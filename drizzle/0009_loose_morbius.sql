ALTER TABLE `hackathon` ADD `branch` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `hackathon_team_name_unique` ON `hackathon` (`team_name`);--> statement-breakpoint
ALTER TABLE `hackathon` DROP COLUMN `department`;--> statement-breakpoint
ALTER TABLE `hackathon` DROP COLUMN `track`;--> statement-breakpoint
ALTER TABLE `hackathon` DROP COLUMN `idea_description`;--> statement-breakpoint
ALTER TABLE `hackathon` DROP COLUMN `github_link`;--> statement-breakpoint
ALTER TABLE `hackathon` DROP COLUMN `previous_experience`;