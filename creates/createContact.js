const createContact = (z, bundle) => {
    const responsePromise = z.request({
        method: 'POST',
        url: '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactCollection',
        body:JSON.stringify({
            Name: bundle.inputData.contactName
        })
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
        description: 'Creates a new contact.'
    },

    operation: {
        inputFields: [
            { key: 'contactName', label: 'Contact name', required: true}
        ],
        perform: createContact,

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
