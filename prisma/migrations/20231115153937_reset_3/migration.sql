-- AddForeignKey
ALTER TABLE `Airports` ADD CONSTRAINT `Airports_iata_code_fkey` FOREIGN KEY (`iata_code`) REFERENCES `Timezone`(`aaa`) ON DELETE SET NULL ON UPDATE CASCADE;
