-- CreateTable
CREATE TABLE "Product" (
    "ean" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
