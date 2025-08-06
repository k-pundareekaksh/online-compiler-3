const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid'); /* to generate a unique name for each file, 
// used to ensure file names never clash even when several users hit the endpoint at the same time.*/

/*
In order to compile / execute the program we must first write that text
into a real file so that tools like `g++` can read it. */


const dirCodes = path.join(__dirname, 'codes'); /*We keep things tidy by placing every generated file inside a dedicated
`codes` folder (created automatically if it does not yet exist). */

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive : true});
}

// saving the code into a .cpp file when received from frontend 

const generateFile = (format, content) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, content);
    return filepath;
};

module.exports = {
    generateFile,
};

/* The main export is `generateFile(extension, code)` which returns **the full
path** of the freshly-created file so that the caller can pass it to the
next build / run step. */