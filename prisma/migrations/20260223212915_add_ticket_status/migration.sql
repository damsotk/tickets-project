-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "closedById" TEXT,
ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'OPEN';

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
