/*
  Warnings:

  - Changed the type of `hours_of_gameplay` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "hours_of_gameplay",
ADD COLUMN     "hours_of_gameplay" INTEGER NOT NULL;
