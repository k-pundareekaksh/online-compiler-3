const { exec } = require("child_process"); // creates a new process inside the terminal/cmd and inside it we can run the commands we want like g++ and ./a.out to compile and execute
const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require("process");

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive : true });
};

const executeCpp = async (filepath, inputFilepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        const cppcommand = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "./${jobId}.exe" < "${inputFilepath}"`;
        exec(cppcommand, (error, stdout, stderr) => {
            console.log(filepath);
            console.log(" ");
            console.log(outPath);
            if(error) {
                reject({error, stderr});
            }
            if(stderr) {
                reject({stderr});
            }
            resolve(stdout);
        });
    });
};

module.exports = {executeCpp};