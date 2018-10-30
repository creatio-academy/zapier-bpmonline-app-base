const sample = require("../samples/sampleAccount");


const getFilerString = (searchBy) => {
    let filter = "";
    switch(searchBy){
        case "accountName":
            filter = `&$filter=Name eq '{{bundle.inputData.accountName}}'`;
        break;
    }
    
    return filter;
};

const findAccounts = (z, bundle) => {
    const filter = getFilerString(bundle.inputData.searchBy);
    
    // const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection?' +
    //     '$select=Id,CreatedOn,Name,Surname,GivenName,MiddleName,JobTitle,MobilePhone,Phone,Email,Notes,Account/Id,Account/Name,Account/Type/Id,Account/Type/Name' +
    //     '&$orderby=CreatedOn desc' +
    //     "&$expand=Account,Account/Type" +  filter;
    const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/AccountCollection?' +
        '$select=Id,CreatedOn,Name' +
        '&$orderby=CreatedOn desc' +
        filter;

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
                //   z.console.log("findContact results");
                //   z.console.log(results);
                return results;
            });
};


async function searchAccounts(z, bundle) {
    let accounts = await findAccounts(z, bundle);

    // z.console.log("searchAccounts results");
    // z.console.log(accounts);
    return accounts;
};

module.exports = {
    key: 'account',
    noun: 'Account',

    display: {
        label: 'Find Accounts',
        description: "Search for bpm'online accounts."
    },
    operation: {
        inputFields: [
            {
                key: 'searchBy',
                required: true,
                label: 'Search By',
                choices: {
                    accountName: 'Account Name',
                },
                helpText: 'Default is "Account Name"' 
            },  
            {
                key: 'accountName',
                type: 'string',
                label: 'Account Name ',
                helpText: "The name of the account in the bpm'online."
            },
           
        ],
    
        perform: searchAccounts,
    
        sample: sample,
    
        // outputFields: [
        //   {key: 'id', label: 'ID'},
        //   //{key: 'createdAt', label: 'Created At'},
        //   {key: 'Name', label: 'Name'},
        // ]
      }
}