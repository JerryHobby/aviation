-- AlterTable
ALTER TABLE `Frequencies` ADD COLUMN `airportsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Navaids` ADD COLUMN `airportsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Runways` ADD COLUMN `airportsId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Frequencies_airportsId_fkey` ON `Frequencies`(`airportsId`);

-- CreateIndex
CREATE INDEX `Navaids_airportsId_fkey` ON `Navaids`(`airportsId`);

-- CreateIndex
CREATE INDEX `Runways_airportsId_fkey` ON `Runways`(`airportsId`);

-- AddForeignKey
ALTER TABLE `Airports` ADD CONSTRAINT `Airports_iata_code_fkey` FOREIGN KEY (`iata_code`) REFERENCES `Timezone`(`aaa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Frequencies` ADD CONSTRAINT `Frequencies_airportsId_fkey` FOREIGN KEY (`airportsId`) REFERENCES `Airports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Navaids` ADD CONSTRAINT `Navaids_airportsId_fkey` FOREIGN KEY (`airportsId`) REFERENCES `Airports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Runways` ADD CONSTRAINT `Runways_airportsId_fkey` FOREIGN KEY (`airportsId`) REFERENCES `Airports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
