CREATE TABLE "users" (
	"uuid" integer PRIMARY KEY NOT NULL,
	"profile_image" text NOT NULL,
	"is_male" boolean NOT NULL,
	"nickname" text NOT NULL,
	"student_number" integer NOT NULL,
	"major" text NOT NULL,
	"age" integer NOT NULL,
	"gender" text NOT NULL,
	"nationality" text NOT NULL,
	"mbti" integer NOT NULL,
	"preferences" jsonb NOT NULL,
	"introduction" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
