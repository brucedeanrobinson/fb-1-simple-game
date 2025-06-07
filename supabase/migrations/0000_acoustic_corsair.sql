CREATE TABLE "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"current_player" text NOT NULL,
	"end_state" text,
	"board" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
