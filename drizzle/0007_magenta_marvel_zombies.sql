CREATE TABLE `event_faq` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`category_id` text,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`order` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `event_faq_category`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `event_faq_category` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event_payment_config` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`payment_required` integer DEFAULT false NOT NULL,
	`amount` text,
	`currency` text DEFAULT 'INR',
	`upi_ids` text DEFAULT '[]',
	`qr_code_url` text,
	`bank_details` text,
	`payment_instructions` text,
	`payment_deadline` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_payment_config_event_id_unique` ON `event_payment_config` (`event_id`);--> statement-breakpoint
CREATE TABLE `event_phase` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`phase_number` integer NOT NULL,
	`start_date` integer,
	`end_date` integer,
	`is_active` integer DEFAULT false NOT NULL,
	`requires_previous_phase` integer DEFAULT true,
	`instructions` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event_resource` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`file_url` text NOT NULL,
	`file_name` text NOT NULL,
	`file_size` integer,
	`access_level` text DEFAULT 'public' NOT NULL,
	`phase_id` text,
	`order` integer DEFAULT 0,
	`uploaded_by` text,
	`download_count` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`uploaded_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `phase_form` (
	`id` text PRIMARY KEY NOT NULL,
	`phase_id` text NOT NULL,
	`event_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`form_schema` text NOT NULL,
	`allow_multiple` integer DEFAULT false,
	`submission_deadline` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`phase_id`) REFERENCES `event_phase`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `phase_submission` (
	`id` text PRIMARY KEY NOT NULL,
	`phase_form_id` text NOT NULL,
	`phase_id` text NOT NULL,
	`event_id` text NOT NULL,
	`registration_id` text NOT NULL,
	`user_id` text NOT NULL,
	`responses` text NOT NULL,
	`file_urls` text,
	`status` text DEFAULT 'submitted' NOT NULL,
	`score` integer,
	`feedback` text,
	`reviewed_by` text,
	`reviewed_at` integer,
	`submitted_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`phase_form_id`) REFERENCES `phase_form`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`phase_id`) REFERENCES `event_phase`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`registration_id`) REFERENCES `registration`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewed_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `event_form` ADD `form_image` text;