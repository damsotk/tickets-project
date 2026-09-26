-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "preview" VARCHAR(300) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "date" DATE NOT NULL,
    "infobox" JSON,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "articles_category_date_idx" ON "articles"("category", "date");

-- CreateIndex
CREATE UNIQUE INDEX "articles_category_slug_key" ON "articles"("category", "slug");

