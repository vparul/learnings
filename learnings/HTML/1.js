/*
Difference between document `load` event and document `DOMContentLoaded` event?

DOMContentLoadedEvent is fired when the HTML is completely loaded and parsed without waiting for the stylesheet,
asset or other dependent resources to be loaded.

Load event is fired when the entire page is completely loaded including all the dependent resources like stylesheet etc.

DOMContentrLoaded event is fired before the load event.

Ex - 
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is not fully loaded yet");
})

document.addEventListener("load", function () {
    console.log("DOM is fully loaded");
})


Use cases: 
 - Use DOMContentLoaded for tasks that only require the DOM to be ready, such as attaching event listeners or manipulating the DOM. 
 - Use load for tasks that depend on all resources being fully loaded, such as image-dependent layout calculations.
*/
