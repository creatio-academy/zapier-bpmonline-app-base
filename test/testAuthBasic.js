const should = require('should');
const zapier = require('zapier-platform-core');
const App = require('../index');
const bundle = require('./authcommon');

const appTester = zapier.createAppTester(App);

describe('basic auth app', () => {

  it('Has Authorization header', (done) => {

    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.status.should.eql(200);
        //response.request.headers.Authorization.should.eql('Basic VXNlck9EYXRhOnBhc3N3b3Jk');
        // console.log('response');
        // console.log(response.content);
        done();
      })
      .catch(done);
  });

  it('fails on bad auth', (done) => {
    const bundleLocal = {
      authData: {
        username: 'user',
        password: 'badpwd',
        bpmonlineurl: bundle.authData.bpmonlineurl
      }
    };

    appTester(App.authentication.test, bundleLocal)
      .then(() => {
        done('Should not get here');
      })
      .catch((error) => {
        error.message.should.containEql('The username and/or password you supplied is incorrect');
        done();
      });
  });
});
