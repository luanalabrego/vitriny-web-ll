-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");
