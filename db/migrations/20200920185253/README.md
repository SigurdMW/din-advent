# Migration `20200920185253`

This migration has been generated at 9/20/2020, 8:52:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "plan" TEXT

CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "plan" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "provider" TEXT NOT NULL,

FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200908123610..20200920185253
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
@@ -12,18 +12,19 @@
 // --------------------------------------
 model User {
-    id             Int            @default(autoincrement()) @id
-    createdAt      DateTime       @default(now())
-    updatedAt      DateTime       @updatedAt
-    name           String?
-    email          String         @unique
-    hashedPassword String?
-    role           String         @default("user")
-    sessions       Session[]
-    Loginrequest   Loginrequest[]
-    Calendar       Calendar[]
+    id             	Int            @default(autoincrement()) @id
+    createdAt      	DateTime       @default(now())
+    updatedAt      	DateTime       @updatedAt
+    name           	String?
+    email          	String         @unique
+    hashedPassword 	String?
+    role           	String         @default("user")
+    sessions       	Session[]
+    Loginrequest   	Loginrequest[]
+    Calendar       	Calendar[]
+	plan			String?
 }
 model Session {
     id                 Int       @default(autoincrement()) @id
@@ -64,5 +65,19 @@
 	calendar    Calendar	@relation(fields: [calendarId], references: [id])
     calendarId  Int
 	day			Int
 	content		String
+}
+
+model Payment {
+	id          	Int      	@default(autoincrement()) @id
+    createdAt   	DateTime	@default(now())
+	updatedAt   	DateTime 	@updatedAt
+	user       		User    	@relation(fields: [userId], references: [id])
+    userId     		Int
+	payload			String
+	transactionId	String		@default(uuid())
+	amount			Int
+	plan			String
+	completed		Boolean		@default(false)
+	provider		String
 }
```


