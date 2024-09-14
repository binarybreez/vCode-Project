// Define possible destinations for each budget range
const destinationsByBudget = {
    "1000-5000": ["Indore", "Bhopal", "Mumbai", "Rajasthan"],
    "5000-10000": ["Gujarat", "Jaipur", "Goa", "Kerala"],
    "10000-20000": ["Shimla", "Manali", "Ooty", "Andaman"],
    "1lakh-2lakh": ["Dubai", "Singapore", "Bangkok", "Bali"],
    "2lakh-4lakh": ["Paris", "London", "New York", "Sydney"]
};

// Function to populate the destination dropdown based on budget selection
function populateDestinations() {
    const budget = document.getElementById('budget').value;
    const destinationDropdown = document.getElementById('destination');

    // Clear existing options
    destinationDropdown.innerHTML = '<option value="">Destination</option>';

    if (destinationsByBudget[budget]) {
        // Add new options based on the selected budget
        destinationsByBudget[budget].forEach(destination => {
            const option = document.createElement('option');
            option.value = destination;
            option.textContent = destination;
            destinationDropdown.appendChild(option);
        });
    }
}

// Function to handle form submission
function getSuggestions(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get selected values from the form
    const budget = document.getElementById('budget').value;
    const destination = document.getElementById('destination').value;
    const activities = document.getElementById('activities').value;

    // Validate form values
    if (!budget || !destination || !activities) {
        alert('Please fill out all fields.');
        return;
    }

    // Prepare the form data for submission
    const formData = {
        budget: budget,
        destination: destination,
        activities: activities
    };

    // Submit the form data via POST request
    fetch('/get-suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text()) // Parse response as text (HTML)
    .then(data => {
        // Open a new window with the suggestions response
        const newWindow = window.open();
        newWindow.document.write(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Attach event listener to budget dropdown to update destinations
document.getElementById('budget').addEventListener('change', populateDestinations);

// Attach event listener to form submit button
document.querySelector('.btn1').addEventListener('click', getSuggestions);
