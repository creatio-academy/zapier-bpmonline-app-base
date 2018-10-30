const sample = require("../samples/sampleAccount");
const utils = require("../common/Utilities");


const getAccounts = (z, bundle) => {

    // const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection?' +
    //     '$select=Id,CreatedOn,Name,Surname,GivenName,MiddleName,JobTitle,MobilePhone,Phone,Email,Notes,Account/Id,Account/Name,Account/Type/Id,Account/Type/Name' +
    //     '&$orderby=CreatedOn desc' +
    //     "&$expand=Account,Account/Type";
    const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/AccountCollection?' +
        '$select=Id,CreatedOn,Name' +
        '&$orderby=CreatedOn desc';
    const promise = z.request({
        method: 'GET',
        // todo: sort in reverse-chronological order to make sure new/updated items can be found on the first page of results
        // see https://zapier.com/developer/documentation/v2/deduplication/
        url: url,
    });
    return promise
        .then(
            response => {
                var results = JSON.parse(response.content).d.results;
                // Got error with "Id" fields. Had to rename them.
                // see https://zapier.com/developer/documentation/v2/app-checks-reference/#ZDE009
                results = results.map(function (account) {
                    account.id = account.Id;
                    delete account.Id;
                    // todo: think about __metadata
                    delete account.__metadata;
                    return account;
                });
                
                return results;
            });
}

async function triggerAccount(z, bundle) {
    let accounts = await getAccounts(z, bundle);
    // console.log("triggerAccount results");
    // console.log(accounts);
    //await utils.saveToJson(accounts, "c:\\sample.json");
    return accounts;
};

module.exports = {
    key: 'account',
    noun: 'Account',

    display: {
        label: 'Get New Account',
        description: 'Triggers on a account creation.'
    },

    operation: {
        inputFields: [
            //todo: Add filter by contact address type
            { key: 'filter', required: false, label: 'Filter', choices: { all: 'all' }, helpText: 'Default is "all"' }
        ],
        perform: triggerAccount,
        sample: sample
    }
};
