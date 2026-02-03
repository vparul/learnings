## What Are Hooks?

Hooks are special functions introduced in React 16.8 that let you use state and other React features (like lifecycle methods) without writing a class.

Examples:
useState() → state management
useEffect() → side effects (like fetching data or updating the DOM)
useContext(), useRef(), useMemo(), useCallback(), etc.

## Benefits of Using Hooks
1. Simpler, More Readable Code
Hooks let you manage state and logic directly inside functional components — no need for class components, constructors.

2. Reuse Stateful Logic Easily
Hooks make it easy to share logic between components using custom hooks — without changing the component hierarchy or using higher-order components.

## The Rules of Hooks
# 1. Only Call Hooks at the Top Level
Don’t call Hooks inside loops, conditions, or nested functions.
Always call them at the top level of your React function.

# WHY?
React does not identify Hooks by name.It identifies them by the order in which they are called.

❌ Example (wrong)
function Counter({ show }) {
  if (show) {
    const [count, setCount] = useState(0);
  }

  const [name, setName] = useState("Parul");
}

What React expects
Render 1 (show = true)
1st Hook → count
2nd Hook → name

Render 2 (show = false)
1st Hook → name

⚠️ React thinks:
name is actually count
state values get mixed up
bugs appear that are VERY hard to debug

# If the order changes:
- React reads the wrong state
- effects run incorrectly
- components break silently

## Hooks must be called in the same order on every render — calling them at the top level guarantees that.

# Why React chose this design
1. Avoids slow lookups
2. keeps Hooks fast
3. works without extra syntax
4. keeps React small and predictable

Trade-off: you follow the rules

# 2: Only Call Hooks from React Functions
Call Hooks only inside React functional components
Custom Hooks (functions whose names start with use)

🛠️ React Enforces These Rules
If you use ESLint, you can add this rule to automatically catch violations:
npm install eslint-plugin-react-hooks --save-dev

----------------