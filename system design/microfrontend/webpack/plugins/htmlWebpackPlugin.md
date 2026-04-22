## 6️⃣ HtmlWebpackPlugin — Purpose & WHY

### ❓ Problem it solves

Webpack generates:

```
main.a1b2c3.js
```

But HTML has:

```html
<script src="main.js"></script> ❌
```

👉 Mismatch breaks app

### ✅ What it does

* Generates `index.html`
* Injects correct bundle file automatically


### 🔥 Example

```js
new HtmlWebpackPlugin({
  template: "./public/index.html",
})
```

---

### 🧠 Real Purpose

> Automatically connect Webpack output with HTML

---

### 💡 Additional Benefits

* Handles multiple chunks
* Works with code splitting
* Useful in Micro Frontends
