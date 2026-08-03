### Why writing {Tab()} (any component) inside JSX is not advisable

In React, components should be rendered using JSX syntax (<Tab />) and not called like regular functions ({Tab()}).
When you write:
{Tab()} 
1. React treats Tab as a normal JavaScript function, not as a component.
This means React loses control over how the component is rendered and updated.
Correct way: <Tab />

2. Calling Tab() runs the function every time the parent renders, so:
State can reset
Effects may re-run incorrectly
React can only preserve state when it owns the component instance.


### What is the issue with this code?
function MyComponent() {
  const [data, setData] = useState(null);

  fetch("/api/data").then(res => res.json()).then(setData);
}

Ans - setState causes re-render → API call again → infinite loop. That's why we have useEffect in picture

### Why <a> tag is not used in react application and use Link ?
 🚀 SHORT ANSWER - because React apps are SPAs and <Link> keeps them fast and state-safe

What happens with a normal <a> tag?
  <a href="/dashboard">Dashboard</a>

When you click this:
❌ Browser does a full page reload
❌ React app is destroyed and re-initialized
❌ All in-memory state is lost (Redux, Context, component state)
❌ Slower UX

This is how traditional multi-page websites work.

What <Link> does in React
  import { Link } from "react-router-dom";

<Link to="/dashboard">Dashboard</Link>

<Link> comes from React Router and is designed for Single Page Applications (SPA).

When you click <Link>:

✅ URL changes without reloading the page
✅ React Router swaps components internally
✅ App state is preserved
✅ Navigation feels instant

Under the hood
ℹ️ <Link> uses the History API (pushState)
ℹ️ It prevents the browser’s default reload behavior
ℹ️ React Router listens to URL changes and renders the matching component

📝 We should only use a tag when we want to leave our react application like using external websites, emails etc.

### With react router v6,  Defining route like  <Route  path="/" element={Dashboard} /> doesn't work but 
defining it like  <Route  path="/" element={<Dashboard />} /> work?

Ans - React Router v6 expects element to be a ReactElement
That means: It expects already created UI and not a function it needs to call later

So internally, it does something like:

render(element);

NOT:

render(element()); // ❌ it does NOT call your function

⚡ In V5, 

<Route component={Dashboard} />

Here, React Router itself would do: React.createElement(Dashboard)
So you passed the component, and router created the element.

### Why is my image not loading in React when using a path like `src="data/img/logo-light.png"`, and what is the correct way to handle images?**

Ans: 
In React (using tools like Vite or CRA), files inside the `src` folder are **not directly accessible via string paths**. When you write:

<Img src="data/img/logo-light.png" alt="Logo" />

React treats this as a **public URL**, not a local file, so the image fails to load.

To fix this, you have two correct approaches:

1. If the image is inside `src` → Import it

import logo from "../data/img/logo-light.png";
<Img src={logo} alt="Logo" />

This allows the bundler to process and correctly serve the image.

2. If you want to use a direct path → Move it to `public

<Img src="/img/logo-light.png" alt="Logo" />

### What is the typeof null?

Ans - Object