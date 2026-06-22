CREATE TYPE "InvoiceDocumentType" AS ENUM ('SALE', 'DRAFT', 'QUOTE', 'RETURN');
ALTER TABLE "Invoice" ADD COLUMN "documentType" "InvoiceDocumentType" NOT NULL DEFAULT 'SALE';
ALTER TABLE "Invoice" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'FINAL';
ALTER TABLE "Invoice" ADD COLUMN "shippingStatus" TEXT NOT NULL DEFAULT 'NOT_SHIPPED';
ALTER TABLE "Invoice" ADD COLUMN "discount" DECIMAL(12,2) NOT NULL DEFAULT 0;
CREATE TABLE "SalesDiscount" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "priority" INTEGER NOT NULL DEFAULT 1,
  "brand" TEXT, "category" TEXT, "location" TEXT, "productType" TEXT,
  "amount" DECIMAL(12,2) NOT NULL, "amountType" TEXT NOT NULL DEFAULT 'FIXED',
  "startsAt" TIMESTAMP(3), "endsAt" TIMESTAMP(3), "customerGroup" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "SalesDiscount_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "SalesImport" (
  "id" TEXT NOT NULL, "fileName" TEXT NOT NULL, "invoiceCount" INTEGER NOT NULL DEFAULT 0,
  "createdBy" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SalesImport_pkey" PRIMARY KEY ("id")
);
