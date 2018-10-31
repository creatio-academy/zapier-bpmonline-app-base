
const sample = require("../samples/sampleContact");
const utils = require("../common/Utilities");
const accountsCommon = require('../common/Accounts')

async function createContact (z, bundle) {
    let contact = {
        Name: bundle.inputData.fullContactName,
        JobTitle: bundle.inputData.jobTitle,
        MobilePhone: bundle.inputData.mobilePhone,
        Phone: bundle.inputData.businessPhone,
        Email: bundle.inputData.email,
        Notes: bundle.inputData.notes,
    };

    let accountName = bundle.inputData.accountName;
    let accountId = bundle.inputData.accountId;
    if (accountId === "00000000-0000-0000-0000-000000000000"){
        accountId = "";
    }
    if (!utils.isNullOrWhitespace(accountId)){
        contact.AccountId = accountId;
    }
    else if (!utils.isNullOrWhitespace(accountName)) {
        var account = await accountsCommon.getAccountByName(z,bundle,accountName);
        if (account && account.id){
            contact.AccountId = account.id;
        }
        else {
            newAccount = await accountsCommon.createAccountByName(z,bundle,accountName);
            if (newAccount && newAccount.Id){
                contact.AccountId = newAccount.Id;
            }
        }
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
        description: "Add new contact to bpm'online."
    },

    operation: {
        inputFields: [
            { 
                key: 'fullContactName',
                label: 'Full Name',
                helpText: 'Consists of given name, middle name and surname.',
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
                label: "Account Name",
                helpText: 'Use account name, if you do not know account Id. If account does not exist, it will be created.',
            },
            
        ],
        perform: createContact,
        sample:sample
    }
};
