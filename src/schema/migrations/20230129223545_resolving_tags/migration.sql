/*
  Warnings:

  - You are about to drop the `TagsOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagsOnTemplates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagsOnVues` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagsOnCreatorsCreatorId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_tagsOnPostsPostId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_tagsOnTemplatesTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_tagsOnVuesVueId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnTemplates" DROP CONSTRAINT "TagsOnTemplates_templateId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnVues" DROP CONSTRAINT "TagsOnVues_vueId_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tagsOnCreatorsCreatorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TagsOnPosts";

-- DropTable
DROP TABLE "TagsOnTemplates";

-- DropTable
DROP TABLE "TagsOnVues";

-- CreateTable
CREATE TABLE "TagsOnCreator" (
    "creatorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnCreator_pkey" PRIMARY KEY ("creatorId")
);

-- CreateTable
CREATE TABLE "TagsOnPost" (
    "postId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnPost_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "TagsOnTemplate" (
    "templateId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnTemplate_pkey" PRIMARY KEY ("templateId")
);

-- CreateTable
CREATE TABLE "TagsOnVue" (
    "vueId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnVue_pkey" PRIMARY KEY ("vueId")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnCreatorsCreatorId_fkey" FOREIGN KEY ("tagsOnCreatorsCreatorId") REFERENCES "TagsOnCreator"("creatorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnPostsPostId_fkey" FOREIGN KEY ("tagsOnPostsPostId") REFERENCES "TagsOnPost"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnTemplatesTemplateId_fkey" FOREIGN KEY ("tagsOnTemplatesTemplateId") REFERENCES "TagsOnTemplate"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnVuesVueId_fkey" FOREIGN KEY ("tagsOnVuesVueId") REFERENCES "TagsOnVue"("vueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCreator" ADD CONSTRAINT "TagsOnCreator_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPost" ADD CONSTRAINT "TagsOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnTemplate" ADD CONSTRAINT "TagsOnTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnVue" ADD CONSTRAINT "TagsOnVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
