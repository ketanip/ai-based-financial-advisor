/*
  Warnings:

  - Added the required column `title` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "title" TEXT NOT NULL;
