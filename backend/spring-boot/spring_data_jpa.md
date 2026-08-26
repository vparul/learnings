## spring.jpa.hibernate.ddl-auto

With this property, the hibernate decides what to do with your database schema.

# What does ddl-auto means?
Hibernate can auto manage your DB schema(table, columns, constraints) every time your app starts. Depending on the value, it can create, update, validate or delete your schema.

COMMON VALUES - 
1. create - Building Mode (with Demolition)
It drops the existing table and create new ones.All existing data will be lost
You can use it for early development and testing fresh schema.

2. create-drop - Temporary Builder
It create the table on startup and drops them on shutdown.
You can use it for unit testing and in memory databases.

3. create-only
It only create schema. No dropping.
You can use it during initial migration or clean tables.

4. drop
it drops all tables. It is the responsibility of the developer to handle the creation on table.
You can use mostly for tools or scripted cleanup.

5. none - No interference Mode
Hibernate will not manage the schema. The database admin will handle the creation and delete the schema.
It is recommended for the production.

6. truncate - 
Delete all the rows but keep the table structure. This means that whenever you start the application, all the data will be dropped but structure will remain the same.
You can use it for resetting the test data without dropping the tables.

7. update - Auto-fix mode
It update the schema if necessary (add columns, tables)
Not safe for production - can break schema or cause silent issues

8. validate - Inspector mode
Check if DB schema matches entities. No changes made. 
Use case: Staging/Prod

