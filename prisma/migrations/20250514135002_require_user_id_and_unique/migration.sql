/*
  Warnings:

  - A unique constraint covering the columns `[ean,userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_ean_userId_key" ON "Product"("ean", "userId");
