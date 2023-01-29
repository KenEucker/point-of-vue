/*
  Warnings:

  - You are about to drop the column `birthday` on the `Creator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "birthday",
ADD COLUMN     "activeTemplateId" INTEGER DEFAULT 0,
ADD COLUMN     "chosenday" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "templateId" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tagsOnTemplatesTemplateId" INTEGER;

-- CreateTable
CREATE TABLE "ActiveTemplate" (
    "templateId" INTEGER NOT NULL,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnTemplates" (
    "templateId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnTemplates_pkey" PRIMARY KEY ("templateId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveTemplate_templateId_key" ON "ActiveTemplate"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Template_creatorId_title_key" ON "Template"("creatorId", "title");

-- AddForeignKey
ALTER TABLE "Creator" ADD CONSTRAINT "Creator_activeTemplateId_fkey" FOREIGN KEY ("activeTemplateId") REFERENCES "ActiveTemplate"("templateId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnTemplatesTemplateId_fkey" FOREIGN KEY ("tagsOnTemplatesTemplateId") REFERENCES "TagsOnTemplates"("templateId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTemplate" ADD CONSTRAINT "ActiveTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnTemplates" ADD CONSTRAINT "TagsOnTemplates_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
