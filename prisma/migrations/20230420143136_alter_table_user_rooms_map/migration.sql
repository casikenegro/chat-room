/*
  Warnings:

  - You are about to drop the `UserRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRooms" DROP CONSTRAINT "UserRooms_room_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRooms" DROP CONSTRAINT "UserRooms_user_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_userRoomId_fkey";

-- DropTable
DROP TABLE "UserRooms";

-- CreateTable
CREATE TABLE "user_rooms" (
    "id" UUID NOT NULL,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "user_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_rooms" ADD CONSTRAINT "user_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rooms" ADD CONSTRAINT "user_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userRoomId_fkey" FOREIGN KEY ("userRoomId") REFERENCES "user_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
