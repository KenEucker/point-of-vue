/*
  Warnings:

  - The primary key for the `Vue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `oid` on the `Vue` table. All the data in the column will be lost.
  - The required column `id` was added to the `Vue` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "ActiveVue" DROP CONSTRAINT "ActiveVue_vueId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnVue" DROP CONSTRAINT "TagsOnVue_vueId_fkey";

-- AlterTable
ALTER TABLE "Vue" DROP CONSTRAINT "Vue_pkey",
DROP COLUMN "oid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Vue_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ActiveVue" ADD CONSTRAINT "ActiveVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnVue" ADD CONSTRAINT "TagsOnVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
