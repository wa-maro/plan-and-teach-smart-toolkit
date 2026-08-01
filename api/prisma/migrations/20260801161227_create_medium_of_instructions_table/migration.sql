-- CreateTable
CREATE TABLE "medium_of_instructions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medium_of_instructions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medium_of_instructions_name_key" ON "medium_of_instructions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "medium_of_instructions_code_key" ON "medium_of_instructions"("code");
