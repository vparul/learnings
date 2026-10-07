## ASKED IN INTERVIEW

What are the differences btw  vraibales created using let, const and var?

var
 ├── Function scoped
 ├── Hoisted + initialized as undefined
 ├── Can reassign
 └── Can redeclare

let
 ├── Block scoped
 ├── Hoisted + TDZ
 ├── Can reassign
 └── Cannot redeclare

const
 ├── Block scoped
 ├── Hoisted + TDZ
 ├── Cannot reassign
 └── Cannot redeclare


1. Scope

var is function-scoped:

function test() {
  if (true) {
    var x = 10;
  }

  console.log(x); // 10
}

let and const are block-scoped:

if (true) {
  let x = 10;
  const y = 20;
}

console.log(x); // ❌ ReferenceError
console.log(y); // ❌ ReferenceError

A block means { }, such as an if, for, or while block.


2. Hoisting

With var:

console.log(a); // undefined
var a = 10;

Conceptually:

var a;           // hoisted + initialized
console.log(a);  // undefined
a = 10;

With let:

console.log(a); // ❌ ReferenceError
let a = 10;

a is hoisted, but it's in the TDZ until the declaration is reached.

Same for const.

3. Reassignment

var and let allow reassignment:

var a = 10;
a = 20; // ✅

let b = 10;
b = 20; // ✅

const doesn't:

const c = 10;
c = 20; // ❌ TypeError

But important interview point: const does NOT make objects immutable.

const user = {
  name: "Parul"
};

user.name = "John"; // ✅

You can't change what user references, but you can modify the object.

user = {}; // ❌
4. Redeclaration

var allows redeclaration:

var x = 10;
var x = 20; // ✅

let and const don't:

let x = 10;
let x = 20; // ❌ SyntaxError
const x = 10;
const x = 20; // ❌ SyntaxError