document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email-input');
    const displayElement = document.getElementById('hes');

    if (signupForm && emailInput && displayElement) {
        signupForm.addEventListener('submit', (event) => {
            // Prevent the form from reloading the page
            event.preventDefault();

            // Get the value from the input field
            const email = emailInput.value;

            // Display the email in the 'hes' element
            displayElement.innerHTML = "Thank you! Your email is: " + email;

            // Optional: Clear the input field after submission
            emailInput.value = '';
        });
    }
});
