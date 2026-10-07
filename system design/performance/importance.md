## Performance Importance

Performance is important because a slow application can affect user experience, business, scalability, reliability, and cost.

There are multiple reasons why we need good performance:

### 1. Better User Experience

* Users expect applications to be **fast and responsive**.
* Fast applications provide a smooth and satisfying experience.
* Slow applications can cause:
  * Frustration
  * Repeated clicks
  * Abandoned actions
  * Poor perception of the product

* Users should be able to:
  * Load pages quickly
  * Navigate smoothly
  * Scroll without lag
  * Complete tasks without unnecessary waiting

### 2. Lower Bounce Rate

* **Bounce rate** is the percentage of users who leave a website without meaningful interaction.
* If a page takes too long to load, users may leave before seeing the content.

* Better performance can reduce user abandonment and improve engagement.

### 3. Better User Engagement / Session Time

* **Session time** is the amount of time a user spends interacting with an application during a session.
* A performant application allows users to spend more time **using the product instead of waiting for it**.
* However, higher session time is not always better.
* If users spend more time because the application is slow, that indicates poor performance.

### 4. Better Conversion

Performance can directly affect business conversions such as:

* Purchases
* Sign-ups
* Payments
* Bookings
* Subscriptions
* Form submissions

Slow application
      ↓
User frustration
      ↓
User abandons action
      ↓
Lower conversion
      ↓
Potential revenue loss


### 5. Better Performance Across Different Devices

* Users don't all have the same hardware.
* They may use:

  * High-end laptops
  * Low-end laptops
  * Budget mobile phones
  * Tablets
* An application that works well on a powerful development machine may perform poorly on a low-end device.

### 6. Better Performance Across Different Network Conditions

Users can have different network conditions:

* Fast Wi-Fi
* 5G
* 4G
* Slow mobile networks
* High-latency networks
* Unstable connections

For example:

```text
5 MB JavaScript bundle

Fast network
→ Downloads quickly

Slow network
→ Takes longer to download
→ Longer loading time
→ Poor user experience
```

Therefore, we should consider:

* Bundle size
* Image size
* API requests
* Caching
* Compression
* CDN
* Lazy loading

### 7. Efficient CPU and GPU Usage

Performance depends on the user's hardware.

**CPU is responsible for things such as:**

* JavaScript execution
* React rendering
* DOM operations
* JSON parsing
* Calculations

**GPU is involved in things such as:**

* Animations
* Compositing
* Graphics
* Visual effects

Heavy CPU/GPU work can result in:

```text
High CPU/GPU usage
       ↓
Slow rendering
       ↓
Janky animations
       ↓
Unresponsive UI
```

### 8. Better Responsiveness

Performance is not only about how quickly a page loads.

We also need to ensure that the application responds quickly to user interactions.

```text
User clicks button
      ↓
Quick response
      ↓
Good experience
```

vs.

```text
User clicks button
      ↓
2–3 second delay
      ↓
User clicks again
      ↓
Poor experience
```

Important areas include:

* Interaction latency
* Main-thread blocking
* Long JavaScript tasks
* Smooth scrolling
* Smooth animations

### 9. Better Scalability

Performance becomes more important as the number of users increases.

```text
100 users
→ System works well

100,000 users
→ More requests
→ More database load
→ More API traffic
→ Potential bottlenecks
```

Good performance practices help applications handle:

* More users
* More requests
* More data
* More concurrent operations

### 10. Lower Infrastructure Cost

Poorly optimized applications can consume more:

* CPU
* Memory
* Network bandwidth
* Database resources
* Server resources

Optimizing the application can reduce unnecessary resource consumption and therefore potentially reduce infrastructure costs.

## Understanding Your User

Before optimizing performance, we need to understand **who our users are and what environment they use**.

### 1. Device

* Desktop
* Laptop
* Mobile
* Tablet
* Low-end vs high-end devices

### 2. Network Quality

* Wi-Fi
* 4G
* 5G
* Slow networks
* High-latency networks
* Unstable connections

### 3. CPU

* How powerful is the user's CPU?
* How much JavaScript are we executing?
* Are we blocking the main thread?

### 4. GPU

* How much graphical work are we doing?
* Are animations smooth?
* Are we causing expensive paint/compositing operations?

### 5. Browser

* Chrome
* Safari
* Firefox
* Edge
* Different browser versions

### 6. Geography

* Where are users located?
* How far are they from our servers?
* Do we need a CDN?
* Are there regional network differences?