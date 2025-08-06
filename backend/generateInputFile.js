const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid');


const dirInputs = path.join(__dirname, 'inputs');

if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive : true});
}


const generateInputFile = (input) => {
    const jobID = uuid();
    const inputFilename = `${jobID}.txt`;
    const inputFilepath = path.join(dirInputs, inputFilename);
    fs.writeFileSync(inputFilepath, input);
    return inputFilepath;
};

module.exports = {
    generateInputFile,
};