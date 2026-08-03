difference btw memory and file and file + auto server?

# H2 Database Modes

## 1. In-Memory Database

```properties
spring.datasource.url=jdbc:h2:mem:testdb
```

### Characteristics

- Stored in RAM
- Very fast
- No database files created
- Data is lost when application stops

### Use Cases

- Unit Testing
- Learning Spring Boot
- Temporary Data

### Lifecycle

```text
App Starts
    ↓
Database Created in Memory
    ↓
Data Stored
    ↓
App Stops
    ↓
Database Deleted
```

---

## 2. File-Based Database

```properties
spring.datasource.url=jdbc:h2:file:./data/testdb
```

### Characteristics

- Stored on disk
- Creates `.mv.db` files
- Data survives restart
- Slightly slower than memory mode

### Use Cases

- Local Development
- Persistent Data Storage

### Lifecycle

```text
App Starts
    ↓
Database File Opened
    ↓
Data Stored
    ↓
App Stops
    ↓
Data Remains on Disk
```

---

## 3. AUTO_SERVER Mode

```properties
spring.datasource.url=jdbc:h2:file:./data/testdb;AUTO_SERVER=TRUE
```

### Purpose

Allows multiple applications/processes to access the same H2 file database simultaneously.

### Without AUTO_SERVER

```text
Spring Boot App → Opens DB
H2 Console     → ❌ Database already in use
```

### With AUTO_SERVER

```text
Spring Boot App → Opens DB
H2 Console     → ✅ Connects
Another App    → ✅ Connects
```

### Important

Works only with:

```properties
jdbc:h2:file:...
```

Does NOT work with:

```properties
jdbc:h2:mem:testdb
``