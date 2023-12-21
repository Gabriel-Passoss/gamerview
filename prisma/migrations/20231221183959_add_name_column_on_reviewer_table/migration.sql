/*
  Warnings:

  - Added the required column `name` to the `reviewers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviewers" ADD COLUMN     "name" TEXT NOT NULL;
