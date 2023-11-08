-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_fkey`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `hashedPassword` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `text` MEDIUMTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,
    `tags` VARCHAR(191) NULL,
    `commentsEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Article_title_key`(`title`),
    INDEX `Article_categoryId_fkey`(`categoryId`),
    INDEX `Article_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `text` TEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,

    INDEX `Comment_articleId_fkey`(`articleId`),
    INDEX `Comment_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,

    INDEX `Like_articleId_fkey`(`articleId`),
    INDEX `Like_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,

    UNIQUE INDEX `Page_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `tools` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `thumbnailUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Project_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Airports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ident` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `latitude_deg` DOUBLE NULL,
    `longitude_deg` DOUBLE NULL,
    `elevation_ft` INTEGER NULL,
    `continent` VARCHAR(191) NULL,
    `iso_country` VARCHAR(191) NOT NULL,
    `iso_region` VARCHAR(191) NULL,
    `municipality` VARCHAR(191) NULL,
    `scheduled_service` VARCHAR(191) NULL,
    `gps_code` VARCHAR(191) NULL,
    `iata_code` VARCHAR(191) NULL,
    `local_code` VARCHAR(191) NULL,
    `home_link` VARCHAR(191) NULL,
    `wikipedia_link` VARCHAR(191) NULL,
    `keywords` VARCHAR(1000) NULL,

    INDEX `Airports_iso_country_fkey`(`iso_country`),
    INDEX `Airports_iso_region_fkey`(`iso_region`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `continent` VARCHAR(191) NULL,
    `wikipedia_link` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,

    UNIQUE INDEX `Countries_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `local_code` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `continent` VARCHAR(191) NOT NULL,
    `iso_country` VARCHAR(191) NOT NULL,
    `wikipedia_link` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,

    UNIQUE INDEX `Regions_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Frequencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `airport_ref` INTEGER NULL,
    `airport_ident` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `frequency_mhz` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Navaids` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NULL,
    `ident` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `frequency_khz` INTEGER NULL,
    `latitude_deg` DOUBLE NULL,
    `longitude_deg` DOUBLE NULL,
    `elevation_ft` INTEGER NULL,
    `iso_country` VARCHAR(191) NULL,
    `dme_frequency_khz` INTEGER NULL,
    `dme_channel` VARCHAR(191) NULL,
    `dme_latitude_deg` DOUBLE NULL,
    `dme_longitude_deg` DOUBLE NULL,
    `dme_elevation_ft` INTEGER NULL,
    `slaved_variation_deg` DOUBLE NULL,
    `magnetic_variation_deg` DOUBLE NULL,
    `usageType` VARCHAR(191) NULL,
    `power` VARCHAR(191) NULL,
    `associated_airport` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Runways` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `airport_ref` INTEGER NULL,
    `airport_ident` VARCHAR(191) NULL,
    `length_ft` INTEGER NULL,
    `width_ft` INTEGER NULL,
    `surface` VARCHAR(191) NULL,
    `lighted` INTEGER NULL,
    `closed` INTEGER NULL,
    `le_ident` VARCHAR(191) NULL,
    `le_latitude_deg` DOUBLE NULL,
    `le_longitude_deg` DOUBLE NULL,
    `le_elevation_ft` INTEGER NULL,
    `le_heading_degT` DOUBLE NULL,
    `le_displaced_threshold_ft` INTEGER NULL,
    `he_ident` VARCHAR(191) NULL,
    `he_latitude_deg` DOUBLE NULL,
    `he_longitude_deg` DOUBLE NULL,
    `he_elevation_ft` INTEGER NULL,
    `he_heading_degT` INTEGER NULL,
    `he_displaced_threshold_ft` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airports` ADD CONSTRAINT `Airports_iso_country_fkey` FOREIGN KEY (`iso_country`) REFERENCES `Countries`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airports` ADD CONSTRAINT `Airports_iso_region_fkey` FOREIGN KEY (`iso_region`) REFERENCES `Regions`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
