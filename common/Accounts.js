const utils = require("./Utilities");
const getAccountByName = (z, bundle, accountName) => {

    const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/AccountCollection?' +
    '$select=Id,CreatedOn,Name' +
    '&$orderby=CreatedOn desc' +
    "&$filter=Name eq '" + accountName + "'";

const responsePromise = z.request({
    method: 'GET',
    // todo: sort in reverse-chronological order to make sure new/updated items can be found on the first page of results
    // see https://zapier.com/developer/documentation/v2/deduplication/
    url: url,
});
return responsePromise
    .then(
        response => {
            var results = JSON.parse(response.content).d.results;
            // Got error with "Id" fields. Have to rename them.
            // see https://zapier.com/developer/documentation/v2/app-checks-reference/#ZDE009
            results = results.map(function(account){
                account.id = account.Id;
                delete account.Id;
                // todo: think about __metadata
                delete account.__metadata;
                return account
              });
            // returning first result
            return results[0];
        });
};

const createAccountByName = (z, bundle, accountName) => {
    let contact = {
        Name: accountName,
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
                return result;
            });
};

module.exports = {
    getAccountByName: getAccountByName,
    createAccountByName: createAccountByName
};