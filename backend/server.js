const express = require('express');
const http = require('http');
const cors = require('cors');

const apiRoutes = require('./routes');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const { default: axios } = require('axios');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '100mb' }));

const corsOption = {
  origin: true,
  methods: 'GET',
  credentials: true,
  Accept: 'application/json,',
};

/*
-------------------------
     CORS configuration
-------------------------
*/
app.use(cors(corsOption));
app.use('/api/v1', apiRoutes);

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
