/*
  Warnings:

  - You are about to drop the `kriteria_klaim` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "kriteria_klaim" DROP CONSTRAINT "kriteria_klaim_layananId_fkey";

-- DropTable
DROP TABLE "kriteria_klaim";
