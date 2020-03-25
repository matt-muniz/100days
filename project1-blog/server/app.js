const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '968835',
  key: '6a33f2e6e4b3290f9b48',
  secret: 'e4f6b266d4be27d9adb9',
  cluster: 'us2',
});

const port = 3000;

app.get('/', (req, res) => {
  pusher.trigger('Blog-Comments', 'new-event', { Testing: 'Testing' });
  res.status(200).send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
