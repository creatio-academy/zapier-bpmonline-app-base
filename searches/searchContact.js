const sample = require("../samples/sampleContact");
const findContact = (z, bundle) => {
    const responsePromise = z.request({
        method: 'GET',
        // todo: sort in reverse-chronological order to make sure new/updated items can be found on the first page of results
        // see https://zapier.com/developer/documentation/v2/deduplication/
        url: "{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection?" + 
        "$select=Id,Name,CreatedOn"+
        "&$filter=Name eq '{{bundle.inputData.contactName}}'",
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
                    return contact
                  });
                  z.console.log("findContact results");
                  z.console.log(results);
                return results;
            });
};

module.exports = {
    key: 'contact',
    noun: 'Contact',

    display: {
        label: 'Find a Contact',
        description: 'Search for contact by name.'
    },
    operation: {
        inputFields: [
          {
            key: 'contactName',
            type: 'string',
            label: 'Contact name',
            helpText: "Full name of the contact in the bpm'online."
          }
        ],
    
        perform: findContact,
    
        sample: sample,
    
        outputFields: [
          {key: 'id', label: 'ID'},
          //{key: 'createdAt', label: 'Created At'},
          {key: 'Name', label: 'Name'},
        ]
      }
}