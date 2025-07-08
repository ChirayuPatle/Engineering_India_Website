CREATE TABLE `membership_form` (
	`id` text PRIMARY KEY DEFAULT uuid() NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`year` text NOT NULL,
	`branch` text NOT NULL,
	`email` text NOT NULL,
	`area_of_interest` text NOT NULL,
	`engaged_in_other_club` integer NOT NULL,
	`previous_experience` text,
	`reason_to_join` text NOT NULL,
	`event_ideas` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
