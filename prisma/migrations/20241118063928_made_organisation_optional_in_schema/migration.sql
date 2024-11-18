/*
  Warnings:

  - You are about to drop the column `alternateDeparments` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "alternateDeparments",
ADD COLUMN     "alternateDepartments" TEXT;
