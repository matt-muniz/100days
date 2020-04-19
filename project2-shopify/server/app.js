const express = require('express');
const app = express();

const { fetchData, array } = require('./api/contentfulFetch');

require('dotenv').config();

const port = process.env.PORT || 1300;

app.get('/', (req, res) => {
  res.json({
    message: 'client',
  });
});

fetchData();
console.log(array);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
