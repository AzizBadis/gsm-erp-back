ALTER TABLE "Repair" ADD COLUMN "simNumber" TEXT,
ADD COLUMN "gpsIdentifier" TEXT,
ADD COLUMN "clientCode" TEXT,
ADD COLUMN "checklist" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "gpsModelId" TEXT,
ADD COLUMN "operatorId" TEXT;

ALTER TABLE "Invoice" ADD COLUMN "employeeId" TEXT;

CREATE TABLE "GpsModel" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "GpsModel_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "GpsModel_name_key" ON "GpsModel"("name");

CREATE TABLE "Operator" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");

ALTER TABLE "Repair" ADD CONSTRAINT "Repair_gpsModelId_fkey" FOREIGN KEY ("gpsModelId") REFERENCES "GpsModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Operator" ("id", "name", "updatedAt") VALUES
('operator-ooredoo', 'Ooredoo', CURRENT_TIMESTAMP),
('operator-orange', 'Orange', CURRENT_TIMESTAMP),
('operator-tunisie-telecom', 'Tunisie Telecom', CURRENT_TIMESTAMP);

INSERT INTO "RepairType" ("id", "name", "commissionRate", "managedByAdmin", "createdAt", "updatedAt") VALUES
('repair-type-montage', 'Montage', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('repair-type-demontage', 'Démontage', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('repair-type-montage-demontage', 'Montage + Démontage', 70, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('repair-type-changement-sim', 'Changement Carte SIM', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('repair-type-intervention', 'Intervention', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('repair-type-configuration', 'Configuration Plateforme', 10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO UPDATE SET "commissionRate" = EXCLUDED."commissionRate", "managedByAdmin" = true;
