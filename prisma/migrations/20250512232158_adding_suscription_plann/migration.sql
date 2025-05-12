/*
  Warnings:

  - You are about to drop the column `palnId` on the `Subscriptions` table. All the data in the column will be lost.
  - Added the required column `planId` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentID" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "planId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subscriptions" ("createdAt", "id", "paymentID", "updatedAt", "userId") SELECT "createdAt", "id", "paymentID", "updatedAt", "userId" FROM "Subscriptions";
DROP TABLE "Subscriptions";
ALTER TABLE "new_Subscriptions" RENAME TO "Subscriptions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
