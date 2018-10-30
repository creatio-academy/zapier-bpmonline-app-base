
const authentication = require('./authentication');
const contactTrigger = require ('./triggers/triggerContact');
const contactCreate = require('./creates/createContact');
const contactSearch = require('./searches/searchContact');

const accountTrigger = require ('./triggers/triggerAccount');
const accountSearch = require('./searches/searchAccount');
const accountCreate = require('./creates/createAccount');


const addAuthorizationToHeader = (request, z, bundle) => {
  // TODO: Read session cookie, add useForceSession header
  request.headers['Content-Type'] = 'application/json';
  if (request.method === "POST"){
    request.headers['Content-Type'] = 'application/json;odata=verbose';
  }
  request.headers['Accept'] = 'application/json;odata=verbose';
  const basicHash = Buffer(`${bundle.authData.username}:${bundle.authData.password}`).toString('base64');
  request.headers.Authorization = `Basic ${basicHash}`;
  // z.console.log('request.headers.Authorization');
  // z.console.log(request.headers.Authorization);
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
    [contactTrigger.key]:contactTrigger,
    [accountTrigger.key]:accountTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    [contactSearch.key]: contactSearch,
    [accountSearch.key]: accountSearch,
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [contactCreate.key]:contactCreate,
    [accountCreate.key]:accountCreate,
  }
};

// Finally, export the app.
module.exports = App;
