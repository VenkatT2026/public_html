const callCenterDisplay = document.getElementById("callcenter");
const keypadButtons = document.querySelectorAll("#container .cell");

// Clear the display initially so we can start fresh
callCenterDisplay.innerHTML = "";
// Add a click handler to each button
keypadButtons.forEach(button => {
    button.addEventListener("click", () => {
        const digit = button.innerHTML.trim();
        callCenterDisplay.innerHTML += digit;
        
        
        console.log(digit);
        digitlist = []
        digitlist.push(digit)
        console.log(digitlist)
    });
});

