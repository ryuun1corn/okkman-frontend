/*
  Warnings:

  - You are about to drop the column `committeeId` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mentorId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mentorId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_committeeId_fkey";

-- DropIndex
DROP INDEX "Group_committeeId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "committeeId";
ALTER TABLE "Group" ADD COLUMN     "mentorId" INT4 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_mentorId_key" ON "Group"("mentorId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
