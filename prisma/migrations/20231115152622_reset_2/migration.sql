/*
  Warnings:

  - You are about to drop the column `airportsId` on the `Frequencies` table. All the data in the column will be lost.
  - You are about to drop the column `airportsId` on the `Navaids` table. All the data in the column will be lost.
  - You are about to drop the column `airportsId` on the `Runways` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Airports` DROP FOREIGN KEY `Airports_iata_code_fkey`;

-- DropForeignKey
ALTER TABLE `Frequencies` DROP FOREIGN KEY `Frequencies_airportsId_fkey`;

-- DropForeignKey
ALTER TABLE `Navaids` DROP FOREIGN KEY `Navaids_airportsId_fkey`;

-- DropForeignKey
ALTER TABLE `Runways` DROP FOREIGN KEY `Runways_airportsId_fkey`;

-- AlterTable
ALTER TABLE `Frequencies` DROP COLUMN `airportsId`;

-- AlterTable
ALTER TABLE `Navaids` DROP COLUMN `airportsId`;

-- AlterTable
ALTER TABLE `Runways` DROP COLUMN `airportsId`;
