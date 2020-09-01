const express = require('express');
const path = require('path');
const Mercury = require('@postlight/mercury-parser');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

// Create application/json parser
const jsonParser = bodyParser.json()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Un-cluttered article post request
app.post('/get_parsed_article', jsonParser, (req, res) => {
  try {
    Mercury.parse(req.body.url, { contentType: 'text' }).then(response => res.status(200).send(response));
  } catch (error) {
    res.status(500).send({error: error});
  }
});

// Any request that doesn't match any above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Server init
app.listen(port);
console.log(`Lolo API listening on ${port}`);