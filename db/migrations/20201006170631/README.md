# Migration `20201006170631`

This migration has been generated at 10/6/2020, 7:06:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "asset_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200920190510..20201006170631
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
@@ -91,5 +91,14 @@
 	amount			Int
 	plan			String
 	completed		Boolean		@default(false)
 	provider		String
+}
+
+model Image {
+	id          	Int      	@default(autoincrement()) @id
+    createdAt   	DateTime	@default(now())
+	user       		User    	@relation(fields: [userId], references: [id])
+    userId     		Int
+	asset_id		String
+	url				String
 }
```


