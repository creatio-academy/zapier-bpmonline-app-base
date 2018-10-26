
function isNullOrWhitespace(input){
    return !input || !input.trim();
}

const dummyAddress = {
    Id : "",
    Address: "",
    Zip: "",
    Primary: false,
    AddressType: {
        Id: "",
        Name:""
    },
    Country: {
        Id: "",
        Name:""
    },
    Region: {
        Id: "",
        Name:""
    },
    City: {
        Id: "",
        Name:""
    },
    Contact: {
        Id: "",
        Name:""
    }
};

module.exports = {
    isNullOrWhitespace: isNullOrWhitespace,
    dummyAddress: dummyAddress
};