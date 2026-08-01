-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "mediumOfInstructionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_slug_key" ON "subjects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_abbreviation_key" ON "subjects"("abbreviation");

-- CreateIndex
CREATE INDEX "subjects_mediumOfInstructionId_idx" ON "subjects"("mediumOfInstructionId");

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_mediumOfInstructionId_fkey" FOREIGN KEY ("mediumOfInstructionId") REFERENCES "medium_of_instructions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
