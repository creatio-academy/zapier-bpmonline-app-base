const utils = require("./Utilities");
const getContactAddressesByType = (z, bundle, contactId, addressTypeId) => {


    const url = '{{bundle.authData.bpmonlineurl}}/0/ServiceModel/EntityDataService.svc/ContactAddressCollection?' +
        "$select=Id,Address,Zip,Primary,Contact/Id,Contact/Name,Country/Id,Country/Name," +
        "Region/Id,Region/Name,City/Id,City/Name,AddressType/Id,AddressType/Name" +
        "&$expand=Contact,Country,Region,City,AddressType" +
        "&$filter=" +
        "Contact/Id eq guid'" + contactId + "' and " +
        "AddressType/Id eq guid'" + addressTypeId + "'";

    const promise = z.request({
        method: 'GET',
        url: url,
    });

    return promise
        .then(
            response => {
                let results = JSON.parse(response.content).d.results;
                // todo: make dummy address object
                let result =utils. dummyAddress;
                if (results.length > 0) {
                    result = results[0];
                    // todo: think about __metadata
                    delete result.__metadata;
                    delete result.AddressType.__metadata;
                    delete result.Country.__metadata;
                    delete result.City.__metadata;
                    delete result.Region.__metadata;
                    delete result.Contact.__metadata;
                }
                return result;
            }
        )
}

module.exports = {
    getContactAddressesByType: getContactAddressesByType
};