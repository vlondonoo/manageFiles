const express = require("express");
var cors = require("cors");
const request = require("request");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const formidable = require("formidable");
const fs = require("fs");
const config = require("./config.js");

// File upload settings
const PATH = "./uploads";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now());
    },
});

let upload = multer({
    storage: storage,
});

app.use(
    cors({
        origin: "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Content-type": "*",
    })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.post("/addFile", upload.single("file"), (req, res) => {
    res.send({ data: "data uploaded" });

    /* request.post({
                                                                                                url: "https://govcarpetaapp.mybluemix.net/apis/registerCitizen",
                                                                                                json: true,
                                                                                                body: req.body,
                                                                                            },
                                                                                            function optionalCallback(err, httpResponse, body) {
                                                                                                if (err) {
                                                                                                    return console.error("Error:", err);
                                                                                                }
                                                                                                console.log("Server responded with:", body);
                                                                                                res.send({ data: body });
                                                                                            }
                                                                                        ); */
    /* const serviceKey = path.join(
                                                                                            __dirname,
                                                                                            "../todoapp-340315-afea0b69e558.json"
                                                                                        );
                                                                                        let gcStorage = new Storage({
                                                                                            keyFilename: serviceKey,
                                                                                            projectId: "todoapp-340315",
                                                                                        });
                                                                                        const bucket = gcStorage.bucket("todo-images");

                                                                                        const newTodo = await TodoModel.create({
                                                                                            message: req.body.message,
                                                                                            state: "OPEN",
                                                                                            image: "",
                                                                                        });

                                                                                        const fileToUpload = req.files[0];

                                                                                        // GCP Storage
                                                                                        fileToUpload.buffer = fs.readFileSync(fileToUpload.path);
                                                                                        const { originalname, buffer } = fileToUpload;

                                                                                        const blob = bucket.file(originalname.replace(/ /g, "_"));
                                                                                        const blobStream = blob.createWriteStream({
                                                                                            resumable: false,
                                                                                        });
                                                                                        console.log("Name to be saved ", blob.name);
                                                                                        this.fileName = blob.name;
                                                                                        blobStream
                                                                                            .on("finish", () => {
                                                                                                const bucketUrl = format(
                                                                                                    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                                                                                                );
                                                                                                console.log("finish sucess", bucketUrl);
                                                                                            })
                                                                                            .on("error", (e) => {
                                                                                                console.log("Error ", e);
                                                                                            })
                                                                                            .end(buffer);

                                                                                        newTodo.image = blob.name;
                                                                                        await newTodo.save({ fields: ["image"] });*/
});

app.listen(config.PORT, () => console.log(`Server started ${config.PORT}`));