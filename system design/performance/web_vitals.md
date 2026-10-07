## Web Vitals are a set of metrics used to measure the real user experience of a web application.

## Core Web Vitals are a specific subset of Web Vitals that Google considers especially important for the overall user experience.

1. ## FCP — First Contentful Paint (Web Vital)
FCP measures how long it takes for the browser to render the first piece of DOM content on the screen.

That content could be:
Text
Image
SVG
Canvas
Non-white background element

# Example
Imagine the user opens:example.com

Initially:

0 ms
┌──────────────────────┐
│                      │
│     Blank page       │
│                      │
└──────────────────────┘

Then after 800 ms:

800 ms
┌──────────────────────┐
│ Welcome to Shop      │ ← First content
│                      │
└──────────────────────┘

FCP:

FCP = 800 ms

# What affects FCP?
Common causes of slow FCP:

- Large CSS files
- Large JavaScript bundles
- Render-blocking CSS/JS
- Slow server response
- Poor caching
- Slow fonts
- Network latency

Good FCP
As a general rule:
≤ 1.8s       Good
1.8s – 3.0s  Needs improvement
> 3.0s        Poor

# FCP does not mean the page has finished loading. It only means the first piece of content has appeared

2. ## Largest Contentful Paint (Core Web Vital)

LCP measures how long it takes for the largest visible element in the viewport to render.

# Example

Suppose you have an e-commerce homepage:

┌────────────────────────────────────┐
│ Navbar                             │
│                                    │
│      BIG HERO IMAGE                │
│                                    │
│      "Summer Collection"           │
│                                    │
└────────────────────────────────────┘

The hero image may be the largest element visible in the viewport.

If it finishes rendering at:

2.2 seconds

then:

LCP = 2.2 seconds

# What can be the LCP element?
1. <img>
2. Large background image
3. Large heading
4. Large block of text
5. Video poster/image

# What causes poor LCP?

Slow server response
Large images
Unoptimized images
Render-blocking CSS
Large JavaScript bundles
Slow fonts
Client-side rendering delays
Poor CDN configuration

3. ## FID — First Input Delay (Web Vital but deprecated)

FID measures After the user interacts for the first time, how long does the browser take to respond?

Examples of interactions:

1. Clicking a button
2. Clicking a link
3. Tapping something
4. Typing into an input

# Example

Imagine:
User clicks "Login"
       ↓
Browser is busy executing JavaScript
       ↓
200 ms delay
       ↓
Click handler starts

FID = 200ms

# Why does this happen?

A common reason is a busy main thread.

For example:

JavaScript task
──────────────────────────────
██████████████████████████████
                            ↑
                         User clicks

The browser cannot immediately process the click because it is busy executing the long JavaScript task.

FID has been replaced by INP as a Core Web Vital.

FID was useful for measuring the first interaction, but real applications have many interactions.

For example:

Click 1 → fast
Click 2 → fast
Click 3 → slow
Click 4 → slow
Click 5 → slow

FID could miss the later problems.

That's why Google replaced FID with INP.

4. # CLS — Cumulative Layout Shift (Core Web Vital)
CLS measures unexpected visual movement of content while the page is loading.

# Example

Imagine you're about to click:

┌──────────────────────────┐
│ Buy Now                  │
└──────────────────────────┘

Suddenly an image loads above it:

┌──────────────────────────┐
│       Product Image      │
└──────────────────────────┘

┌──────────────────────────┐
│ Buy Now                  │
└──────────────────────────┘

The button moved.

You may accidentally click something else.

That's a layout shift.

# Why is CLS bad?

It creates:
- Poor user experience
- Accidental clicks
- Difficulty reading
- Frustration
- Poor visual stability

# Common causes of CLS

1. Images without dimensions

Bad:

<img src="product.jpg">

The browser doesn't initially know how much space the image needs.

Better:

<img
  src="product.jpg"
  width="800"
  height="600"
  alt="Product"
/>

Or reserve space using CSS/aspect ratio.

2. Dynamically injected content

For example:

Page loaded
     ↓
API response arrives
     ↓
Banner inserted at the top
     ↓
Everything moves down


3. Web fonts

A font swap can cause text dimensions to change and move surrounding content.

5. # INP — Interaction to Next Paint (Core Web Vital)

INP measures how responsive a page is to user interactions throughout the user's visit.

# Why was INP introduced?
Because users don't interact with a page only once.

Imagine:

Page loads
   ↓
User clicks menu
   ↓
User opens dropdown
   ↓
User types search
   ↓
User changes filter
   ↓
User opens modal
   ↓
User submits form

Any of these interactions can become slow.


# Example
User clicks "Open Menu"
       ↓
50ms JavaScript
       ↓
30ms rendering
       ↓
20ms painting
       ↓
Menu appears

Approximately: Interaction latency = 100ms

# What causes poor INP?

1. Long JavaScript tasks
2. Expensive React renders
3. Too many DOM updates
4. Heavy event handlers
5. Large component trees
6. Expensive calculations
7. Synchronous JavaScript
8. Excessive third-party scripts