# Migration `20201026070923`

This migration has been generated at 10/26/2020, 8:09:23 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "plan" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
)

CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "userId" INTEGER,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Loginrequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "loginToken" TEXT NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Calendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "options" TEXT,
    "name" TEXT NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "ShareKey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE
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

CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "asset_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calendarId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "UserInvite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")

CREATE UNIQUE INDEX "Loginrequest.loginToken_unique" ON "Loginrequest"("loginToken")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201023092759..20201026070923
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
@@ -24,9 +24,9 @@
     Loginrequest   	Loginrequest[]
     Calendar       	Calendar[]
 	plan			String?
 	active			Boolean			@default(false)
-	shareKeys     	ShareKey[] 		@relation("UserShareKey")
+	createdRoles    Role[] 			@relation("RoleCreatedBy")
 }
 model Session {
     id                 Int       @default(autoincrement()) @id
@@ -69,12 +69,9 @@
     user		    User		@relation(fields: [createdBy], references: [id])
     createdBy     	Int
 	calendar    	Calendar	@relation(fields: [calendarId], references: [id])
     calendarId  	Int
-	key				String?		@default(uuid())
-	email			String?
-	sharedWith     	User?   	@relation("UserShareKey", fields: [userId], references: [id])
-    userId          Int?
+	key				String		@default(uuid())
 }
 model CalendarWindow {
  	id          Int      	@default(autoincrement()) @id
@@ -106,5 +103,28 @@
 	user       		User    	@relation(fields: [userId], references: [id])
     userId     		Int
 	asset_id		String
 	url				String
+}
+
+model Role {
+	id          	Int      	@default(autoincrement()) @id
+	calendar    	Calendar	@relation(fields: [calendarId], references: [id])
+    calendarId  	Int
+    createdByUser   User   		@relation("RoleCreatedBy", fields: [createdBy], references: [id])
+	createdBy       Int
+	user       		User		@relation(fields: [userId], references: [id])
+    userId     		Int
+	role			String
+}
+
+model UserInvite {
+	id          Int      	@default(autoincrement()) @id
+	createdAt   DateTime	@default(now())
+	updatedAt   DateTime 	@updatedAt
+	user		User		@relation(fields: [createdBy], references: [id])
+    createdBy   Int
+	email		String
+	calendar    Calendar	@relation(fields: [calendarId], references: [id])
+    calendarId  Int
+	role		String
 }
```


