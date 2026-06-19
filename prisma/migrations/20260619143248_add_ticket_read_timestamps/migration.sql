-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "adminReadAt" TIMESTAMP(3),
ADD COLUMN     "clientReadAt" TIMESTAMP(3);
