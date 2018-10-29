const sample = require("../samples/sampleContact");
const contactsCommon = require("../common/Contacts");

const getFilerString = (searchBy) => {
    let filter = "";
    switch(searchBy){
        case "fullContactName":
            filter = `&$filter=Name eq '{{bundle.inputData.fullContactName}}'`;
        break;
        case "email":
            filter = `&$filter=Email eq '{{bundle.inputData.email}}'`;
        break;
        case "businessPhone":
            filter = `&$filter=Phone eq '{{bundle.inputData.businessPhone}}'`;
        break;
        case "mobilePhone":
            filter = `&$filter=MobilePhone eq '{{bundle.inputData.mobilePhone}}'`;
        break;
    }
    
    return filter;
};

const findContacts = (z, bundle) => {
    const filter = getFilerString(bundle.inputData.searchBy);
    //console.log("filter", filter);
    const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection?' +
        '$select=Id,CreatedOn,Name,Surname,GivenName,MiddleName,JobTitle,MobilePhone,Phone,Email,Notes,Account/Id,Account/Name,Account/Type/Id,Account/Type/Name' +
        '&$orderby=CreatedOn desc' +
        "&$expand=Account,Account/Type" +  filter;
    //console.log("url", url);
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
                results = results.map(function(contact){
                    contact.id = contact.Id;
                    delete contact.Id;
                    // todo: think about __metadata
                    delete contact.__metadata;
                    delete contact.Account.__metadata;
                    delete contact.Account.Type.__metadata;
                    return contact
                  });
                //   z.console.log("findContact results");
                //   z.console.log(results);
                return results;
            });
};


async function searchContacts(z, bundle) {
    let contacts = await findContacts(z, bundle);

    let len = contacts.length;
    for (let i = 0; i < len ; i++){
        let addressTypeId = "fb7a3f6a-f36b-1410-6f81-1c6f65e50343"; //business
        let address =  await contactsCommon.getContactAddressesByType(z, bundle, contacts[i].id, addressTypeId);
        contacts[i].BusinessAddress = address;
    }
    z.console.log("searchContacts results");
    z.console.log(contacts);
    return contacts;
};

module.exports = {
    key: 'contact',
    noun: 'Contact',

    display: {
        label: 'Find Contacts',
        description: "Search for bpm'online contacts."
    },
    operation: {
        inputFields: [
            {
                key: 'searchBy',
                required: true,
                label: 'Search By',
                choices: {
                    fullContactName: 'Full Name',
                    email: 'Email',
                    businessPhone: 'Business Phone',
                    mobilePhone: 'Mobile Phone',
                    all: 'All'
                },
                helpText: 'Default is "Full Name"' 
            },  
            {
                key: 'fullContactName',
                type: 'string',
                label: 'Full Name ([Given name] [Middle name] [Surname])',
                helpText: "Full name of the contact in the bpm'online."
            },
            {
                key: 'email',
                type: 'string',
                label: 'Email'
            },
            {
                key: 'businessPhone',
                type: 'string',
                label: 'Business Phone'
            },
            {
                key: 'mobilePhone',
                type: 'string',
                label: 'Mobile Phone'
            }
        ],
    
        perform: searchContacts,
    
        sample: sample,
    
        // outputFields: [
        //   {key: 'id', label: 'ID'},
        //   //{key: 'createdAt', label: 'Created At'},
        //   {key: 'Name', label: 'Name'},
        // ]
      }
}