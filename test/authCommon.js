const zapier = require('zapier-platform-core');

zapier.tools.env.inject();
const bundle = {
    authData: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
      bpmonlineurl:process.env.TEST_URL
    }
};

  // Finally, export the app.
module.exports = bundle;