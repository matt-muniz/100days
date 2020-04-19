const { client } = require('../contentful/index');

const array = [];

const fetchData = async () => {
  const { items } = await client.getEntries();
  items.forEach((item) => array.push(item.fields.shopifyItem));
  console.log(array);
};

module.exports = {
  fetchData,
  array,
};
