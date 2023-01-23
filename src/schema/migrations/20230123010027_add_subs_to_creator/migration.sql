-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "subs" TEXT[] DEFAULT ARRAY[]::TEXT[];
