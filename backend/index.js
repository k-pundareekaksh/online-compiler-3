const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// we have generated a cpp file using generateFile.js with its unique name, now we have to compile it
const { generateFile } = require("./generateFile.js");
const { executeCpp } = require("./executeCpp.js");
const { generateInputFile } = require("./generateInputFile.js");
const { generateAiReview } = require("./generateAiReview.js");


const app = express();
dotenv.config();


const PORT = process.env.PORT || 8000;

app.listen(PORT, (error)=> {
    if(error) {
        console.log("Error while running the server!");
    }
    else {
        console.log(`Server is listening on port ${PORT}!`);
    }
})

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.get("/", (req, res) => {
    res.json({ online: 'compiler'});
});


app.post("/run", async (req, res) => {
    //const language = req.body.language;
    //const code = req.body.code;

    const { language = "cpp", code, input } = req.body || {};

    if(code === undefined || code.trim() === "") {
        return res.status(404).json({
            success: false,
            error: "Empty code! Please provide some code to excecute"
        });
    }

    try {
        const filePath = generateFile(language, code);
        const inputFilePath = generateInputFile(input);
        const output = await executeCpp(filePath, inputFilePath);

        res.json({ filePath, output, inputFilePath });
    } catch (error) {
        res.status(500).json({ error: error}); // http 500 is internal server error
    }
});

app.post("/ai-review", async (req, res) => {
    const { code } = req.body;

    if(code === undefined || code.trim() === "") {
        return res.status(404).json({
            success: false,
            error: "Empty code! Please provide some code to excecute"
        });
    }

    try {
        const aiReview = await generateAiReview(code); 
        res.status(200).json({ 
            success : true, 
            aiReview,
        })

    } catch (error) {
        console.log("Error in AI Review: ", error.message);
        res.status(500).json({
            success : false,
            error: error.message || error.toString() || "Error in AI Review endpoint",
        });
    }
});














// notes for my revision ->

// compiler only handles /api/run part
// compiler will only contain the run logic - which will run our code


// we are using microservices architecure here, in which every service is independent of another service, those services are focused on different functionalities
// in monolithical architecture we have a single backend server which handles everything -> easier for development, but not as scalable.
// Microservices also offer improved fault isolation whereby in the case of an error in one service the whole application doesn’t necessarily stop functioning. When the error is fixed, it can be deployed only for the respective service instead of redeploying an entire application.

// in horizontal scaling - we create multiple cloud servers and each cloud server will be working on some feature so in microservices architecture it is easy to horizontally scale. 
// each microservice can have a different technology
// in monolithical functionalities are tightly coupled so horiz scaling is hard

// in vertical scaling - we increase size of instance, eg, better RAM, more storage, but in horiz scaling - we increase the number of such instances

// Vertical scaling aims to improve the performance and capacity of the system to handle higher loads or more complex tasks without changing the fundamental architecture or adding additional servers.