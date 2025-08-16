/*
What's the difference between an "attribute" and a "property" in the DOM?

Attributes
Attributes are defined in the HTML markup and provide initial values for elements. They are static and do not change once the page is loaded unless explicitly modified using JavaScript.

Example
<input type="text" value="initial value" />
In this example, value="initial value" is an attribute.

Properties
Properties are part of the DOM and represent the current state of an element. They are dynamic and can change as the user interacts with the page or through JavaScript.

Example
const inputElement = document.querySelector('input');
console.log(inputElement.value); // Logs the current value of the input element
inputElement.value = 'new value'; // Changes the current value of the input element
In this example, value is a property of the inputElement object.

Key differences
Initialization: Attributes initialize DOM properties.
State: Attributes are static, while properties are dynamic.
Access: Attributes can be accessed using getAttribute and setAttribute methods, while properties can be accessed directly on the DOM object.


Example
<input id="myInput" type="text" value="initial value" />

const inputElement = document.getElementById('myInput');

// Accessing attribute
console.log(inputElement.getAttribute('value')); // "initial value"

// Accessing property
console.log(inputElement.value); // "initial value"

// Changing property
inputElement.value = 'new value';
console.log(inputElement.value); // "new value"
console.log(inputElement.getAttribute('value')); // "initial value"

In this example, changing the value property does not affect the value attribute.
Changing the property (.value) changes what the user sees and what JS reads in .value, but does not update the HTML attribute.

If you want to change the attribute, you have to use setAttribute method

Mental model:
Attributes = initial setup instructions in HTML.
Properties = current, live state in JS/DOM.
*/
