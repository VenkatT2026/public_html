const callCenterDisplay = document.getElementById("callcenter");
const keypadButtons = document.querySelectorAll("#container .cell");

// Clear the display initially so we can start fresh
callCenterDisplay.innerHTML = "";
let counter=0
// Add a click handler to each button
keypadButtons.forEach(button => {
    button.addEventListener("click", () => {
        counter = 0
        const digit = button.innerHTML.trim();
        callCenterDisplay.innerHTML += digit;
    });
});

console.log(callCenterDisplay.length);


const element = document.getElementById('myElement');
const textLength = element.innerText.length; // Or element.innerText.length for older IE
console.log(`Text content length: ${textLength}`);