const App = require('..');
const bundle = require('./authcommon');
const should = require('should');
const zapier = require('zapier-platform-core');

const appTester = zapier.createAppTester(App);

describe("contact search", () => {
  it('should get array of contacts with specified name', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
      fullContactName: "Supervisor",
      searchBy:"fullContactName"
      // fullContactName: "Zapier Test Contact"
    };
    appTester(App.searches.contact.operation.perform, localBundle)
      .then((contacts) => {
          //todo: all names should be ZapierContact
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        contacts.forEach(element => {
            should(element.Name).eql(localBundle.inputData.fullContactName);
        });
        done();
      })
      .catch(done);
  });

  it('should get array of contacts with specified email', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
      email: "a.baker@ac.com",
      searchBy:"email"
      // fullContactName: "Zapier Test Contact"
    };
    appTester(App.searches.contact.operation.perform, localBundle)
      .then((contacts) => {
          //todo: all names should be ZapierContact
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        contacts.forEach(element => {
            should(element.Email).eql(localBundle.inputData.email);
        });
        done();
      })
      .catch(done);
  });

  it('should get array of contacts with specified business phone', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
      businessPhone: "+1 617 440 2031",
      searchBy:"businessPhone"
      // fullContactName: "Zapier Test Contact"
    };
    appTester(App.searches.contact.operation.perform, localBundle)
      .then((contacts) => {
          //todo: all names should be ZapierContact
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        contacts.forEach(element => {
            should(element.Phone).eql(localBundle.inputData.businessPhone);
        });
        done();
      })
      .catch(done);
  });

  it('should get array of contacts with specified mobile phone', (done) => {

    const localBundle = { ...bundle };
    localBundle.inputData = {
      mobilePhone: "+1 617 221 5187",
      searchBy:"mobilePhone"
      // fullContactName: "Zapier Test Contact"
    };
    appTester(App.searches.contact.operation.perform, localBundle)
      .then((contacts) => {
          //todo: all names should be ZapierContact
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        contacts.forEach(element => {
            should(element.MobilePhone).eql(localBundle.inputData.mobilePhone);
        });
        done();
      })
      .catch(done);
  });

});
