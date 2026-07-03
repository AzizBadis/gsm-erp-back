ALTER TABLE "Product"
  ADD COLUMN "barcode" TEXT,
  ADD COLUMN "brand" TEXT,
  ADD COLUMN "category" TEXT,
  ADD COLUMN "unit" TEXT,
  ADD COLUMN "warranty" TEXT,
  ADD COLUMN "productType" TEXT,
  ADD COLUMN "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 0;
