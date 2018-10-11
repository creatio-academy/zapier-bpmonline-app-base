const App = require('..');
const bundle = require('./authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);


describe("contact create", () => {

    it('should create contact', (done) => {

        const localBundle = { ...bundle };
        localBundle.inputData = {
            contactName: "ZapierContact"
        };
        appTester(App.creates.contact.operation.perform, localBundle)
            .then((contact) => {
                should(contact.Name).eql("ZapierContact");
                done();
            })
            .catch(done);
    });

});
