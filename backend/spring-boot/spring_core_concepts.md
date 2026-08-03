Spring Core principles - 

1. Inversion of control (IoC) is a software design pricinple that define how objects are created and managed in a program. It doesnt create the object itself but outlines a way of their creation and dependency management.

With IoC, instead of the pprogrammer managing the flow of the application, a framework takes over this responsibility , ensuring objects and their dependencies are handled automatically.

Normally, in java, we create object using new keyword
With IoC, Spring manages the object creation and dependencies. So, it reduces the manual coding and makes application more flexible.

2. Dependency Injection (DI)
Dependency Injection (DI) is a design pattern where an object receives the dependencies it needs from an external source instead of creating them itself. It promotes loose coupling, easier testing, and better maintainability either through constructur or getter setters.

The easiest way to remember the difference is:

IoC (Inversion of Control) is the concept/principle.
DI (Dependency Injection) is the mechanism/technique used to achieve that principle.

3. Bean
A spring bean is any normal java class that is instantiated and managed by the Spring IoC container. These beans form the backbone of a Spring application, represenying its key components or services.

Since, bean is a java class only, then why not call them java class?
Java Class/Object → A regular object that you create and manage yourself.
Spring Bean → An object whose creation, configuration, and lifecycle are managed by the Spring container.
Since, they solve two different purpose, we have two names.

The Spring IoC container manages the entire lifecycle of the bean including its creation, initialization, scope and desctruction. It also ensures that any required dependencies are injected into the bean as needed.

4. Spring IoC container (BeanFactory)
The IoC container is the core of the Spring framework. It's main job is to manage the objects (beans) in your application. It is responsible for -
    1. Managing object creation and wiring dependencies between objects.
    2. Creating, configuring and assembling beans based on configuration metadata.
    3. Handling the complete lifecycle of beans from instantiation to destruction.

The IoC container is represented by the BeanFactory interface which provides the basic functionality for managing beans.

5. Spring Context (ApplicationContext)
The Spring context is a more advanced container that 
 - extends beanFactory
 - Add Enterprise features:
   - Internationalization support
   - Environments & Profilers
   - Auto scanning and annotations


