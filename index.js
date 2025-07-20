const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const countFile = path.join(__dirname, 'count.json');
const visitorsFile = path.join(__dirname, 'visitors.json');

// Middleware
app.use(cors());
app.use(express.json());

// Functions for data
function loadData(filePath, fallbackValue) {
    try {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    } catch {
      return fallbackValue;
    }
  }
  
  function saveData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
  
// Load data
let count = loadData(countFile, { count: 0 }).count;
let visitorCount = loadData(visitorsFile, { visitors: 0 }).visitors;

// Route to get the current count
app.get('/count', (req, res) => {
  res.json({ count });
});

app.post('/increment', (req, res) => {
    count++;
    saveData(countFile, { count });
    res.json({ count });
});
  
app.get('/visit', (req, res) => {
    visitorCount++;
    saveData(visitorsFile, { visitors: visitorCount });
    res.json({ visitors: visitorCount });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});