# Migration `20201027140747`

This migration has been generated at 10/27/2020, 3:07:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserInvite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "calendarId" INTEGER,
    "role" TEXT,

    FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserInvite" ("id", "createdAt", "updatedAt", "createdBy", "email", "calendarId", "role") SELECT "id", "createdAt", "updatedAt", "createdBy", "email", "calendarId", "role" FROM "UserInvite";
DROP TABLE "UserInvite";
ALTER TABLE "new_UserInvite" RENAME TO "UserInvite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026070923..20201027140747
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
     provider = ["sqlite", "postgres"]
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -123,8 +123,8 @@
 	updatedAt   DateTime 	@updatedAt
 	user		User		@relation(fields: [createdBy], references: [id])
     createdBy   Int
 	email		String
-	calendar    Calendar	@relation(fields: [calendarId], references: [id])
-    calendarId  Int
-	role		String
+	calendar    Calendar?	@relation(fields: [calendarId], references: [id])
+    calendarId  Int?
+	role		String?
 }
```


