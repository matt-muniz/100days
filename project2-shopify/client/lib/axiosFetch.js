import axios from "axios";

async function fetch(query) {
  const response = await axios({
    method: "POST",
    url: "https://mattsilva.myshopify.com/api/2020-04/graphql",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": "69dea42d3b81fc4ae3c5b03d367aa57d",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query,
    }),
  });

  return response;
}
export default fetch;
