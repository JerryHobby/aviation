/*
  Warnings:

  - You are about to drop the column `timezone` on the `Airports` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Airports` DROP COLUMN `timezone`;

-- CreateTable
CREATE TABLE `Timezone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aaa` VARCHAR(191) NOT NULL,
    `timezone` VARCHAR(191) NULL,
    `offset` INTEGER NULL,
    `is_dst` INTEGER NULL,
    `dst_savings` INTEGER NULL,
    `last_update` DATETIME(3) NULL,

    UNIQUE INDEX `Timezone_aaa_key`(`aaa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Airports` ADD CONSTRAINT `Airports_iata_code_fkey` FOREIGN KEY (`iata_code`) REFERENCES `Timezone`(`aaa`) ON DELETE SET NULL ON UPDATE CASCADE;
