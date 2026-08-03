# logging.pattern.console

in application.properties file

1. logging.pattern.console=${CONSOLE_LOG_PATTERN:%green(%d{HH:mm:ss.SSS}) %blue(%-5level) %red([%thread]) %yellow(%logger{15}) - %cyan(%msg%n)}

This springboot property is used to customise how logs appear in the console.
- It controls how log messages appear in the console output.
- Defines the format, structure and styling of log entries.



----------------------------------------------------------------------------------------------------------
# spring.sql.init.mode

`spring.sql.init.mode` is a Spring Boot property that controls whether Spring Boot should automatically execute SQL initialization scripts during application startup.

These scripts are typically:

- `schema.sql` → Creates tables, indexes, constraints, etc.
- `data.sql` → Inserts initial data into tables.

---

## Why is it needed?

Suppose you have:

### schema.sql

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100)
);
```

### data.sql

```sql
INSERT INTO users VALUES (1, 'Parul');
```

When the application starts, Spring Boot can automatically execute these files.

The `spring.sql.init.mode` property controls whether this initialization happens.

# Property Values

## 1. always

```properties
spring.sql.init.mode=always
```

Runs `schema.sql` and `data.sql` every time the application starts.

### Works With

- MySQL
- PostgreSQL
- Oracle
- SQL Server
- H2
- Any supported database

### Startup Flow

```text
Application Starts
       ↓
Database Connection Created
       ↓
schema.sql Executes
       ↓
data.sql Executes
       ↓
Application Ready
```

### Use Cases

- Local Development
- Testing
- Demo Applications

---

## 2. embedded (Default)

```properties
spring.sql.init.mode=embedded
```

### Behavior

Runs SQL scripts only when using an embedded database.

### Embedded Databases

- H2
- HSQLDB
- Apache Derby

### Example

#### H2 Database

```properties
spring.datasource.url=jdbc:h2:mem:testdb
```

Result:

```text
schema.sql  -> Executed
data.sql    -> Executed
```

#### MySQL Database

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
```

Result:

```text
schema.sql  -> Not Executed
data.sql    -> Not Executed
```

### Use Cases

- Learning Spring Boot
- Quick Prototypes
- In-memory Databases

---

## 3. never

```properties
spring.sql.init.mode=never
```

### Behavior

Spring Boot never executes:

- schema.sql
- data.sql

even if the files exist.

### Use Cases

When database management is handled by:

- Flyway
- Liquibase
- DBA Scripts
- Manual SQL Execution

# Related Properties

## Custom Schema Location

```properties
spring.sql.init.schema-locations=classpath:my-schema.sql
```

Spring executes:

```text
my-schema.sql
```

instead of:

```text
schema.sql
```

---

## Custom Data Location

```properties
spring.sql.init.data-locations=classpath:my-data.sql
```

Spring executes:

```text
my-data.sql
```

instead of:

```text
data.sql
```

---

## Continue Even If Script Fails

```properties
spring.sql.init.continue-on-error=true
```

### Default

```properties
false
```

### Example

If one SQL statement fails:

```sql
INSERT INTO unknown_table VALUES (1);
```

Application startup continues when:

```properties
spring.sql.init.continue-on-error=true
```