const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve index.html for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Handle form submission
app.post('/get-suggestions', (req, res) => {
    const { budget, destination, activities } = req.body;

    // Logic to determine the response based on user input
    if (budget === '1lakh-2lakh' && destination === 'Dubai' && activities === 'Adventure') {
        res.sendFile(path.join(__dirname, '/public/dubai.html'));
    } else if (budget === '1000-5000' && destination === 'Indore' && activities === 'Nature') {
        res.sendFile(path.join(__dirname, '/public/dubai.html'))
    } else if (budget === '5000-10000' && destination === 'Gujarat' && activities === 'Culture') {
        res.sendFile(path.join(__dirname, '/public/dubai.html'))
    } else {
        res.send('<h1>No suggestions available for this combination</h1>');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
