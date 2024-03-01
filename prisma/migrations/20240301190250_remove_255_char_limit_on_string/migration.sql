/*
  Warnings:

  - Changed the type of `name` on the `Committee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `location` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Committee" DROP COLUMN "name";
ALTER TABLE "Committee" ADD COLUMN     "name" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "name";
ALTER TABLE "Event" ADD COLUMN     "name" STRING NOT NULL;
ALTER TABLE "Event" DROP COLUMN "location";
ALTER TABLE "Event" ADD COLUMN     "location" STRING NOT NULL;
