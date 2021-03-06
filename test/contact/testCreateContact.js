const App = require('../../index');
const bundle = require('../authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');


const appTester = zapier.createAppTester(App);



describe("Contact create", () => {

    it('should create contact', (done) => {

        const localBundle = { ...bundle };
        localBundle.inputData = {
            fullContactName: "Zapier Test Contact",
            jobTitle: "QA Engineer",
            mobilePhone: "+380630000000",
            businessPhone: "+380630000000",
            email:"ztkqa@bpmonline.com",
            notes:"some notes",
            // accountId: "00000000-0000-0000-0000-000000000000"
            accountId: "e308b781-3c5b-4ecb-89ef-5c1ed4da488e"
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

    it('should create contact with account name', (done) => {

        const localBundle = { ...bundle };
        localBundle.inputData = {
            fullContactName: "Zapier Test Contact",
            jobTitle: "QA Engineer",
            mobilePhone: "+380630000000",
            businessPhone: "+380630000000",
            email:"ztkqa@bpmonline.com",
            notes:"some notes",
            accountName: "Our company"
        };
        appTester(App.creates.contact.operation.perform, localBundle)
            .then((contact) => {
                should(contact.Name).eql("Zapier Test Contact");
                should(contact.JobTitle).eql("QA Engineer");
                should(contact.MobilePhone).eql("+380630000000");
                should(contact.Phone).eql("+380630000000");
                should(contact.Email).eql("ztkqa@bpmonline.com");
                should(contact.Notes).eql("some notes");
                should(contact.AccountId).not.eql("00000000-0000-0000-0000-000000000000")
                
                done();
            })
            .catch(done);
    });

    it('should create contact with non existing account name', (done) => {

        const localBundle = { ...bundle };
        localBundle.inputData = {
            fullContactName: "Zapier Test Contact",
            jobTitle: "QA Engineer",
            mobilePhone: "+380630000000",
            businessPhone: "+380630000000",
            email:"ztkqa@bpmonline.com",
            notes:"some notes",
            accountName: "Our company" + Math.random()
        };
        appTester(App.creates.contact.operation.perform, localBundle)
            .then((contact) => {
                should(contact.Name).eql("Zapier Test Contact");
                should(contact.JobTitle).eql("QA Engineer");
                should(contact.MobilePhone).eql("+380630000000");
                should(contact.Phone).eql("+380630000000");
                should(contact.Email).eql("ztkqa@bpmonline.com");
                should(contact.Notes).eql("some notes");
                should(contact.AccountId).not.eql("00000000-0000-0000-0000-000000000000")
                
                done();
            })
            .catch(done);
    });


});
