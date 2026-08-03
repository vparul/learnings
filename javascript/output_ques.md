let total = 0;

function updateTotal(total = total + 1) {
    console.log(total);
}

updateTotal();

OUTPUT - 𝐑𝐞𝐟𝐞𝐫𝐞𝐧𝐜𝐞𝐄𝐫𝐫𝐨𝐫. 
Reason - A function parameter cannot use itself to calculate its default value. Even if there is another variable with the same name outside.

Correct way - 
let total = 0;

function updateTotal(value = total + 1) {
    console.log(value);
}

updateTotal(); // 1


----------------------------------------------------

function flatten(value) {
   console.log("value" + value)
}

console.log(flatten([1, [2, 3]]));

OUTPUT -> value1,2,3

Why?

This is because when you use + operator, string + array, JS will automatically convert it into a string.

----------------------------------------------------


# Guess the output 

console.log(declared()); // function declaration
console.log(expressed()); // expressed is not a function

function declared() {
  return 'function declaration';
}

var expressed = function () {
  return 'function expression';
};

----------------------------------------------------


# Guess the output 

if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError: b is not defined

WHY ??
This works because if blocks do not create a scope for var. var does not create a new scope inside blocks like if, for, or while.

It's as if you wrote:

var z;

if (true) {
  z = 30;
}

console.log(z); // 30



----------------------------------------------------


# Guess the output 
var x = 1;
var x = 2; // OK — x is now 2

let y = 1;
let y = 2; // SyntaxError: Identifier 'y' has already been declared


WHY?

var allows the same name to be redeclared in the same scope; the second declaration is a no-op and only the assignment runs. let, const, and class throw SyntaxError if the same name is declared twice in the same scope. 


----------------------------------------------------


# Guess the output 

function outer() {
  console.log(inner);
  inner();

  function inner() {
    console.log('inner called');
  }

  var inner = 'overwritten';
}

outer();
// Output:
// [Function: inner]
// inner called



WHY? 

What JavaScript creates before execution
function outer() {
  function inner() {
    console.log("inner called");
  }

  var inner; // ignored because 'inner' already exists as a function

  console.log(inner);
  inner();

  inner = "overwritten";
}



Execution timeline - 
Creation Phase
──────────────
inner → function

Execution Phase
───────────────
console.log(inner)
↓
[Function: inner]

inner()
↓
"inner called"

inner = "overwritten"
↓
inner → "overwritten"


#### Function declarations are hoisted with their body. var is hoisted only as a declaration. If both use the same name, the function is available first, and a later var assignment can overwrite it.



function outer() {
  console.log(inner);
  inner();

  function inner() {
    console.log('inner called');
  }

  var inner = 'overwritten';
   console.log(inner);
}

outer();
inner();


output - 
ƒ inner() {}
​
inner called 
​
overwritten 
​
ReferenceError: inner is not defined