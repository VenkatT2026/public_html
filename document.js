document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            // Prevent the default form submission which reloads the page
            event.preventDefault();

            // Get the values from the form fields
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // For now, we'll just log them to the console
            console.log('Form submitted!');
            console.log('Email:', email);
            console.log('Password:', password);

            alert('Thank you for signing up! (Check the console for details)');
        });
    }
});     