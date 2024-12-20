document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message. We will get back to you soon!');
            
            // Reset form
            contactForm.reset();
        });
    }
});

function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a template for the email
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
    };

    // Send the email using EmailJS
    emailjs.send('service_p7affs9', 'template_gd78zto', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent!');
        }, (error) => {
            console.log('FAILED...', error);
            alert('There was an error sending your message. Please try again later.');
        });
} 