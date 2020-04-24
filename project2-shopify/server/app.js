const express = require('express');
const fetch = require('node-fetch');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { fetchData } = require('./api/contentfulFetch');

require('dotenv').config();
const app = express();

const schema = buildSchema(`
  type Query{
    hello: String
  }
`);

const rootValue = {
  hello: () => 'Hello World!',
};
const port = process.env.PORT || 1300;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.get('/', async (req, res) => {
  const token = await fetchData();
  const title = token.map((t) => t.title);
  const shopifyItem = token.map((t) => t.shopifyItem);
  console.log(shopifyItem[0].map(String));

  const newToken =
    'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzE5ODUzNjgxODgxOQ==';

  const query = `{
        shop{
          name
        },
        nodes (ids: "${newToken}") {
          id,
          ...on ProductVariant {
            sku,
            image {
                src: originalSrc
            },
            title,
            product {
                id,
                title
            }
          }
        },
        collections(first: 1, query: "photography"){
          edges{
            node{
              title
              products(first: 5){
                edges{
                  node{
                    title
                    images(first: 100){
                      edges{
                        node{
                          transformedSrc(preferredContentType: JPG)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`;

  const response = await fetch(
    'https://mattsilva.myshopify.com/api/2020-04/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '69dea42d3b81fc4ae3c5b03d367aa57d',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    }
  );
  const { data } = await response.json();

  res.json({
    message: {
      data,
      title,
      shopifyItem,
    },
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
