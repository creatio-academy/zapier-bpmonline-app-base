const App = require('../../index');
const bundle = require('../authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);


describe("Account create", () => {

    it('should create Account', (done) => {

        const localBundle = { ...bundle };
        localBundle.inputData = {
            accountName: "Zapier Test Account",
        };
        appTester(App.creates.account.operation.perform, localBundle)
            .then((account) => {
                should(account.Name).eql(localBundle.inputData.accountName);
                
                done();
            })
            .catch(done);
    });

});
