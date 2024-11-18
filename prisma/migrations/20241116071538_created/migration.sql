/*
  Warnings:

  - You are about to drop the column `dep` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `org` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "dep",
DROP COLUMN "org",
ADD COLUMN     "department" TEXT,
ADD COLUMN     "organisation" TEXT;
