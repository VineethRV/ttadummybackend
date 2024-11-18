-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT,
    "email" TEXT,
    "department" TEXT NOT NULL,
    "alternateDeparments" TEXT NOT NULL,
    "timetable" TEXT NOT NULL,
    "labtable" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);
