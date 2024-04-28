-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "content" TEXT;
