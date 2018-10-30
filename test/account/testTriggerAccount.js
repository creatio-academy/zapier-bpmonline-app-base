const App = require('../../index');
const bundle = require('../authCommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);



describe("Account trigger", () => {
  
  it('should get accounts array', function(done){
    // important!!! test may fall with time restriction.
    // change it to greater value
    this.timeout(5000);

    const localBundle = { ...bundle };
    localBundle.inputData = {
      filter: "all"
    };
    appTester(App.triggers.account.operation.perform, localBundle)
      .then((accounts) => {
        should(accounts).be.instanceof(Array);
        should(accounts.length).be.above(0);
        //todl: check contacts accounts and addresses
        done();
      })
      .catch(done);
  });

  

});
