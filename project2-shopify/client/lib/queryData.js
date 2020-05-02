const collections = `query collections($input: String!) {

    collections(first: 100, query: $input) {
      edges {
        node {
          title
          handle
          products(first: 5) {
            edges {
              node {
                title
                description
                descriptionHtml
                images(first: 100) {
                  edges {
                    node {
                      id
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
  }
  variables {
      "$input": "home-goods"
  }
  `;

export default {
  collections,
};
