/*
  Warnings:

  - Made the column `endDate` on table `Budget` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "endDate" SET NOT NULL;
