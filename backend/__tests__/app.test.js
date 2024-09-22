// __tests__/app.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Initialize your app
const app = express();
const dbPath = path.join(__dirname, '../db');
const filePath = path.join(dbPath, 'user.txt');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create db directory if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

// Check if user.txt exists, and create it with headers if it doesn't
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Name, Age\n');
}

// POST route to receive name and age
app.post('/submit-name', (req, res) => {
  const { name, age } = req.body;

  // Check if name or age is missing
  if (!name || !age) {
    return res.status(400).send('Name and age are required');
  }

  const formattedOutput = `${name}, ${age}\n`;

  fs.appendFile(filePath, formattedOutput, (err) => {
    if (err) {
      return res.status(500).send('Failed to save name and age');
    }
    res.status(200).send('Name and age saved successfully');
  });
});

// Test for the /submit-name endpoint
describe('POST /submit-name', () => {
  it('should save name and age to user.txt', async () => {
    const response = await request(app)
      .post('/submit-name')
      .send({ name: 'John Doe', age: 30 });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Name and age saved successfully');

    // Check if the data was actually written to the file
    const data = fs.readFileSync(filePath, 'utf-8');
    expect(data).toContain('John Doe, 30');
  });

  it('should return an error if data is missing', async () => {
    const response = await request(app)
      .post('/submit-name')
      .send({});  // Sending empty data

    expect(response.status).toBe(400); // Update to 400
  });
});

