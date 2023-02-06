/*
  Warnings:

  - The primary key for the `TagsOnVue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Vue` table. All the data in the column will be lost.
  - The required column `oid` was added to the `Vue` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "ActiveVue" DROP CONSTRAINT "ActiveVue_vueId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_tagsOnVuesVueId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnVue" DROP CONSTRAINT "TagsOnVue_vueId_fkey";

-- AlterTable
ALTER TABLE "ActiveVue" ALTER COLUMN "vueId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "tagsOnVuesVueId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TagsOnVue" DROP CONSTRAINT "TagsOnVue_pkey",
ALTER COLUMN "vueId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TagsOnVue_pkey" PRIMARY KEY ("vueId");

-- AlterTable
ALTER TABLE "Vue" DROP CONSTRAINT "Vue_pkey",
DROP COLUMN "id",
ADD COLUMN     "oid" TEXT NOT NULL,
ADD CONSTRAINT "Vue_pkey" PRIMARY KEY ("oid");

-- AddForeignKey
ALTER TABLE "ActiveVue" ADD CONSTRAINT "ActiveVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnVuesVueId_fkey" FOREIGN KEY ("tagsOnVuesVueId") REFERENCES "TagsOnVue"("vueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnVue" ADD CONSTRAINT "TagsOnVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;
