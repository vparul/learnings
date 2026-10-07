## What are CASCADE types in JPA?

If i do something to the parent entity, automatically do it to the child entity too. 


## Why do we use cascade?
1. To reduce boilerplate code
2. To avoid manually saving/deleting related entities
3. To keep entities in sync automatically


#Available Cascade types - 
1. PERSIST - Saved the child entity when the parent is saved.
2. MERGE - Updates the child entity when the parent is updated.
3. REMOVE - Deletes the child entity when the parent is deleted.
4. REFRESH - Refreshed the child when parent is refreshed from DB.
5. DETACH - Detaches the child from the persistence context when parent is detached.
6. ALL - Applies all the above actions.


## What is persistence context?

A Persistence Context is a collection of managed entity objects that are currently being tracked by the JPA/Hibernate EntityManager.


## What is @OnDelete(action = OnDeleteAction.CASCADE)?
