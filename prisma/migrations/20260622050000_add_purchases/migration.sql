CREATE TYPE "PurchaseKind" AS ENUM ('REQUEST', 'ORDER', 'PURCHASE', 'RETURN');
CREATE TYPE "PurchaseStatus" AS ENUM ('DRAFT', 'ORDERED', 'RECEIVED', 'RETURNED', 'CANCELLED');
CREATE TYPE "PurchasePaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID');

CREATE TABLE "Purchase" (
  "id" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "kind" "PurchaseKind" NOT NULL DEFAULT 'PURCHASE',
  "supplierName" TEXT NOT NULL,
  "location" TEXT NOT NULL DEFAULT 'GSM Guide',
  "status" "PurchaseStatus" NOT NULL DEFAULT 'DRAFT',
  "paymentStatus" "PurchasePaymentStatus" NOT NULL DEFAULT 'UNPAID',
  "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "subtotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "discount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "tax" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "shipping" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "notes" TEXT,
  "addedBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PurchaseItem" (
  "id" TEXT NOT NULL,
  "purchaseId" TEXT NOT NULL,
  "productId" TEXT,
  "productName" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "unitCost" DECIMAL(12,2) NOT NULL,
  "margin" DECIMAL(5,2) NOT NULL DEFAULT 0,
  "salePrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "lineTotal" DECIMAL(12,2) NOT NULL,
  CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Purchase_reference_key" ON "Purchase"("reference");
CREATE INDEX "Purchase_kind_purchaseDate_idx" ON "Purchase"("kind", "purchaseDate");
CREATE INDEX "Purchase_supplierName_idx" ON "Purchase"("supplierName");
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
