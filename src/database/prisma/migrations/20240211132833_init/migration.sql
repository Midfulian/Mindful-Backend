-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photoURL" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photoURL" TEXT,
ADD COLUMN     "profile_picture" TEXT;
