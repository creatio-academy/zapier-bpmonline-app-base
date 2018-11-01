const test = (z , bundle) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  // In this example, we'll hit httpbin, which validates the Authorization Header against the arguments passed in the URL path

  // This method can return any truthy value to indicate the credentials are valid.
  // Raise an error to show
  return z.request({
      url: '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc',
    }).then((response) => {
      if (response.status === 401) {
        throw new Error('The username and/or password you supplied is incorrect');
      }
      return response;
    });
};

module.exports = {
  type: 'custom',

  // The test method allows Zapier to verify that the credentials a user provides are valid. We'll execute this
  // method whenver a user connects their account for the first time.
  test: test,
  fields: [
    //todo: add app url here
    {
      key: 'username',
      label: 'Username',
      required: true, type: 'string'
    },
    { 
      key: 'password',
      label: 'Password',
      required: true, type: 'password'
    },
    { 
      key: 'bpmonlineurl',
      label: "Bpm'online URL",
      required: true, type: 'string',
      helpText: 'Examples: https://myapp.bpmonline.com or http://myapp.bpmonline.com'
    }
  ],
  // assuming "username" is a key returned from the test
  connectionLabel: '{{username}}'
};
