Micro frontend architecture is a design approach that breaks large, monolithic web applications into smaller, independent, and manageable modules, often called "child" apps or modules. Each part is developed, tested, and deployed independently by specialized, cross-functional teams, allowing for different technology stacks and enhanced scalability. 

In Webpack Module Federation, there are only 2 real roles:

1. Host (a.k.a Container)
Loads other apps
Consumes remote modules
Entry point of your system (usually)
2. Remote
Exposes modules/components
Gets consumed by host (or even other remotes)

Major Categories of Integrations -
1. Built-time (Compile time integration): Before container gets loaded in the browser, it gets access to remote source code

Example -> 

Engineering team develops ProductList (MFE application)
        |
        |
    Time to deploy
        |
        |
Publish ProductList as an NPM package ----> NPM Registry (ProductList)
        |
        |
Team in charge of Container installs ProductList as a dependency
        |
        |
Container team builds their app
        |
        |
Output bundle that includes all the code for productList

Pros of this approach - 
- Easy to setup and understand 

Cons of this approach 
- Container has to re-deploy every time ProductList is updated.
- Tempting to tightly couple the container + productList together.

2. Run-time (Client side integration): After container gets loaded in the browser, it gets access to the remote source code

Engineering team develops ProductList (MFE application)
        |
        |
    Time to deploy
        |
        |
ProductList code deployed at https://my-app.com/productList.js
        |
        |
User navigates to my-app.com, Container app is loaded.
        |
        |
    Container app fetches productlist.js and executes it.

Pros of this approach - 
- productList can be deployed independently at any time.
- Different versions of ProductList can be deployed and container can decide which one to use.

Cons of this approach 

- Tooling + setup is far more complicated

3. Server Integration: While sending down JS to load up container, a server decided on whether or not to include remote source.


## In Micro Frontend architecture, any app can be both a host and a remote simultaneously.
