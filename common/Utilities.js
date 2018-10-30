const fs = require("fs");

function isNullOrWhitespace(input){
    return !input || !input.trim();
}


async function saveToJson (object, filename) {
    const json = JSON.stringify(object, null, 2);
    await fs.writeFile(filename, json, "utf-8",(err)=>{
        if (err) console.log(err);
    });
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
    dummyAddress: dummyAddress,
    saveToJson: saveToJson
};