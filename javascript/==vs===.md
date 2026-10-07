== compares values after allowing type coercion.
5 == "5"        // true
0 == false      // true
"" == false     // true
null == undefined // true

=== compares both type and value. It does not perform type coercion.
5 === "5"       // false
0 === false     // false
"" === false    // false
null === undefined // false

##  One tricky point
=== doesn't mean "same type only". It means same type AND same value.

10 === 10       // true
"hello" === "hello" // true

10 === "10"     // false

And objects are compared by reference, not their contents:

{} === {}       // false

const a = {};
const b = a;

a === b         // true