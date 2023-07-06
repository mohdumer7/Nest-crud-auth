/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `UpdatedAt` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `UpdatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "UpdatedAt" SET NOT NULL,
ALTER COLUMN "UpdatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "UpdatedAt" SET NOT NULL,
ALTER COLUMN "UpdatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
