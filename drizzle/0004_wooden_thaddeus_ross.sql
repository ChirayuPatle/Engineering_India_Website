PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_membership_form` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`year` text NOT NULL,
	`branch` text NOT NULL,
	`email` text NOT NULL,
	`area_of_interest` text,
	`engaged_in_other_club` integer NOT NULL,
	`previous_experience` text,
	`reason_to_join` text NOT NULL,
	`event_ideas` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_membership_form`("id", "user_id", "name", "year", "branch", "email", "area_of_interest", "engaged_in_other_club", "previous_experience", "reason_to_join", "event_ideas", "created_at") SELECT "id", "user_id", "name", "year", "branch", "email", "area_of_interest", "engaged_in_other_club", "previous_experience", "reason_to_join", "event_ideas", "created_at" FROM `membership_form`;--> statement-breakpoint
DROP TABLE `membership_form`;--> statement-breakpoint
ALTER TABLE `__new_membership_form` RENAME TO `membership_form`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `membership_form_email_unique` ON `membership_form` (`email`);