# Migration `20201102211109`

This migration has been generated at 11/2/2020, 10:11:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Calendar" ADD COLUMN     "lastUpdateById" INTEGER

ALTER TABLE "CalendarWindow" ADD COLUMN     "lastUpdateById" INTEGER
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201027140747..20201102211109
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
@@ -12,21 +12,23 @@
 // --------------------------------------
 model User {
-    id             	Int            @default(autoincrement()) @id
-    createdAt      	DateTime       @default(now())
-    updatedAt      	DateTime       @updatedAt
-    name           	String?
-    email          	String         @unique
-    hashedPassword 	String?
-    role           	String         @default("user")
-    sessions       	Session[]
-    Loginrequest   	Loginrequest[]
-    Calendar       	Calendar[]
-	plan			String?
-	active			Boolean			@default(false)
-	createdRoles    Role[] 			@relation("RoleCreatedBy")
+    id             				Int            		@default(autoincrement()) @id
+    createdAt      				DateTime       		@default(now())
+    updatedAt      				DateTime       		@updatedAt
+    name           				String?
+    email          				String         		@unique
+    hashedPassword 				String?
+    role           				String         		@default("user")
+    sessions       				Session[]
+    Loginrequest   				Loginrequest[]
+    Calendar       				Calendar[]
+	plan						String?
+	active						Boolean				@default(false)
+	createdRoles    			Role[] 				@relation("RoleCreatedBy")
+	calendarLastUpdates			Calendar[]			@relation("CalendarLastUpdateBy")
+	calendarWindowLastUpdates	CalendarWindow[]	@relation("CalendarWindowLastUpdateBy")
 }
 model Session {
     id                 Int       @default(autoincrement()) @id
@@ -42,19 +44,21 @@
     privateData        String?
 }
 model Loginrequest {
-    id         Int      @default(autoincrement()) @id
-    createdAt  DateTime @default(now())
-    user       User     @relation(fields: [userId], references: [id])
-    userId     Int
-    loginToken String   @default(uuid()) @unique
+    id         		Int      	@default(autoincrement()) @id
+    createdAt  		DateTime 	@default(now())
+    user       		User     	@relation(fields: [userId], references: [id])
+    userId     		Int
+    loginToken 		String   	@default(uuid()) @unique
 }
 model Calendar {
     id         		Int      	@default(autoincrement()) @id
     createdAt  		DateTime 	@default(now())
 	updatedAt       DateTime	@updatedAt
+	lastUpdateBy	User?		@relation("CalendarLastUpdateBy", fields: [lastUpdateById], references: [id])
+	lastUpdateById	Int?
     user       		User		@relation(fields: [userId], references: [id])
     userId     		Int
 	options			String?
     name	   		String
@@ -73,15 +77,17 @@
 	key				String		@default(uuid())
 }
 model CalendarWindow {
- 	id          Int      	@default(autoincrement()) @id
-    createdAt   DateTime	@default(now())
-	updatedAt   DateTime 	@updatedAt
-	calendar    Calendar	@relation(fields: [calendarId], references: [id])
-    calendarId  Int
-	day			Int
-	content		String
+ 	id          	Int      	@default(autoincrement()) @id
+    createdAt   	DateTime	@default(now())
+	updatedAt   	DateTime 	@updatedAt
+	lastUpdateBy	User?		@relation("CalendarWindowLastUpdateBy", fields: [lastUpdateById], references: [id])
+	lastUpdateById	Int?
+	calendar    	Calendar	@relation(fields: [calendarId], references: [id])
+    calendarId  	Int
+	day				Int
+	content			String
 }
 model Payment {
 	id          	Int      	@default(autoincrement()) @id
@@ -117,14 +123,14 @@
 	role			String
 }
 model UserInvite {
-	id          Int      	@default(autoincrement()) @id
-	createdAt   DateTime	@default(now())
-	updatedAt   DateTime 	@updatedAt
-	user		User		@relation(fields: [createdBy], references: [id])
-    createdBy   Int
-	email		String
-	calendar    Calendar?	@relation(fields: [calendarId], references: [id])
-    calendarId  Int?
-	role		String?
+	id         		Int      	@default(autoincrement()) @id
+	createdAt   	DateTime	@default(now())
+	updatedAt   	DateTime 	@updatedAt
+	user			User		@relation(fields: [createdBy], references: [id])
+    createdBy   	Int
+	email			String
+	calendar    	Calendar?	@relation(fields: [calendarId], references: [id])
+    calendarId  	Int?
+	role			String?
 }
```


