/*
  Warnings:

  - You are about to drop the column `groupId` on the `Creator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ActiveTemplate" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ActiveVue" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "groupId";
