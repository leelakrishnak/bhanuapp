const express = require('express');
const { getAllFiles } = require('./utils');
var cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const serveIndex = require('serve-index');

const app = express();
const port = 5002;

app.use(cors()); // Enable CORS

// Serve static assets from the /public folder
//app.use('/public', express.static(path.join(__dirname, '/public')));
//app.use(express.static(path.join(__dirname, '/public')));

// app.all('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/listfiles', (req, res, next) => {
  //console.log('Request type: ', req.method);
  // console.log(req.query);
  const { directory } = req.query;

  try {
    const arrayOfFiles = getAllFiles(directory || './');
    res.send(arrayOfFiles);
  } catch (e) {
    console.log(e);
  }
  //next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
