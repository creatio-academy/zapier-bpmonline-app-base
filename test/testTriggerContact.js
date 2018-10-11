const App = require('..');
const bundle = require('./authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);

describe("contact trigger", () => {
  it('should get contacts array', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
      filter: "all"
    };
    appTester(App.triggers.contact.operation.perform, localBundle)
      .then((contacts) => {
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        done();
      })
      .catch(done);
  });

});
