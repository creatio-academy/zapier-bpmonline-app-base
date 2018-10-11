
const authentication = require('./authentication');
const contactTrigger = require ('./triggers/triggerContact');

const addAuthorizationToHeader = (request, z, bundle) => {
  // TODO: Read session cookie, add useForceSession header

  request.headers['Content-Type'] = 'application/json';
  request.headers['Accept'] = 'application/json;odata=verbose';
  const basicHash = Buffer(`${bundle.authData.username}:${bundle.authData.password}`).toString('base64');
  request.headers.Authorization = `Basic ${basicHash}`;
  z.console.log('request.headers.Authorization');
  z.console.log(request.headers.Authorization);
  return request;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    addAuthorizationToHeader
  ],

  afterResponse: [
  ],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [contactTrigger.key]:contactTrigger
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
