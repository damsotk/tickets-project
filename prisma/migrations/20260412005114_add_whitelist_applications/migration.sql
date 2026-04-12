-- CreateEnum
CREATE TYPE "WhitelistStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "whitelist_applications" (
    "id" TEXT NOT NULL,
    "source" VARCHAR(500) NOT NULL,
    "rpExperience" VARCHAR(1000) NOT NULL,
    "plans" VARCHAR(2000),
    "minecraftNick" VARCHAR(100) NOT NULL,
    "discordNick" VARCHAR(100) NOT NULL,
    "status" "WhitelistStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "reviewComment" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whitelist_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "whitelist_applications_userId_idx" ON "whitelist_applications"("userId");

-- CreateIndex
CREATE INDEX "whitelist_applications_status_idx" ON "whitelist_applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "whitelist_applications_userId_status_key" ON "whitelist_applications"("userId", "status");

-- AddForeignKey
ALTER TABLE "whitelist_applications" ADD CONSTRAINT "whitelist_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist_applications" ADD CONSTRAINT "whitelist_applications_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
