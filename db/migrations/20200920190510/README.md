# Migration `20200920190510`

This migration has been generated at 9/20/2020, 9:05:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
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
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200920185253..20200920190510
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
@@ -55,10 +55,22 @@
     user       		User		@relation(fields: [userId], references: [id])
     userId     		Int
     name	   		String
 	calendarWindows	CalendarWindow[]
+	shareKeys		ShareKey[]
 }
+model ShareKey {
+	id         		Int      	@default(autoincrement()) @id
+    createdAt  		DateTime 	@default(now())
+	updatedAt       DateTime	@updatedAt
+    user		    User		@relation(fields: [createdBy], references: [id])
+    createdBy     	Int
+	calendar    	Calendar	@relation(fields: [calendarId], references: [id])
+    calendarId  	Int
+	key				String		@default(uuid())
+}
+
 model CalendarWindow {
  	id          Int      	@default(autoincrement()) @id
     createdAt   DateTime	@default(now())
 	updatedAt   DateTime 	@updatedAt
```


