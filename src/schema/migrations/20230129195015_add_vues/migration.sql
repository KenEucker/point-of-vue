/*
  Warnings:

  - You are about to drop the column `activeTemplateId` on the `Creator` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `ActiveTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagsOnVuesVueId` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Made the column `tagsOnTemplatesTemplateId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Creator" DROP CONSTRAINT "Creator_activeTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_tagsOnTemplatesTemplateId_fkey";

-- DropIndex
DROP INDEX "ActiveTemplate_templateId_key";

-- AlterTable
ALTER TABLE "ActiveTemplate" ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "palette" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD CONSTRAINT "ActiveTemplate_pkey" PRIMARY KEY ("creatorId");

-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "activeTemplateId";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "templateId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tagsOnVuesVueId" INTEGER NOT NULL,
ALTER COLUMN "tagsOnTemplatesTemplateId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Vue" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveVue" (
    "creatorId" INTEGER NOT NULL,
    "vueId" INTEGER NOT NULL,

    CONSTRAINT "ActiveVue_pkey" PRIMARY KEY ("creatorId")
);

-- CreateTable
CREATE TABLE "TagsOnVues" (
    "vueId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnVues_pkey" PRIMARY KEY ("vueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vue_creatorId_title_key" ON "Vue"("creatorId", "title");

-- AddForeignKey
ALTER TABLE "Vue" ADD CONSTRAINT "Vue_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTemplate" ADD CONSTRAINT "ActiveTemplate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveVue" ADD CONSTRAINT "ActiveVue_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveVue" ADD CONSTRAINT "ActiveVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnTemplatesTemplateId_fkey" FOREIGN KEY ("tagsOnTemplatesTemplateId") REFERENCES "TagsOnTemplates"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnVuesVueId_fkey" FOREIGN KEY ("tagsOnVuesVueId") REFERENCES "TagsOnVues"("vueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnVues" ADD CONSTRAINT "TagsOnVues_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
