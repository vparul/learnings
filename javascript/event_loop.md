The Event Loop is the mechanism that allows JavaScript to handle asynchronous operations without blocking the main thread, even though JavaScript executes synchronous code on a single call stack.

                 ┌──────────────┐
                 │  Call Stack  │
                 └──────┬───────┘
                        ↓
                 Execute JS code
                        ↓
          ┌─────────────────────────┐
          │ Web APIs / Node APIs    │
          │ setTimeout, fetch, etc. │
          └────────────┬────────────┘
          (Web APIs/Node.js APIs
          Hosts such as browsers and Node.js manage timers, networking, 
          and file I/O outside the currently executing JavaScript stack. )
                       ↓
                 Callback Queues (macrotask queue / microtask queue)
                       ↓
                  Event Loop
                       ↓
                 Call Stack

Example
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

Output:

A
C
B

Why?

console.log("A") → goes onto the Call Stack → prints A.
setTimeout → is handled by the Browser/Runtime, not executed immediately by the Call Stack.
console.log("C") → executes immediately → prints C.
Timer finishes → callback goes into the task/callback queue.
Event Loop sees that the Call Stack is empty.
Callback moves to the Call Stack → prints B.

Important: setTimeout(..., 0) does not mean "execute immediately." It means the callback becomes eligible after the timer expires and waits for the event loop to get to it.

The important part: Microtasks vs Macrotasks

This is where interview questions usually become interesting.

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

Output:

1
4
3
2

Why?

Synchronous code
      ↓
   Call Stack
      ↓
Microtask Queue
(Promise.then, queueMicrotask)
      ↓
Task/Macrotask Queue
(setTimeout, setInterval, etc.)

After the synchronous code finishes, JavaScript drains the microtask queue before taking the next task.

So:

1 → synchronous
4 → synchronous
3 → Promise microtask
2 → setTimeout task


# JavaScript Event Loop — Interview Q&A

### Q1. What happens when the Microtask Queue becomes empty?

Once the current synchronous code has finished and the **Call Stack is empty**, JavaScript processes the **Microtask Queue**.

After **all microtasks are executed**, the Event Loop can pick the next task from the **Task/Macrotask Queue**.

```text
Synchronous code
      ↓
Call Stack becomes empty
      ↓
Execute ALL Microtasks
      ↓
Microtask Queue empty
      ↓
Pick next Task/Macrotask
      ↓
Execute it
```

Examples of microtasks:

* `Promise.then()`
* `Promise.catch()`
* `Promise.finally()`
* `queueMicrotask()`

Examples of tasks/macrotasks:

* `setTimeout`
* `setInterval`
* DOM events

---

### Q2. What happens if there is still code executing in the Call Stack?

The Event Loop **cannot interrupt the current JavaScript execution**.

If the Call Stack is busy, queued callbacks have to wait.

```js
setTimeout(() => {
  console.log("Timer");
}, 0);

for (let i = 0; i < 10000000000; i++) {
  // Long-running synchronous code
}
```

Conceptually:

```text
Call Stack
------------------
Long-running loop
        ↓
        ↓
        ↓

Task Queue
------------------
setTimeout callback
```

Even if the `setTimeout` timer has already expired, its callback **cannot execute** because the Call Stack is still busy.

Once the loop finishes:

```text
Call Stack becomes empty
          ↓
Event Loop can process queued work
          ↓
setTimeout callback executes
```

This is why:

> `setTimeout(fn, 0)` does NOT mean "execute immediately."

It means the callback becomes eligible to run after the timer expires **and after the Call Stack is available**.

---

### Q3. Can the Event Loop interrupt running JavaScript code?

**No.**

JavaScript execution on the main thread is run-to-completion.

For example:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

JavaScript does not stop `console.log("A")` or `console.log("C")` to execute the timer.

Output:

```text
A
C
B
```

The timer callback waits until the current synchronous execution finishes.

---

### Q4. What happens if a Microtask is added while a Macrotask is executing?

Consider:

```js
setTimeout(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });

  console.log("C");
}, 0);
```

The timer callback is a **task**.

It starts executing:

```text
A
```

Then the Promise callback is added to the **Microtask Queue**.

Then:

```text
C
```

is executed synchronously.

So the task finishes:

```text
A
C
```

Now the Call Stack is empty, so JavaScript processes the Microtask Queue:

```text
B
```

Final output:

```text
A
C
B
```

---

### Q5. What is the priority between Call Stack, Microtask Queue and Task Queue?

A useful interview model is:

```text
        ┌───────────────┐
        │  Call Stack   │
        └───────┬───────┘
                │
                │ current code must finish
                ▼
        ┌───────────────┐
        │ Microtasks    │
        │ Promise.then  │
        │ queueMicrotask│
        └───────┬───────┘
                │
                │ drain microtasks
                ▼
        ┌───────────────┐
        │ Tasks         │
        │ setTimeout    │
        │ events        │
        └───────────────┘
```

The practical rule is:

> **The current Call Stack runs to completion. After a task finishes, the runtime performs a microtask checkpoint, draining the Microtask Queue before the next task is processed.**

---

### Q6. Why can a Promise callback execute before `setTimeout(..., 0)`?

```js
setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});
```

Output:

```text
Promise
Timer
```

Because the Promise callback is a **microtask**, while the timer callback is a **task**.

After synchronous execution finishes:

```text
Microtask Queue
      ↓
Promise
      ↓
Task Queue
      ↓
Timer
```

Therefore, the Promise callback runs first.

---

### ⭐ Interview Summary

> **"The Event Loop does not interrupt currently executing JavaScript. The Call Stack must become empty before queued work can execute. After the current task finishes, microtasks such as Promise callbacks are drained. Once the microtask queue is empty, the runtime can select the next task, such as a timer or DOM event. This process repeats continuously."**


console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => console.log('Promise 2'));
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  setTimeout(() => console.log('Timeout 3'), 0);
});

setTimeout(() => console.log('Timeout 2'), 0);

console.log('End');

OUTPUT:
// Console output:
// Start
// End
// Promise 1
// Timeout 1
// Promise 2
// Timeout 2
// Timeout 3