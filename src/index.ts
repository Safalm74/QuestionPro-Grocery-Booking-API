import express from "express";
import config from "./config";
import router from "./routes";

const app = express();

//Middleware to parse incoming requests with JSON payloads
app.use(express.json());

//Middleware to handle API requests
app.use(router);

//Start server
app.listen(config.port, () => console.log(`Listening in port: ${config.port}`));
