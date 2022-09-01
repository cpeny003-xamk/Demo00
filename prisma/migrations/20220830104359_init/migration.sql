-- CreateTable
CREATE TABLE "tehtava" (
    "id" TEXT NOT NULL,
    "nimi" TEXT NOT NULL,
    "suoritettu" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "tehtava_id_key" ON "tehtava"("id");
