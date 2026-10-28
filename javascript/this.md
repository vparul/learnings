## this is determined by how a function is called, not where the function is defined.

## Example 1
const user = {
  name: "Parul",

  greet() {
    console.log(this.name);
  }
};

user.greet(); // Parul
Since, function is called through user, so, this === user

## Example 2 

const user1 = {
  name: "Parul",
  greet() {
    console.log(this.name);
  }
};

const user2 = {
  name: "Rahul",
  greet: user1.greet
};

user2.greet(); // Rahul

Because the function is called as: user2.greet();

Therefore:

this === user2

The function didn't change. The caller changed.

That's why we say: this depends on the call-site.

## Regular function

function greet() {
  console.log(this);
}

greet();

In modern JavaScript modules / strict mode:

this === undefined

In non-strict browser scripts, historically it can be the global object (window).

In strict mode, a regular function called without an owner has this === undefined.

## Example 4: Arrow functions are different

Arrow functions do not have their own this.

Instead, they capture this from their surrounding lexical scope.

Example:

const user = {
  name: "Parul",

  greet: () => {
    console.log(this.name);
  }
};

user.greet();

A regular function says:

"Who called me?"

An arrow function says:

"I don't care who called me. I'll use the this from where I was created."


## Output Questions ->
1. 
const user = {
  name: "Parul",

  greet() {
    console.log(this.name);
  }
};

user.greet(); // Parul

const fn = user.greet;
fn(); // undefined. In strict mode, it will throw typeerror


2.
const user = {
  name: "Parul",

  greet() {
    console.log(this.name);
  }
};

const anotherUser = {
  name: "Rahul",
  greet: user.greet
};

anotherUser.greet(); // Rahul

3. 
const user = {
  name: "Parul",

  greet() {
    console.log(this.name);
  }
};

const obj = {
  name: "Rahul",
  fn: user.greet
};

user.greet(); // Parul
obj.fn(); // Rahul



4. 
const user = {
  name: "Parul",

  greet: () => {
    console.log(this.name);
  }
};

user.greet(); // undefined


5. 
const user = {
  name: "Parul",

  greet() {
    const fn = () => {
      console.log(this.name); 
    };

    fn();
  }
};

user.greet(); // Parul

6. 
const user = {
  name: "Parul",

  greet() {
    setTimeout(function () {
      console.log(this.name);
    }, 0);
  }
};

user.greet(); / undefined 
In browsers, this inside a regular setTimeout callback typically refers to the global window object. window.name is often an empty string.

7. 
const user = {
  name: "Parul",

  greet() {
    console.log(this.name);
  }
};

user.greet(); // Parul

8. 
now ->
const { greet } = user;

greet(); // undefined
This extracts the greet function reference from user and assigns it to a new variable named greet.

It does not bind this to user.

9. 
const user = {
  name: "Parul",

  address: {
    city: "Bangalore",

    getCity() {
      console.log(this.city);
    }
  }
};

user.address.getCity();  // Bangalore

10. 
    const user = {
    name: "Parul",

    greet() {
        setTimeout(() => {
        console.log(this.name);
        }, 1000);
    }
    };

    user.greet() // Parul

11. 
const user = {
  name: "Parul",

  greet: () => {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

12. 

const obj = {
  name: "Parul",

  regular() {
    console.log("regular:", this.name);

    const arrow = () => {
      console.log("arrow:", this.name);
    };

    const regular = function () {
      console.log("nested regular:", this.name);
    };

    arrow();
    regular();
  }
};

obj.regular();
// regular: Parul
// arrow: Parul
//nested regular: Undefined
