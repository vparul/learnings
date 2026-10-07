## ASKED IN INTERVIEW  
Hoisting is JavaScript's behavior where declarations are processed before the code is executed. This is why some variables/functions can be accessed before their declaration appears in the code.

var → hoisted and initialized with undefined.
let / const → hoisted but not initialized. They remain in the Temporal Dead Zone (TDZ) until the declaration is executed.
Function declarations → fully hoisted, so they can be called before their declaration.

console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;

sayHello(); // Hello
function sayHello() {
  console.log("Hello");
}


# How hoisting differs in case of function declaration, function expression and arrow functions?

1. Function declarations → fully hoisted, so they can be called before their declaration.
sayHello(); // Hello
function sayHello() {
  console.log("Hello");
}

2. Function Expression — depends on var, let, or const
- sayHello(); // ❌ TypeError: sayHello is not a function

var sayHello = function () {
  console.log("Hello");
};

Here, sayHello is a variable, and only the var declaration is hoisted:

var sayHello = undefined;

So when you call it:

undefined();

→ TypeError.

- With let/const:

sayHello(); // ❌ ReferenceError

const sayHello = function () {
  console.log("Hello");
};

The variable is in the TDZ until initialization.

3. Arrow Function — same hoisting behavior as a variable

An arrow function is not hoisted like a function declaration.

sayHello(); // ❌ ReferenceError

const sayHello = () => {
  console.log("Hello");
};

Because sayHello is a const variable, it is in the TDZ.

With var:

sayHello(); // ❌ TypeError

var sayHello = () => {
  console.log("Hello");
};

var is initialized as undefined, so you get a TypeError.


## ASKED IN INTERVIEW  
# WHat is Temporal Dead Zone?

The Temporal Dead Zone is the period between when a let or const variable is hoisted/created and when it is initialized.

During this period, trying to access the variable gives a ReferenceError.

console.log(name); // ❌ ReferenceError

let name = "John";

console.log(name); // ✅ John

# Why does TDZ exist?

It prevents you from accidentally using a variable before it has been properly initialized. Without TDZ, they could behave like var and return undefined, which could silently lead to unexpected results.

EXAMPLE - 
let total = price * quantity;

let price = 100;
let quantity = 2;

Without TDZ, price and quantity could behave as undefined, and you'd get:

undefined * undefined
// NaN

let total = price * quantity;
// ❌ ReferenceError: Cannot access 'price' before initialization

const readers = [];

for (var index = 0; index < 3; index++) {
  readers.push(() => index * 2);
}

console.log(readers.map((read) => read()).join(', ')); // 6,6,6


## Hoisting in class
Class declarations are hoisted, but they are not initialized during the creation phase. They remain in the Temporal Dead Zone until execution reaches the class declaration. Therefore, unlike function declarations, a class cannot be instantiated or accessed before its declaration.


const person = new Person(); // ❌ ReferenceError

class Person {
  constructor(name) {
    this.name = name;
  }
}