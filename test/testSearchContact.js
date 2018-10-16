const App = require('..');
const bundle = require('./authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);

describe("contact search", () => {
  it('should get array of contacts with specified name', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
        contactName: "ZapierContact"
    };
    appTester(App.searches.contact.operation.perform, localBundle)
      .then((contacts) => {
          //todo: all names should be ZapierContact
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        contacts.forEach(element => {
            should(element.Name).eql("ZapierContact");
        });
        done();
      })
      .catch(done);
  });

});
