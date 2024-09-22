const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime-types');

app.use(bodyParser.json());

const dataStorage = './data.json';

// Create the data.json file if it doesn't exist
fs.readFile(dataStorage, (err) => {
  if (err && err.code === 'ENOENT') {
    fs.writeFile(dataStorage, '[]', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('data.json file created and initialized with an empty array');
      }
    });
  }
});

// Existing routes and logic
app.post('/bfhl', (req, res) => {
  // Process the JSON data received from the frontend
  const jsonData = req.body;
  console.log('Received JSON data:', jsonData);

  // Validate the JSON data
  if (!jsonData || typeof jsonData !== 'object') {
    return res.status(400).json({ error: 'Invalid JSON data' });
  }

  if (!jsonData.data || !Array.isArray(jsonData.data)) {
    return res.status(400).json({ error: 'Invalid JSON data' });
  }

  // Extract numbers, alphabets, and the highest lowercase alphabet
  const numbers = jsonData.data.filter((item) => !isNaN(item));
  const alphabets = jsonData.data.filter((item) => isNaN(item));

  let highestLowercaseAlphabet = [];
  if (alphabets.length > 0) {
    const sortedAlphabets = alphabets.sort((a, b) => b.localeCompare(a));
    highestLowercaseAlphabet = [sortedAlphabets[0].toLowerCase()];
  }

  // Decode Base64 string and validate file
  if (jsonData.file_b64) {
    const fileBuffer = new Buffer(jsonData.file_b64, 'base64');
    const fileMimeType = mime.getType(fileBuffer);
    const fileSizeKb = fileBuffer.length / 1024;

    // Validate file MIME type
    if (!fileMimeType || !fileMimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Construct response object
    const response = {
      is_success: true,
      user_id: 'john_doe_17091999', // Update this field with your actual user ID
      email: 'john@xyz.com', // Update this field with your actual email
      roll_number: 'ABCD123', // Update this field with your actual roll number
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      file_valid: true,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb,
    };

    // Store the JSON data in a file
    fs.readFile(dataStorage, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const storedData = JSON.parse(data);
        jsonData.id = storedData.length + 1; // Assign a unique ID to the JSON data
        storedData.push(jsonData);
        fs.writeFile(dataStorage, JSON.stringify(storedData), (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error storing JSON data' });
          } else {
            console.log('JSON data stored successfully!');
            return res.json(response);
          }
        });
      }
    });
  } else {
    // Construct response object
    const response = {
      is_success: true,
      user_id: 'john_doe_17091999', // Update this field with your actual user ID
      email: 'john@xyz.com', // Update this field with your actual email
      roll_number: 'ABCD123', // Update this field with your actual roll number
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      file_valid: false,
    };

    // Store the JSON data in a file
    fs.readFile(dataStorage, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const storedData = JSON.parse(data);
        jsonData.id = storedData.length + 1; // Assign a unique ID to the JSON data
        storedData.push(jsonData);
        fs.writeFile(dataStorage, JSON.stringify(storedData), (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error storing JSON data' });
          } else {
            console.log('JSON data stored successfully!');
            return res.json(response);
          }
        });
      }
    });
  }
});

app.get('/bfhl', (req, res) => {
  return res.json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
