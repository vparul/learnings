/*
NPM vs NPX

NPM (Node package manager) 
1. It download and manages the packages.
2. It downloads the package in the node_module and -g (if globally)
3. Once downloaded, you can use it anytime even in offline mode since, it is now downloaded locally
4. You have to manually update the version of the package.
ex - 1. npm install react;
     2. npm install -g react;


NPX (Node package executor)
1. Used for run/execute the packages
2. Downloads the package temporariry if not already installed 
3. Always uses the latest version of the package
4. No clutter in your system (removes after execution).
5. Needs internet if the package is not installed locally.

Example:

npx create-react-app my-app
npx cowsay "Hello"


When to use npm
- You want to keep the package for repeated use.
- Installing dependencies inside your project (React, Express, Lodash, etc.).
- Installing dev tools you’ll use often (eslint, prettier, jest).


When to use npx
- You want to run a package once without keeping it.
- Running one-time CLIs (e.g., create-react-app, vite, next).
- Trying out a package before deciding to install it.
- Running a command from a package that’s already in node_modules (npx will find and run it).


*/
