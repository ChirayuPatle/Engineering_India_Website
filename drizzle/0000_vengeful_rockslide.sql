CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`phone` text,
	`college_name` text,
	`year` text,
	`branch` text,
	`role` text DEFAULT 'USER' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`start_date` integer,
	`end_date` integer,
	`timeline` text,
	`prizes` text,
	`faqs` text,
	`organizer_contact` text,
	`co_organizer_contact` text,
	`discord_link` text,
	`whatsapp_link` text,
	`banner_image` text,
	`gallery` text,
	`details` text,
	`rules` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`id` text PRIMARY KEY NOT NULL,
	`registration_id` text NOT NULL,
	`transaction_id` text,
	`sender_name` text,
	`amount` text,
	`verified` integer DEFAULT false NOT NULL,
	`verified_by` text,
	`verified_at` integer,
	`payment_date` integer,
	FOREIGN KEY (`registration_id`) REFERENCES `registration`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`verified_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `registration` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`user_id` text,
	`team_id` text,
	`form_data` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`registered_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ticket` (
	`id` text PRIMARY KEY NOT NULL,
	`registration_id` text NOT NULL,
	`ticket_code` text NOT NULL,
	`qr_code` text,
	`generated_at` integer NOT NULL,
	FOREIGN KEY (`registration_id`) REFERENCES `registration`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ticket_ticket_code_unique` ON `ticket` (`ticket_code`);