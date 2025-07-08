DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "ticket_ticket_code_unique";--> statement-breakpoint
ALTER TABLE `payment` ALTER COLUMN "amount" TO "amount" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `ticket_ticket_code_unique` ON `ticket` (`ticket_code`);--> statement-breakpoint
ALTER TABLE `payment` ADD `user_id` text NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `payment` ADD `event_id` text NOT NULL REFERENCES event(id);--> statement-breakpoint
ALTER TABLE `payment` ADD `rejected` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `payment` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `registration` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `registration` ADD `updated_at` integer NOT NULL;