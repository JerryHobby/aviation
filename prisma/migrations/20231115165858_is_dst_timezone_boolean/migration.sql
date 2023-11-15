/*
  Warnings:

  - You are about to alter the column `is_dst` on the `Timezone` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Timezone` MODIFY `is_dst` BOOLEAN NULL;
