CREATE TYPE "StockTransferStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED');
CREATE TABLE "StockTransfer" (
  "id" TEXT NOT NULL, "reference" TEXT NOT NULL, "transferDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "fromLocation" TEXT NOT NULL, "toLocation" TEXT NOT NULL, "status" "StockTransferStatus" NOT NULL DEFAULT 'PENDING',
  "shippingCharges" DECIMAL(12,2) NOT NULL DEFAULT 0, "notes" TEXT, "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "addedBy" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StockTransfer_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "StockTransferItem" (
  "id" TEXT NOT NULL, "transferId" TEXT NOT NULL, "productId" TEXT NOT NULL, "quantity" INTEGER NOT NULL,
  "unitPrice" DECIMAL(12,2) NOT NULL, "lineTotal" DECIMAL(12,2) NOT NULL,
  CONSTRAINT "StockTransferItem_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "StockTransfer_reference_key" ON "StockTransfer"("reference");
CREATE INDEX "StockTransfer_transferDate_idx" ON "StockTransfer"("transferDate");
CREATE INDEX "StockTransfer_fromLocation_toLocation_idx" ON "StockTransfer"("fromLocation", "toLocation");
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "StockTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
