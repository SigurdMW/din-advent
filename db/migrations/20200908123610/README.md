# Migration `20200908123610`

This migration has been generated at 9/8/2020, 2:36:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Calendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "CalendarWindow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200906061326..20200908123610
--- datamodel.dml
+++ datamodel.dml
@@ -1,46 +1,68 @@
 // This is your Prisma schema file,
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
-  provider = ["sqlite", "postgres"]
-  url = "***"
+    provider = ["sqlite", "postgres"]
+    url = "***"
 }
 generator client {
-  provider = "prisma-client-js"
+    provider = "prisma-client-js"
 }
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
-  createdAt      DateTime  @default(now())
-  updatedAt      DateTime  @updatedAt
-  name           String?
-  email          String    @unique
-  hashedPassword String?
-  role           String    @default("user")
-  sessions       Session[]
+    id             Int            @default(autoincrement()) @id
+    createdAt      DateTime       @default(now())
+    updatedAt      DateTime       @updatedAt
+    name           String?
+    email          String         @unique
+    hashedPassword String?
+    role           String         @default("user")
+    sessions       Session[]
+    Loginrequest   Loginrequest[]
+    Calendar       Calendar[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
-  createdAt          DateTime  @default(now())
-  updatedAt          DateTime  @updatedAt
-  expiresAt          DateTime?
-  handle             String    @unique
-  user               User?     @relation(fields: [userId], references: [id])
-  userId             Int?
-  hashedSessionToken String?
-  antiCSRFToken      String?
-  publicData         String?
-  privateData        String?
+    id                 Int       @default(autoincrement()) @id
+    createdAt          DateTime  @default(now())
+    updatedAt          DateTime  @updatedAt
+    expiresAt          DateTime?
+    handle             String    @unique
+    user               User?     @relation(fields: [userId], references: [id])
+    userId             Int?
+    hashedSessionToken String?
+    antiCSRFToken      String?
+    publicData         String?
+    privateData        String?
 }
 model Loginrequest {
-  id                 Int       @default(autoincrement()) @id
-  createdAt          DateTime  @default(now())
-  user               User     @relation(fields: [userId], references: [id])
-  userId             Int
-  loginToken		String    @default(uuid()) @unique
+    id         Int      @default(autoincrement()) @id
+    createdAt  DateTime @default(now())
+    user       User     @relation(fields: [userId], references: [id])
+    userId     Int
+    loginToken String   @default(uuid()) @unique
 }
+
+model Calendar {
+    id         		Int      	@default(autoincrement()) @id
+    createdAt  		DateTime 	@default(now())
+	updatedAt       DateTime	@updatedAt
+    user       		User		@relation(fields: [userId], references: [id])
+    userId     		Int
+    name	   		String
+	calendarWindows	CalendarWindow[]
+}
+
+model CalendarWindow {
+ 	id          Int      	@default(autoincrement()) @id
+    createdAt   DateTime	@default(now())
+	updatedAt   DateTime 	@updatedAt
+	calendar    Calendar	@relation(fields: [calendarId], references: [id])
+    calendarId  Int
+	day			Int
+	content		String
+}
```


