ALTER TABLE "subjects" RENAME COLUMN "department-id" TO "department_id";--> statement-breakpoint
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_department-id_departments_id_fk";
--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE restrict ON UPDATE no action;