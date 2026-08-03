
module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}


#### --------------------------------- EXPLANATION ----------------------------------------------

# module.exports = { ... }

This is Node.js syntax used to export the configuration.
Tools like Webpack read this object to understand how to process files.

👉 Think: This is the config object Webpack consumes.

# module: { ... }
A key in Webpack config.
Defines how different types of files should be handled
👉 Think: module = rules for handling files

# rules: [ ... ]
An array of rules.
Each rule defines:
1. Condition (test)
2. Action (loader)

# test: /\.m?js$/
A regular expression to match files

Matches:
.js
.mjs (ES Modules)
- Breakdown:
\.js → matches .js
m? → optional m

# exclude: /node_modules/

Prevents processing files inside node_modules.

Why?
1. Dependencies are already compiled
2. Improves build performance
3. Avoids breaking third-party code

# use: { loader: 'babel-loader' }

Uses babel-loader to process matched files.

What it does:
Sends JavaScript files to Babel
Babel transforms them into compatible JavaScript

👉 Acts as a bridge between Webpack and Babel

# options: { ... }

Configuration passed to Babel

# presets
presets: ['@babel/preset-react','@babel/preset-env']
a) @babel/preset-react

Converts JSX into JavaScript

Example:
<div>Hello</div>
➡️ becomes:
React.createElement("div", null, "Hello")

b) @babel/preset-env

Converts modern JavaScript into compatible JavaScript.

Example:
const add = () => {}
➡️ converted for older browsers

Benefits:
Supports older browsers
Automatically applies needed transformations

# plugins
plugins: ['@babel/plugin-transform-runtime']

What it does:
Prevents duplication of helper functions across files. Babel injects helper functions inside every file. So, "@babel/plugin-transform-runtime avoids duplication by moving Babel helper functions into reusable imports from @babel/runtime instead of inlining them in every file."

Without plugin: Same helper code repeated in multiple files

With plugin: Helpers reused → smaller bundle size