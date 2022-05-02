const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.post('/upload', (req, res) => {
  console.log('/upload called!');
  res.json({ result: 'success' });
});

app.listen(PORT, () => console.log('express server listening on PORT ' + PORT));
