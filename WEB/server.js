const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve everything in the WEB folder
app.use(express.static(__dirname));

// Default route -> index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
