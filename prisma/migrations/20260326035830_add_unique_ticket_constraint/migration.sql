/*
  Warnings:

  - The values [OTHER] on the enum `TicketCategory` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userId,category,status]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketCategory_new" AS ENUM ('COMPLAINT', 'LORE', 'TECH');
ALTER TABLE "tickets" ALTER COLUMN "category" TYPE "TicketCategory_new" USING ("category"::text::"TicketCategory_new");
ALTER TYPE "TicketCategory" RENAME TO "TicketCategory_old";
ALTER TYPE "TicketCategory_new" RENAME TO "TicketCategory";
DROP TYPE "TicketCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "messages_ticketId_idx" ON "messages"("ticketId");

-- CreateIndex
CREATE INDEX "messages_authorId_idx" ON "messages"("authorId");

-- CreateIndex
CREATE INDEX "tickets_userId_status_idx" ON "tickets"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_userId_category_status_key" ON "tickets"("userId", "category", "status");
