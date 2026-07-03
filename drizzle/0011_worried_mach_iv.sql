PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_hackathon` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text,
	`user_id` text NOT NULL,
	`team_name` text NOT NULL,
	`team_leader_name` text NOT NULL,
	`team_leader_email` text NOT NULL,
	`team_leader_phone` text NOT NULL,
	`team_leader_gender` text NOT NULL,
	`institute` text NOT NULL,
	`branch` text NOT NULL,
	`year` text NOT NULL,
	`team_members` text,
	`payment_screenshot` text,
	`transaction_id` text,
	`declaration_accepted` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_hackathon`("id", "event_id", "user_id", "team_name", "team_leader_name", "team_leader_email", "team_leader_phone", "team_leader_gender", "institute", "branch", "year", "team_members", "payment_screenshot", "transaction_id", "declaration_accepted", "status", "created_at", "updated_at") SELECT "id", "event_id", "user_id", "team_name", "team_leader_name", "team_leader_email", "team_leader_phone", "team_leader_gender", "institute", "branch", "year", "team_members", "payment_screenshot", "transaction_id", "declaration_accepted", "status", "created_at", "updated_at" FROM `hackathon`;--> statement-breakpoint
DROP TABLE `hackathon`;--> statement-breakpoint
ALTER TABLE `__new_hackathon` RENAME TO `hackathon`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `hackathon_team_name_unique` ON `hackathon` (`team_name`);