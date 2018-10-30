const App = require('../../index');
const bundle = require('../authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);

describe("Account search", () => {
  it('should get array of accounts with specified name', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
      accountName: "Accom (sample)",
      searchBy:"accountName"
      // fullContactName: "Zapier Test Contact"
    };
    appTester(App.searches.account.operation.perform, localBundle)
      .then((accounts) => {
          //todo: all names should be ZapierContact
        should(accounts).be.instanceof(Array);
        should(accounts.length).be.above(0);
        accounts.forEach(element => {
            should(element.Name).eql(localBundle.inputData.accountName);
        });
        done();
      })
      .catch(done);
  });

});
