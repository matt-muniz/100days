const newToken = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzE5ODUzNjgxODgxOQ==';
const image = document.querySelector('.img');
const title = document.querySelector('.title');
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

async function fetchQuery() {
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
  const { collections } = data;
  const imageSrc =
    collections.edges[0].node.products.edges[0].node.images.edges[0].node
      .transformedSrc;
  image.setAttribute('src', imageSrc);
  title.innerHTML = `${data.shop.name}`;
  console.log(data.shop);
}

fetchQuery();
