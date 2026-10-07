In real world apps. data is often connected (eg customer has an address, a book has an author). JPA relationships helps these model the connections btw entities(tables) in your databases.

- JPA relationships define how one entity connects to another
- They help in maintaining data consistency and navigating between the entities.
- These relationships mimic foreign key relationships in databases

4 types of relationships - 
1. OneToOne: One entity is linked to exactly one other entity. (ex- one user will only have one password)
2. OneToMany: One entity is linked to multiple entities (ex - one company can have multiple jobs)
3. ManyToOne: Multiple entities are linked to one entity (ex - multiple jobs can have one comany record)
4. ManyToMany: Multiple entities are linked to multiple entities.



## EXPLAIN

@OneToMany(
    mappedBy = "order",
    cascade = CascadeType.ALL,
    orphanRemoval = true
)
private List<OrderItem> items;

mappedBy      → Who owns the relationship? It tells JPA that the foreign key is managed by the specified field on the other entity.
cascade       → What happens to child when parent operation happens?
orphanRemoval → What happens to child when removed from parent's collection?

-- mappedBy refers to the Java field name, not the database column:

mappedBy = "order"       // ✅
mappedBy = "order_id"   // ❌

2. cascade → Propagate operations

cascade tells Hibernate: "When I perform an operation on the parent, should that operation also happen to the children?"


## EXPLAIN

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;



## What is bidirectional Relationship?
In JPA, a bidirectional relationship means:
- Both entities know about each other
- You can navigate the relationship in both directions.

Ex - 
Company -> has many jobs(one to many)
Jobs -> belong to one company (Many to one)
 because both sides reference each other, the relationship become bidirectional.

 From company, you can get all its jobs (company.getJobs())
 From Job, you can get the company it belongs to (job.getCompany())

 ## In these cases, who owns the relationship?
 From JPA perspective:
 Job is the owner - Because it has the foreign key column "company_id"

 Company is in the "inverse" (opposite) side

This prevents duplicate join tables and keep the database clean.

