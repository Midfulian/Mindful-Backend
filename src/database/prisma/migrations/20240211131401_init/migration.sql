/*
  Warnings:

  - You are about to drop the column `password_hash` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "password_hash";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password_hash";
