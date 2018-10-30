
const sample = require("../samples/sampleAccount");
// const utils = require("../common/Utilities");

const createAccount = (z, bundle) => {
    let contact = {
        Name: bundle.inputData.accountName,
    };


    const responsePromise = z.request({
        method: 'POST',
        url: '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/AccountCollection',
        body:JSON.stringify(contact)
    });
    return responsePromise
        .then(
            response => {
                var result = JSON.parse(response.content).d;
                //todo: delete unnecessary properties (i.e. __metadata)
                // console.log("createAccount result");
                // console.log(result);
                return result;
            });
};

module.exports = {
    key: 'account',
    noun: 'Account',

    display: {
        label: 'Create Account',
        description: "Adds new account to bpm'online."
    },

    operation: {
        inputFields: [
            { 
                key: 'accountName',
                label: 'Account Name',
                required: true
            },
        ],
        perform: createAccount,

        // todo: contact example
        sample:sample
    }
};
