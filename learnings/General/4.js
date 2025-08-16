/*

Explain what a single page app is and how to make one SEO-friendly
SPAs is a web application that loads a single HTML Page and dynamically updates the page content as  per user interactions.

SPAs uses AJAX or fetch APIs to interact with the server
It relies on the client side routing to update the page content.

Benefits - 
1. Faster initial load time
2. Less load on the server due to fewer requests

How to make a SPA SEO-friendly?

1. Server-side rendering (SSR)
Server-side rendering involves rendering the initial HTML of the page on the server before sending it to the client. This ensures that search engines can index the fully rendered content.

React: Use Next.js, which provides built-in support for SSR
Vue.js: Use Nuxt.js, which also supports SSR out of the box

2. Static site generation (SSG)
Static site generation involves generating the HTML for each page at build time. This approach is suitable for content that doesn't change frequently.

React: Use Next.js with its static generation capabilities
Vue.js: Use Nuxt.js with its static site generation feature

3. Pre-rendering with tools
Some tools can pre-render your SPA and serve the pre-rendered HTML to search engines.

Prerender.io: A service that pre-renders your JavaScript application and serves the static HTML to search engines
Rendertron: A headless Chrome rendering solution that can be used to pre-render your SPA

*/
