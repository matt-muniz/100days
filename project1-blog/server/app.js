const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares/middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '968835',
  key: '6a33f2e6e4b3290f9b48',
  secret: 'e4f6b266d4be27d9adb9',
  cluster: 'us2',
});

const port = process.env.PORT || 5000;

app.post('/', (req, res) => {
  pusher.trigger('Blog-Comments', 'new-event', req.body);
  res.status(200).send();
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
