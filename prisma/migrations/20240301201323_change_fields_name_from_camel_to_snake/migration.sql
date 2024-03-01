/*
  Warnings:

  - You are about to drop the column `bphType` on the `Committee` table. All the data in the column will be lost.
  - You are about to drop the column `pengurusIntiType` on the `Committee` table. All the data in the column will be lost.
  - You are about to drop the column `mentorId` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mentor_id]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mentor_id` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Mentee_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Speaker_id_seq" MAXVALUE 9223372036854775807;

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_mentorId_fkey";

-- DropIndex
DROP INDEX "Group_mentorId_key";

-- AlterTable
ALTER TABLE "Committee" DROP COLUMN "bphType";
ALTER TABLE "Committee" DROP COLUMN "pengurusIntiType";
ALTER TABLE "Committee" ADD COLUMN     "bph_type" "BADAN_PENGURUS_HARIAN_TYPE";
ALTER TABLE "Committee" ADD COLUMN     "pengurus_inti_type" "PENGURUS_INTI_TYPE";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "mentorId";
ALTER TABLE "Group" ADD COLUMN     "mentor_id" INT4 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_mentor_id_key" ON "Group"("mentor_id");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
