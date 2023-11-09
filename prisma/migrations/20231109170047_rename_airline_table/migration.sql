/*
  Warnings:

  - You are about to drop the `airlines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `airlines`;

-- CreateTable
CREATE TABLE `Airlines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `iata_code` VARCHAR(191) NULL,
    `headquarters` VARCHAR(191) NULL,
    `hubs` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
