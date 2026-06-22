CREATE TABLE "GrhRecord" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "data" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GrhRecord_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "GrhRecord_type_idx" ON "GrhRecord"("type");
CREATE INDEX "GrhRecord_type_name_idx" ON "GrhRecord"("type", "name");
