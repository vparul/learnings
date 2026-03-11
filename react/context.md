The Context API is a built-in React feature that allows you to share data across your component tree without passing props manually at every level.

# The Problem It Solves: Prop Drilling

Imagine you have deeply nested components that all need access to the same data (like a logged-in user, theme, or language preference):

App (has user data)
 └── Layout
      └── Sidebar
           └── UserProfile  ← needs user data

Without Context, you'd have to pass user as a prop through every intermediate component — even ones that don't use it. This is called prop drilling, and it becomes messy and hard to maintain.

Context allows you to broadcast the global state to the entire app.

# Building Blocks - 

1. Provider - Gives all child components access to the VALUE.
2. value - data that we want to make available (usually state and functions)
3. Consumers - All components that read the provided context value.

# IF VALUE IS UPDATED, ALL CONSUMERS WILL RE-RENDER.