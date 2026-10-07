## What are the fetch types in JPA?

Fetch types define when related entities are loaded from the detabase. When you define relationships like @OneToMany, @OneToOne, @ManyToMany, JPA needs to know:
Should the related data be loaded immediately when the parent is loaded?
 or should it be loaded later, only when needed?

 That's where fetch = FetchType.Lazy or fetch = FetchType.Eager comes in:

 - EAGER: Fetch immediately - Loads the related entity right away 
 - LAZY: Fetch when accessed (on demand) - Loads the related entity only when used.

 Default Fetch Types: 
 1. @OneToOne - EAGER 
 2. @ManyToOne - EAGER
 3. @OneToMany - LAZY
 4. @ManyToMany - LAZY

