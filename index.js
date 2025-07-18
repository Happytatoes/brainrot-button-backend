const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Counter variable (stored in memory)
let count = 0;

// Route to get the current count
app.get('/count', (req, res) => {
  res.json({ count });
});

// Route to increment the count
app.post('/increment', (req, res) => {
  count += 1;
  res.json({ count });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});