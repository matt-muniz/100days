const { client } = require('../contentful/index');

const fetchData = async () => {
  const { items } = await client.getEntries();
  const array = [];
  items.forEach((item) => array.push(item.fields));

  return array;
};

module.exports = {
  fetchData,
};
