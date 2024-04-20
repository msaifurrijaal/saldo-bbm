-- CreateTable
CREATE TABLE `cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licensePlate` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `initialBalance` DOUBLE NOT NULL,
    `currentBalance` DOUBLE NOT NULL,
    `fuelUsage` DOUBLE NOT NULL,
    `fuelConsumption` DOUBLE NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `cars_licensePlate_key`(`licensePlate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
