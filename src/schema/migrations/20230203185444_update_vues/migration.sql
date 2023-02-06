-- AlterTable
ALTER TABLE "Vue" ADD COLUMN     "compatibility" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "license" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "version" TEXT NOT NULL DEFAULT '';
