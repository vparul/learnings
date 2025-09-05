/*
What is react
React is an open source javascript library which is used to create single page applications. 
 Characteristics - 
 1. Follow component based architecture - React enables you to create component which can be reused across application
 2. It uses Virtual DOM, which is the virual representation of the actual DOM, for efficient updates
 3. Large community

 Disadvantages - 
1. Learning curve: JSX, hooks, and state management can be tricky at first.
2. Not a full framework: Needs extra libraries for routing, forms, etc.
3. Too many choices: Ecosystem fragmentation → decision fatigue.
4. Performance pitfalls: Misused hooks/props can cause re-renders.
5. SEO issues: Needs SSR (Next.js, etc.) for proper indexing.
 


2. What is the difference between React Node, React Element, and a React Component?
React Node - React Node is anything that can be rendered through React. It can be a string, boolean, React Element or null
Ex - 
const stringNode = 'Hello, world!';
const numberNode = 123;
const booleanNode = true;
const nullNode = null;
const elementNode = <div>Hello, world!</div>;

React Element - React Element is the smallest building block. It is usually what you see on the screen
Ex - <h1> Hello World </h1>
Interally, React converts this into the immutable JS object,
{
    type: "h1",
    props: {
        children: "Hello World"
    }
}

React Component - This is the reusable piece of the UI that accepts an input (prop) and return a react element.
*/