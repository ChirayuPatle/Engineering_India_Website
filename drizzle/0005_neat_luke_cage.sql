CREATE TABLE `event_form` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`form_schema` text NOT NULL,
	`title` text,
	`description` text,
	`success_message` text DEFAULT 'Thank you for registering!',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_form_event_id_unique` ON `event_form` (`event_id`);--> statement-breakpoint
CREATE TABLE `form_analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`form_id` text NOT NULL,
	`event_id` text NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`submissions` integer DEFAULT 0 NOT NULL,
	`date` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`form_id`) REFERENCES `event_form`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `form_submission` (
	`id` text PRIMARY KEY NOT NULL,
	`form_id` text NOT NULL,
	`event_id` text NOT NULL,
	`user_id` text,
	`responses` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`admin_notes` text,
	`submitted_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`form_id`) REFERENCES `event_form`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
