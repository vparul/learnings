
### ---------------------------  FOR REMOTE APPLICATION --------------------------- 
new ModuleFederationPlugin({
    name: "products",
    filename: "remoteEntry.js", (or anything you want)
    exposes: {
            "./ProductsIndex": "./src/index"
    }
})

## This turns your products app into a remote container that exposes some of its internal modules so other apps can import them dynamically at runtime


1. name: "products"
This is the unique global name of your container.
It becomes a key on the window object in the browser.

After loading: window.products

Other apps use this name to reference your remote.

2. filename: "remoteEntry.js"
This is the entry file that represents your entire remote container.
Webpack generates this file.

This file:

Knows what modules you expose
Handles loading them dynamically
Manages shared dependencies

3. exposes
exposes: {
  "./ProductsIndex": "./src/index"
}

This is the core of Module Federation.

Left side ("./ProductsIndex"):
👉 Public name (what other apps will import)
Right side ("./src/index"):
👉 Actual file in your project

### --------------------------- FOR CONTAINER (HOST) APPLICATION ---------------------------------------------

new ModuleFederationPlugin({
  name: "container",
  remotes: {
    products: "products@http://localhost:8081/remoteEntry.js",
  }
})

## This turns your app into a host/container that can consume modules from another app (remote).

1. name: "container"

Name of your host app
Mostly useful if this app also exposes modules
Otherwise not heavily used

2. remotes
remotes: {
  products: "products@http://localhost:8081/remoteEntry.js"
}

- products (left side)
Alias used inside your code
import Products from "products/ProductsIndex";

- "products@http://localhost:8081/remoteEntry.js"

Split this:

1. "products" (before @)
Must match remote’s name
name: "products"

2. URL
http://localhost:8081/remoteEntry.js
Where the remote is hosted
This file exposes everything


So internally:
products/ProductsIndex
means:
👉 Go to window.products
👉 Call get("./ProductsIndex")

-----------------------------------------------------------------------------------------------------------
## index.js vs bootstrap.js (VERY IMPORTANT)
This is one of the most misunderstood parts.

❌ Without bootstrap (WRONG in MF)
// index.js
import App from "./App";
ReactDOM.render(<App />, root);

Problem:
React app starts immediately
But remotes are async
Leads to:
shared dependency issues
version conflicts
runtime errors


✅ With bootstrap (CORRECT)
🔸 index.js
import("./bootstrap");

👉 This makes your app async

🔸 bootstrap.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
🧠 Why this works

Webpack pauses execution until:
remotes are ready
shared dependencies are initialized


⚡ Key concept: Module Federation requires asynchronous boundary before app starts

Without it:
❌ React loads before federation is ready

With it:
✅ Federation initializes first

3. Full Flow in the Browser (Step-by-step)

🚀 Step 1: User opens host app
Browser loads: container bundle (main.js)

🚀 Step 2: index.js runs
import("./bootstrap");
This creates an async boundary

🚀 Step 3: Webpack initializes sharing
Sets up shared scope
Prepares dependency versions

🚀 Step 4: When code hits remote import
import Products from "products/ProductsIndex";


🚀 Step 5: Load remoteEntry.js
<script src="http://localhost:8081/remoteEntry.js"></script>

This creates: window.products

🚀 Step 6: Initialize remote
window.products.init(__webpack_share_scopes__)

Sync shared dependencies

🚀 Step 7: Get exposed module
window.products.get("./ProductsIndex")

🚀 Step 8: Load chunk
Downloads chunk like:
src_index_js.chunk.js

🚀 Step 9: Execute module
Module runs
React component returned

🚀 Step 10: Render in host
<Products />

⚡ Common Mistakes
❌ Wrong remote name
products: "wrongName@http://..."

→ window.wrongName not found

❌ Missing bootstrap

→ React crashes / shared not initialized

❌ Wrong filename

→ remoteEntry.js not found

                ┌──────────────────────────────┐
                │        HOST (Container)      │
                │  (name: "container")         │
                └──────────────┬───────────────┘
                               │
                               │ 1. App loads (main.js)
                               ▼
                    ┌────────────────────┐
                    │     index.js       │
                    │ import("./bootstrap") │
                    └─────────┬──────────┘
                              │ (async boundary)
                              ▼
                    ┌────────────────────┐
                    │   bootstrap.js     │
                    │ ReactDOM.render()  │
                    └─────────┬──────────┘
                              │
                              │ 2. App runs
                              ▼
        ┌────────────────────────────────────────────┐
        │ import("products/ProductsIndex")           │
        └────────────────────────────────────────────┘
                              │
                              ▼
          ┌──────────────────────────────────────┐
          │ Webpack Runtime kicks in             │
          │ - resolves "products" remote         │
          └──────────────┬───────────────────────┘
                         │
                         │ 3. Load remote entry
                         ▼
     ┌──────────────────────────────────────────────┐
     │ http://localhost:8081/remoteEntry.js         │
     └──────────────┬───────────────────────────────┘
                    │
                    ▼
        ┌──────────────────────────────┐
        │ window.products created      │
        │ { get, init }               │
        └──────────────┬──────────────┘
                       │
                       │ 4. Initialize sharing
                       ▼
        ┌────────────────────────────────────┐
        │ products.init(sharedScope)         │
        │ (React, libs sync here)            │
        └──────────────┬────────────────────┘
                       │
                       │ 5. Request module
                       ▼
        ┌────────────────────────────────────┐
        │ products.get("./ProductsIndex")    │
        └──────────────┬────────────────────┘
                       │
                       │ 6. Load chunk
                       ▼
     ┌──────────────────────────────────────────────┐
     │ src_index_js.chunk.js                        │
     │ (actual exposed module code)                 │
     └──────────────┬───────────────────────────────┘
                    │
                    ▼
        ┌──────────────────────────────┐
        │ Module executes              │
        │ returns React component      │
        └──────────────┬──────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Host renders it              │
        │ <Products />                 │
        └──────────────────────────────┘

