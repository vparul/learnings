/*
useMemo 
- useMemo is a hook that is used for preformance optimization. It cached the computed value, runs the function during render time and store the result
until the dependency changed.

- It is used when dealing with expensive computation
- Cache the value based on dependency,. It uses Object.is comparison mechanism.

Object.is -
It is static metod to compare two values. 
console.log(Object.is("1", 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false


 - Object.is() is not equivalent to the == operator. 
 The == operator check for the value after performing type coersion (if needed).

Object.is() is also not equivalent to the === operator. 
The only difference between Object.is() and === is in their treatment of signed zeros and NaN values. 
The === operator (and the == operator) treats the number values -0 and +0 as equal, but treats NaN as not equal to each other.



Q- what will happen if we use side effect inside useMemo?

 - useMemo is not designed for side effects.
 - It’s meant to compute and cache a pure value during render.

Example — 
const [count, setCount] = useState(0);

const increment = useMemo(() => {
  // ❌ BAD: side effect in useMemo
  setCount((c) => c + 1); 
}, [count]);


What happens here:
- useMemo runs while React is rendering.
- It calls setCount, which queues a state update → triggers another render.
- On the next render, useMemo runs again, calls setCount again…
- 🔁 Infinite loop until React throws an error.

*/
// example -

// import React, { useMemo, useState } from "react";

// export const memo = () => {
//   const [count, setCount] = useState(0);
//   const [numbers, setNumbers] = useState(
//     new Array(30_00_000).fill(0).map((item, index) => ({
//       index,
//       isMagical: item === 29_00_000,
//     }))
//   );

//   const magical = numbers.find((item) => item.isMagical); //this is an expensive computation. On everry count updation, the entire component will re-render
//   //   which means that this computation will happen again. So, in order to avoid re computation, we can use useMemo

//   // const magical = useMemo(numbers.find((item) => item.isMagical), [numbers]);
//   // the magical value will only be computed when the dependency changes

//   const onButtonClick = () => setCount((count) => count + 1);

//   return (
//     <>
//       <button onClick={onButtonClick}>Count: {count}</button>
//       <span>Magical Number is {magical}</span>
//     </>
//   );
// };

// export default memo;
