# PERFORMANCE OPTIMIZATION WAYS - 
1. Prevent wasted renders
    - memo
    - useMemo hook
    - useCallback hook
    - Passing elements as children or regular props

2. Improve app speed/responsiveness
    - useMemo
    - useCallback
    - useTransition

3. Reduce bundle size
    - Using fewer 3rd party packages
    - Code splitting and lazy loading 

# WHEN DOES A COMPONENT INSTANCE RE-RENDER?
1. State Changes
2. Context value changes
3. Parent re-renders: It creates the false impression that changing props re-renders a component. This is NOT True.

## NOTE:: A render does not mean that the DOM actually gets updated. It just means that the component functions get called. But this can be an expensive operation.

## WASTED RENDER: A render that didin't produce any change in the DOM.

🙋‍♀️ HOW PASSING children as a prop help with re-rendering?

When we write JSX:

<Child />

React converts it into a React Element object.

Example:

{
  type: Child,
  props: {}
}

Important rule:

Every time JSX executes → a new React element object is created

Case 1: Child Created Inside Parent

function Parent() {
  return <Child />;
}

function Child() {
  console.log("Child render");
  return <p>Child</p>;
}

# What happens on re-render

When Parent re-renders:

Parent render
   ↓
<Child /> executed again
   ↓
New React element created
   ↓
React renders Child again

Result
Parent render → Child render

Child always re-renders because Parent recreates it.

Case 2: Child Passed as children

function Parent({ children }) {
  return <div>{children}</div>;
}

function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}
What happens

Step 1 – App renders

App creates <Child />

Step 2 – App passes it to Parent

Parent(children = ChildElement)

Step 3 – Parent renders

<div>{children}</div>

Parent does not recreate <Child />.

It only displays the same object reference.

On Parent re-render
Parent render
   ↓
same children reference
   ↓
React reuses existing child

Result

Parent render
Child does NOT re-render

## NOTE - 
When JSX is created inside a component, a new React element object is created on every render.
If the parent creates the child element, the child will re-render on every parent render.
But when JSX is passed as children, the parent only receives the element and does not recreate it, so React can reuse the existing element and avoid re-rendering.