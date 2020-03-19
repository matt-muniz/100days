const contentful = require('contentful');
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'qmbfbfyde358',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'dJVVdyqWnCMCx0B0-poZfmK0e5GeUfWOzN4Bn855gPE',
});

const contentful_management = require('contentful-management');

const client_management = contentful_management.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'CFPAT-fSIXieJEk9s12bfprEEXeTKNpqii5WmEGbq99ULtfG4',
});

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

// Get all Entries

client
  .getEntries()
  .then(response => {
    response.items.forEach(item => console.log(item.fields));
  })
  .catch(console.error);

// Get single entry

// client
//   .getEntry('6p3bR0m8ISeKAS7zWU241r')
//   .then(entry => console.log(entry.fields))
//   .catch(err => console.log(err));

// client
//   .getEntry('7dymAQ36RE3JgQofgEA4ft')
//   .then(entry => console.log(entry.fields))
//   .catch(err => console.log(err));

// Get content type

// client
//   .getContentType('blogPost')
//   .then(contentType => console.log(contentType))
//   .catch(console.error);

// Create entry and publish

// client_management
//   .getSpace('qmbfbfyde358')
//   .then(space => space.getEnvironment('master'))
//   .then(environment =>
//     environment.createEntry('blogPost', {
//       fields: {
//         post1: {
//           'en-US': 'Entry title',
//         },
//         post2: {
//           'en-US': 'Entry title',
//         },
//       },
//     })
//   )
//   .then(entry => entry.publish())
//   .then(entry => console.log(entry))
//   .catch(console.error);
client_management
  .getSpace('qmbfbfyde358')
  .then(space => space.getEnvironment('master'))
  .then(environment => environment.getEntry('1fnXOEbaYh75nFu7AIVRAj'))
  .then(entry => {
    entry.fields.post1['en-US'] = 'New Entry Title';
    return entry.update();
  })
  .then(entry => console.log(entry))
  .catch(console.error);
