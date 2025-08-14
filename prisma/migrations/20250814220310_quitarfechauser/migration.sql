/*
  Warnings:

  - You are about to drop the column `fecha_actualizacion` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_creacion` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `fecha_actualizacion`,
    DROP COLUMN `fecha_creacion`;
