ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'STAFF';

ALTER TABLE "RoleDefinition" ADD COLUMN IF NOT EXISTS "homePath" TEXT NOT NULL DEFAULT '/my-tasks';

ALTER TABLE "RoleDefinition" DROP COLUMN IF EXISTS "baseRole";

ALTER TABLE "EssentialTask" ADD COLUMN IF NOT EXISTS "assignedUserId" TEXT;

CREATE INDEX IF NOT EXISTS "EssentialTask_assignedUserId_idx" ON "EssentialTask"("assignedUserId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'EssentialTask_assignedUserId_fkey'
  ) THEN
    ALTER TABLE "EssentialTask"
      ADD CONSTRAINT "EssentialTask_assignedUserId_fkey"
      FOREIGN KEY ("assignedUserId") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
