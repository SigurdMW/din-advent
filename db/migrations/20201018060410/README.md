# Migration `20201018060410`

This migration has been generated at 10/18/2020, 8:04:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "plan" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role", "plan") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role", "plan" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201016063607..20201018060410
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
@@ -23,8 +23,9 @@
     sessions       	Session[]
     Loginrequest   	Loginrequest[]
     Calendar       	Calendar[]
 	plan			String?
+	active			Boolean			@default(false)
 }
 model Session {
     id                 Int       @default(autoincrement()) @id
```


