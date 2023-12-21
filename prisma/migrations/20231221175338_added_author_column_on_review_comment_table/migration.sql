/*
  Warnings:

  - Added the required column `author_id` to the `review_comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `review_id` on table `review_comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "review_comments" DROP CONSTRAINT "review_comments_review_id_fkey";

-- AlterTable
ALTER TABLE "review_comments" ADD COLUMN     "author_id" TEXT NOT NULL,
ALTER COLUMN "review_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "review_comments" ADD CONSTRAINT "review_comments_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_comments" ADD CONSTRAINT "review_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "reviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
