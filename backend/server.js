const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');

const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '100mb' }));

const corsOption = {
  origin: true,
  methods: 'GET',
  credentials: true,
};

// CORS configuration
app.use(cors(corsOption));

/*
------------------
    Create Server
------------------
*/

const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App Listening on port ${port}!!!`);
});
