/*
  Warnings:

  - Made the column `reviewer_id` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_reviewer_id_fkey";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "reviewer_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "reviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
