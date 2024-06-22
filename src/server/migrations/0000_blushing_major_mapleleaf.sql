CREATE TABLE `people` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date_of_birth` text,
	`salutation` text,
	`meta_data` text,
	`relation_id` text DEFAULT '[]' NOT NULL,
	`additional_info` text,
	`image` text,
	`email` text,
	`gender` text NOT NULL,
	`mobile` text,
	`extended_family` integer,
	`family_relation` text,
	`company` text,
	`social_link` text,
	`ex` integer,
	`created_at` text DEFAULT 'Sat Jun 22 2024' NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`relation_id`) REFERENCES `relations`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `relations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`chapter` text,
	`created_at` integer DEFAULT '"2024-06-22T16:21:58.010Z"' NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT '"2024-06-22T16:21:58.024Z"' NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);