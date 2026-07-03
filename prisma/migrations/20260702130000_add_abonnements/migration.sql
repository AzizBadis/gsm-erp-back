CREATE TYPE "AbonnementStatus" AS ENUM ('ACTIVE', 'PAUSED', 'EXPIRED', 'CANCELLED');

CREATE TABLE "Abonnement" (
  "id" TEXT NOT NULL,
  "contactId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "endsAt" TIMESTAMP(3) NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "status" "AbonnementStatus" NOT NULL DEFAULT 'ACTIVE',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Abonnement_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Abonnement_contactId_idx" ON "Abonnement"("contactId");
CREATE INDEX "Abonnement_startsAt_idx" ON "Abonnement"("startsAt");
CREATE INDEX "Abonnement_endsAt_idx" ON "Abonnement"("endsAt");
CREATE INDEX "Abonnement_status_idx" ON "Abonnement"("status");

ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
