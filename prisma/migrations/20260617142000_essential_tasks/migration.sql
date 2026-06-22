-- CreateEnum
CREATE TYPE "EssentialTaskStatus" AS ENUM ('NEW', 'DONE');

-- CreateEnum
CREATE TYPE "EssentialTaskPriority" AS ENUM ('MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "EssentialTask" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "EssentialTaskStatus" NOT NULL DEFAULT 'NEW',
    "priority" "EssentialTaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "estimatedHours" TEXT,
    "assignedTo" TEXT NOT NULL,
    "documents" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssentialTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EssentialTask_reference_key" ON "EssentialTask"("reference");
