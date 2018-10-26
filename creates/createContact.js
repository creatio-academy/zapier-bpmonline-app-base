
const sample = require("../samples/sampleContact");
const utils = require("../utils/Utilities");

const createContact = (z, bundle) => {
    let contact = {
        Name: bundle.inputData.fullContactName,
        JobTitle: bundle.inputData.jobTitle,
        MobilePhone: bundle.inputData.mobilePhone,
        Phone: bundle.inputData.businessPhone,
        Email: bundle.inputData.email,
        Notes: bundle.inputData.notes,
    };

    let accountId = bundle.inputData.accountId;
    if (accountId === "00000000-0000-0000-0000-000000000000"){
        accountId = "";
    }
    let accountName = bundle.inputData.accountName;
    if (!utils.isNullOrWhitespace(accountId)){
        contact.AccountId = accountId;
    }
    else if (!utils.isNullOrWhitespace(accountName)) {
        // todo: find account id by name
        //console.log(accountName);
    }

    const responsePromise = z.request({
        method: 'POST',
        url: '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection',
        body:JSON.stringify(contact)
    });
    return responsePromise
        .then(
            response => {
                var result = JSON.parse(response.content).d;
                //todo: delete unnecessary properties (i.e. __metadata)
                // z.console.log("createContact result");
                // z.console.log(result);
                return result;
            });
};

module.exports = {
    key: 'contact',
    noun: 'Contact',

    display: {
        label: 'Create Contact',
        description: "Adds new contact to bpm'online."
    },

    operation: {
        inputFields: [
            { 
                key: 'fullContactName',
                label: 'Full Name ([Given name] [Middle name] [Surname])',
                required: true
            },
            { 
                key: 'jobTitle',
                label: 'Job Title'
            },
            { 
                key: 'mobilePhone',
                label: 'Mobile Phone'
            },
            { 
                key: 'businessPhone',
                label: 'Business Phone'
            },
            { 
                key: 'email',
                label: 'Email'
            },
            { 
                key: 'notes',
                label: 'Notes'
            },
            { 
                key: 'accountId',
                label: 'Account Id'
            },
            { 
                key: 'accountName',
                label: "Account Name (if you don't have Account Id)"
            },
            
        ],
        perform: createContact,

        // todo: contact example
        sample:sample
    }
};
