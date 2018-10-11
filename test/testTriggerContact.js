const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('..');
const appTester = zapier.createAppTester(App);

const bundle = require('./authcommon');


describe("contact trigger", () => {
  

it('should get contacts', (done) => {
    // Try changing the values of username or password to see how the test method behaves
   
    bundle.inputData.filter = 'all';

    // console.log('bundle');
    // console.log(bundle);

    // console.log('contact trigger operation');
    // console.log(App.triggers.contact.operation);

    appTester(App.triggers.contact.operation.perform, bundle)
      .then((contacts) => {
        // todo: do something
        should(contacts).be.instanceof(Array);
        should(contacts.length).be.above(0);
        done();
      })
      .catch(done);
  });


  // it('has auth cookies and bpmcsrf added to every request', (done) => {

  //   appTester(App.authentication.test, bundle)
  //     .then((response) => {
  //       response.status.should.eql(200);
  //       //console.log(response.request.headers);
  //       const cookie = response.request.headers['cookie'];
  //       should(cookie).be.instanceOf(Array);
  //       // BPMLOADER added twice!!!!
  //       should(cookie.length).eql(6);
  //       const BPMCSRF = response.request.headers['BPMCSRF'];
  //       should(BPMCSRF).be.eql(bundle.authData.BPMCSRF);
  //       done();
  //     })
  //     .catch(done);
  // });


});
