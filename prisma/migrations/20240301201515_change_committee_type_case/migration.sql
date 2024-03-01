/*
  Warnings:

  - You are about to drop the column `committeeType` on the `Committee` table. All the data in the column will be lost.
  - Added the required column `committee_type` to the `Committee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Committee" DROP COLUMN "committeeType";
ALTER TABLE "Committee" ADD COLUMN     "committee_type" "COMMITTEE_TYPE" NOT NULL;
