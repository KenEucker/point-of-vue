-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('READ', 'WRITE', 'LOGIN', 'INTERACT');

-- CreateEnum
CREATE TYPE "MutationType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'PUBLISHED', 'UNPUBLISHED');

-- CreateTable
CREATE TABLE "Creator" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "permissions" "Permissions"[],
    "name" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "banner" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "chosenday" TEXT NOT NULL DEFAULT '',
    "subs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagsOnGroupGroupId" INTEGER,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "like" BOOLEAN NOT NULL DEFAULT false,
    "love" BOOLEAN NOT NULL DEFAULT false,
    "repost" BOOLEAN NOT NULL DEFAULT false,
    "share" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "creatorId" INTEGER NOT NULL,
    "groupId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "palette" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "version" TEXT NOT NULL DEFAULT '',
    "compatibility" TEXT NOT NULL DEFAULT '',
    "license" TEXT NOT NULL DEFAULT '',
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT '',
    "version" TEXT NOT NULL DEFAULT '',
    "compatibility" TEXT NOT NULL DEFAULT '',
    "license" TEXT NOT NULL DEFAULT '',
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveTemplate" (
    "palette" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "creatorId" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveTemplate_pkey" PRIMARY KEY ("creatorId")
);

-- CreateTable
CREATE TABLE "ActiveVue" (
    "creatorId" INTEGER NOT NULL,
    "vueId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveVue_pkey" PRIMARY KEY ("creatorId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "tagsOnCreatorsCreatorId" INTEGER NOT NULL,
    "tagsOnPostsPostId" INTEGER NOT NULL,
    "tagsOnTemplatesTemplateId" INTEGER NOT NULL,
    "tagsOnVuesVueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagsOnGroupGroupId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnCreator" (
    "creatorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnCreator_pkey" PRIMARY KEY ("creatorId")
);

-- CreateTable
CREATE TABLE "TagsOnGroup" (
    "groupId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnGroup_pkey" PRIMARY KEY ("groupId")
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
    "vueId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnVue_pkey" PRIMARY KEY ("vueId")
);

-- CreateTable
CREATE TABLE "_CreatorToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_handle_key" ON "Creator"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Group_title_key" ON "Group"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Interaction_creatorId_postId_key" ON "Interaction"("creatorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_creatorId_title_key" ON "Post"("creatorId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Template_creatorId_title_key" ON "Template"("creatorId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Vue_creatorId_title_key" ON "Vue"("creatorId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_text_key" ON "Tag"("text");

-- CreateIndex
CREATE UNIQUE INDEX "_CreatorToGroup_AB_unique" ON "_CreatorToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_CreatorToGroup_B_index" ON "_CreatorToGroup"("B");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_tagsOnGroupGroupId_fkey" FOREIGN KEY ("tagsOnGroupGroupId") REFERENCES "TagsOnGroup"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vue" ADD CONSTRAINT "Vue_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTemplate" ADD CONSTRAINT "ActiveTemplate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTemplate" ADD CONSTRAINT "ActiveTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveVue" ADD CONSTRAINT "ActiveVue_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveVue" ADD CONSTRAINT "ActiveVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnCreatorsCreatorId_fkey" FOREIGN KEY ("tagsOnCreatorsCreatorId") REFERENCES "TagsOnCreator"("creatorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnPostsPostId_fkey" FOREIGN KEY ("tagsOnPostsPostId") REFERENCES "TagsOnPost"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnTemplatesTemplateId_fkey" FOREIGN KEY ("tagsOnTemplatesTemplateId") REFERENCES "TagsOnTemplate"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnVuesVueId_fkey" FOREIGN KEY ("tagsOnVuesVueId") REFERENCES "TagsOnVue"("vueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnGroupGroupId_fkey" FOREIGN KEY ("tagsOnGroupGroupId") REFERENCES "TagsOnGroup"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCreator" ADD CONSTRAINT "TagsOnCreator_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnGroup" ADD CONSTRAINT "TagsOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPost" ADD CONSTRAINT "TagsOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnTemplate" ADD CONSTRAINT "TagsOnTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnVue" ADD CONSTRAINT "TagsOnVue_vueId_fkey" FOREIGN KEY ("vueId") REFERENCES "Vue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToGroup" ADD CONSTRAINT "_CreatorToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToGroup" ADD CONSTRAINT "_CreatorToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
