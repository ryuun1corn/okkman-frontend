/*
  Warnings:

  - You are about to drop the `SponsorOnEvents` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,package]` on the table `Sponsor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Sponsor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SponsorOnEvents" DROP CONSTRAINT "SponsorOnEvents_event_id_fkey";

-- DropForeignKey
ALTER TABLE "SponsorOnEvents" DROP CONSTRAINT "SponsorOnEvents_sponsor_id_fkey";

-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "name" STRING NOT NULL;

-- DropTable
DROP TABLE "SponsorOnEvents";

-- CreateTable
CREATE TABLE "_EventToSponsor" (
    "A" INT4 NOT NULL,
    "B" INT4 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSponsor_AB_unique" ON "_EventToSponsor"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSponsor_B_index" ON "_EventToSponsor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_name_package_key" ON "Sponsor"("name", "package");

-- AddForeignKey
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
