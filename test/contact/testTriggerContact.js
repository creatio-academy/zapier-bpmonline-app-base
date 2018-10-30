const App = require('../../index');
const bundle = require('../authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);



describe("Contact trigger", () => {
  
  it('should get contacts array', function(done){
    // important!!! test may fall with time restriction.
    // change it to greater value
    this.timeout(5000);

    const localBundle = { ...bundle };
    localBundle.inputData = {
      filter: "all"
    };
    appTester(App.triggers.contact.operation.perform, localBundle)
      .then((contacts) => {
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        //todl: check contacts accounts and addresses
        done();
      })
      .catch(done);
  });

  

});
