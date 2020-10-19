# Migration `20201016063607`

This migration has been generated at 10/16/2020, 8:36:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Calendar" ADD COLUMN     "options" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201006170631..20201016063607
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
@@ -53,8 +53,9 @@
     createdAt  		DateTime 	@default(now())
 	updatedAt       DateTime	@updatedAt
     user       		User		@relation(fields: [userId], references: [id])
     userId     		Int
+	options			String?
     name	   		String
 	calendarWindows	CalendarWindow[]
 	shareKeys		ShareKey[]
 }
```


