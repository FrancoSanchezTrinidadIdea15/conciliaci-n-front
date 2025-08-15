-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `reset_token` VARCHAR(191) NULL,
    ADD COLUMN `reset_token_expires` DATETIME(3) NULL;
