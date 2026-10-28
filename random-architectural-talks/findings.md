1. You can not cancel a promise.

2. ### Why is `useEffect(async () => ...)` wrong?

`useEffect` expects its callback to return either nothing or a cleanup function. But when we make the callback `async`, it always returns a Promise.

React expects the cleanup function to be available synchronously so it can call it when the effect needs to be cleaned up. React doesn't wait for the Promise to resolve to retrieve the cleanup function.

For example:

```jsx
useEffect(async () => {
  const response = await fn();

  setData(response);

  return () => {
    console.log("cleanup");
  };
}, []);
```

Suppose the request is still pending when the component unmounts. React cannot access the cleanup function because it's inside the Promise. When the request eventually resolves, the remaining code can still execute and attempt to update the state of an unmounted component.

An update after unmount generally won't update any visible UI because the component is no longer on the screen. However, the asynchronous work can continue unnecessarily, and any other side effects in the callback may still execute. In older React versions, this could also trigger a warning. The bigger concern is preventing obsolete work from affecting the application.

Cleanup is also important when dependencies change. For example, if a request starts with `param = "A"` and the parameter changes to `"B"`, React cleans up the previous effect before running the new one. Without proper cleanup, the older request could resolve later and overwrite the newer request's data.

To avoid this, we keep the effect callback synchronous, run the asynchronous operation inside it, and return the cleanup function directly from the effect. We can use a flag in the cleanup to ignore results from old requests or requests that resolve after unmounting.

3. 