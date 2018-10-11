const triggerContact = (z, bundle) => {
    const responsePromise = z.request({
        method: 'GET',
        url: '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection?$select=Id,Name',
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
                  z.console.log("triggerContact results");
                  z.console.log(results);
                return results;
            });
};

module.exports = {
    key: 'contact',
    noun: 'Contact',

    display: {
        label: 'Get Contacts',
        description: 'Triggers on a new contact.'
    },

    operation: {
        inputFields: [
            { key: 'filter', required: false, label: 'Filter', choices: { all: 'all' }, helpText: 'Default is "all"' }
        ],
        perform: triggerContact,

        // todo: contact example
        sample:
        {
            "__metadata": {
                "id": "http://localhost/7.13.0.284_Bundle_Simuta/0/ServiceModel/EntityDataService.svc/ContactCollection(guid'c4ed336c-3e9b-40fe-8b82-5632476472b4')",
                "uri": "http://localhost/7.13.0.284_Bundle_Simuta/0/ServiceModel/EntityDataService.svc/ContactCollection(guid'c4ed336c-3e9b-40fe-8b82-5632476472b4')",
                "type": "Terrasoft.Configuration.Contact"
            },
            "id": "c4ed336c-3e9b-40fe-8b82-5632476472b4",
            "Name": "Andrew Baker (sample)"
        }
    }
};
