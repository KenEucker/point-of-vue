-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "groupId" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tagsOnGroupGroupId" INTEGER;

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
CREATE TABLE "TagsOnGroup" (
    "groupId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnGroup_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "_CreatorToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_title_key" ON "Group"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CreatorToGroup_AB_unique" ON "_CreatorToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_CreatorToGroup_B_index" ON "_CreatorToGroup"("B");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_tagsOnGroupGroupId_fkey" FOREIGN KEY ("tagsOnGroupGroupId") REFERENCES "TagsOnGroup"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagsOnGroupGroupId_fkey" FOREIGN KEY ("tagsOnGroupGroupId") REFERENCES "TagsOnGroup"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnGroup" ADD CONSTRAINT "TagsOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToGroup" ADD CONSTRAINT "_CreatorToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToGroup" ADD CONSTRAINT "_CreatorToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
