## Critical Rendering Path

- Network optimization means reducing the time required to download the resources the browser needs to render a page — HTML, CSS, JavaScript, fonts, and images.
The goal is to make the page render faster, especially the first visible content and the Largest Contentful Paint (LCP).

# How network requests affect CRP
1. Browser requests HTML
DNS → TCP/TLS connection (when needed) → HTTP request

2. HTML starts downloading and parsing
Browser discovers CSS, JavaScript, fonts and images.

3. Critical resources are downloaded
CSS can block rendering; classic scripts can block HTML parsing.

4. Browser renders the page
DOM + CSSOM → Render tree → Layout → Paint → Composite

The key idea: the browser cannot render styled content until the necessary CSS is available and processed. If critical resources are slow to download, rendering is delayed.


## Minimise Network Requests


