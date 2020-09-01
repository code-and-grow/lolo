const express = require('express');
const path = require('path');
const Mercury = require('@postlight/mercury-parser');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Server init
app.listen(port);
console.log(`Lolo API listening on ${port}`);