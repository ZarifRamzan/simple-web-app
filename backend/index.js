const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 6000;  // Backend port

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());

// Path to user.txt
const dbPath = path.join(__dirname, 'db');  // Updated path
const filePath = path.join(dbPath, 'user.txt');

// Create db directory if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

// Check if user.txt exists, and create it with headers if it doesn't
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Name, Age\n');  // Create the file with headers
}

// POST route to receive name and age
app.post('/submit-name', (req, res) => {
  const { name, age } = req.body;

  // Check if name or age is missing
  if (!name || !age) {
    return res.status(400).send('Name and age are required');
  }

  // Format the output with a space after the comma
  const formattedOutput = `${name}, ${age}\n`;

  // Append name and age to user.txt
  fs.appendFile(filePath, formattedOutput, (err) => {
    if (err) {
      return res.status(500).send('Failed to save name and age');
    }
    res.status(200).send('Name and age saved successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

