-- CreateTable
CREATE TABLE "coin_transfers" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "senderId" TEXT,
    "recipientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coin_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coin_transfers_senderId_createdAt_idx" ON "coin_transfers"("senderId", "createdAt");

-- CreateIndex
CREATE INDEX "coin_transfers_recipientId_createdAt_idx" ON "coin_transfers"("recipientId", "createdAt");

-- AddForeignKey
ALTER TABLE "coin_transfers" ADD CONSTRAINT "coin_transfers_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin_transfers" ADD CONSTRAINT "coin_transfers_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Guard against negative balances and non-positive transfers at the DB level
ALTER TABLE "users" ADD CONSTRAINT "users_balance_non_negative" CHECK ("balance" >= 0);
ALTER TABLE "coin_transfers" ADD CONSTRAINT "coin_transfers_amount_positive" CHECK ("amount" > 0);
