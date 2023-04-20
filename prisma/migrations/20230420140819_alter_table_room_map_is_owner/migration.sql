/*
  Warnings:

  - You are about to drop the column `isOwner` on the `UserRooms` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `UserRooms` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserRooms` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `UserRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserRooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRooms" DROP CONSTRAINT "UserRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserRooms" DROP CONSTRAINT "UserRooms_userId_fkey";

-- AlterTable
ALTER TABLE "UserRooms" DROP COLUMN "isOwner",
DROP COLUMN "roomId",
DROP COLUMN "userId",
ADD COLUMN     "is_owner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "room_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "UserRooms" ADD CONSTRAINT "UserRooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRooms" ADD CONSTRAINT "UserRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
