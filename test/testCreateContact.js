const App = require('..');
const bundle = require('./authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);


describe("contact create", () => {

    it('should create contact', (done) => {

        const localBundle = { ...bundle };
        localBundle.inputData = {
            fullContactName: "Zapier Test Contact",
            jobTitle: "QA Engineer",
            mobilePhone: "+380630000000",
            businessPhone: "+380630000000",
            email:"ztkqa@bpmonline.com",
            notes:"some notes",
            accountId: "00000000-0000-0000-0000-000000000000"
        };
        appTester(App.creates.contact.operation.perform, localBundle)
            .then((contact) => {
                should(contact.Name).eql("Zapier Test Contact");
                should(contact.JobTitle).eql("QA Engineer");
                should(contact.MobilePhone).eql("+380630000000");
                should(contact.Phone).eql("+380630000000");
                should(contact.Email).eql("ztkqa@bpmonline.com");
                should(contact.Notes).eql("some notes");
                if (localBundle.inputData.accountId 
                    && localBundle.inputData.accountId!=="00000000-0000-0000-0000-000000000000"){
                    should(contact.AccountId).eql("e308b781-3c5b-4ecb-89ef-5c1ed4da488e");
                }
                
                done();
            })
            .catch(done);
    });

});
