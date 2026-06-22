-- AlterTable
ALTER TABLE "Repair" ADD COLUMN     "repairTypeId" TEXT;

-- CreateTable
CREATE TABLE "RepairType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "commissionRate" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "managedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicianStatusMapping" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicianStatusMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicianCommission" (
    "id" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "repairId" TEXT NOT NULL,
    "repairTypeId" TEXT,
    "commissionBrute" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "deductionRetour" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "deductionPerte" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "commissionNette" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicianCommission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepairType_name_key" ON "RepairType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicianStatusMapping_event_status_key" ON "TechnicianStatusMapping"("event", "status");

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_repairTypeId_fkey" FOREIGN KEY ("repairTypeId") REFERENCES "RepairType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicianCommission" ADD CONSTRAINT "TechnicianCommission_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicianCommission" ADD CONSTRAINT "TechnicianCommission_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "Repair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicianCommission" ADD CONSTRAINT "TechnicianCommission_repairTypeId_fkey" FOREIGN KEY ("repairTypeId") REFERENCES "RepairType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
