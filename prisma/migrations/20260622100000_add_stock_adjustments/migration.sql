CREATE TYPE "StockAdjustmentType" AS ENUM ('ADD', 'SUBTRACT');
CREATE TABLE "StockAdjustment" (
  "id" TEXT NOT NULL, "reference" TEXT NOT NULL, "adjustmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "location" TEXT NOT NULL, "type" "StockAdjustmentType" NOT NULL, "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "recoveredAmount" DECIMAL(12,2) NOT NULL DEFAULT 0, "reason" TEXT, "addedBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StockAdjustment_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "StockAdjustmentItem" (
  "id" TEXT NOT NULL, "adjustmentId" TEXT NOT NULL, "productId" TEXT NOT NULL, "quantity" INTEGER NOT NULL,
  "unitPrice" DECIMAL(12,2) NOT NULL, "lineTotal" DECIMAL(12,2) NOT NULL,
  CONSTRAINT "StockAdjustmentItem_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "StockAdjustment_reference_key" ON "StockAdjustment"("reference");
CREATE INDEX "StockAdjustment_adjustmentDate_idx" ON "StockAdjustment"("adjustmentDate");
CREATE INDEX "StockAdjustment_location_idx" ON "StockAdjustment"("location");
ALTER TABLE "StockAdjustmentItem" ADD CONSTRAINT "StockAdjustmentItem_adjustmentId_fkey" FOREIGN KEY ("adjustmentId") REFERENCES "StockAdjustment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StockAdjustmentItem" ADD CONSTRAINT "StockAdjustmentItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
