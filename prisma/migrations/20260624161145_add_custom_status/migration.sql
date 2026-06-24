/*
  Warnings:

  - The `status` column on the `Repair` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Repair" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'RECEIVED';

-- CreateTable
CREATE TABLE "CustomStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#94a3b8',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomStatus_name_key" ON "CustomStatus"("name");
