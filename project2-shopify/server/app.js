const express = require('express');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 1300;

app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
