/*
  Warnings:

  - Added the required column `entrance_year` to the `Committee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `Committee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `Committee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ENTRANCE_METHOD" AS ENUM ('SNBP', 'SNBT', 'MANDIRI', 'BEASISWA');

-- CreateEnum
CREATE TYPE "SPONSOR_PACKAGE" AS ENUM ('SILVER', 'GOLD', 'PLATINUM');

-- AlterTable
ALTER TABLE "Committee" ADD COLUMN     "entrance_year" INT4 NOT NULL;
ALTER TABLE "Committee" ADD COLUMN     "faculty" STRING NOT NULL;
ALTER TABLE "Committee" ADD COLUMN     "major" STRING NOT NULL;

-- CreateTable
CREATE TABLE "Mentee" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,
    "faculty" STRING NOT NULL,
    "major" STRING NOT NULL,
    "entrance_year" INT4 NOT NULL,
    "entrance_method" "ENTRANCE_METHOD" NOT NULL,
    "group_number" INT4 NOT NULL,

    CONSTRAINT "Mentee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "package" "SPONSOR_PACKAGE" NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsorOnEvents" (
    "event_id" INT4 NOT NULL,
    "sponsor_id" INT4 NOT NULL,
    "sponsored_by" STRING NOT NULL,

    CONSTRAINT "SponsorOnEvents_pkey" PRIMARY KEY ("event_id","sponsor_id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToSpeaker" (
    "A" INT4 NOT NULL,
    "B" INT4 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SponsorOnEvents_sponsor_id_event_id_key" ON "SponsorOnEvents"("sponsor_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSpeaker_AB_unique" ON "_EventToSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSpeaker_B_index" ON "_EventToSpeaker"("B");

-- AddForeignKey
ALTER TABLE "Mentee" ADD CONSTRAINT "Mentee_group_number_fkey" FOREIGN KEY ("group_number") REFERENCES "Group"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsorOnEvents" ADD CONSTRAINT "SponsorOnEvents_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsorOnEvents" ADD CONSTRAINT "SponsorOnEvents_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSpeaker" ADD CONSTRAINT "_EventToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSpeaker" ADD CONSTRAINT "_EventToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
