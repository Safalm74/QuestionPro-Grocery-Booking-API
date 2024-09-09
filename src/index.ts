import express from "express";
import config from "./config";
import router from "./routes";
import { swaggerDocs, swaggerUi } from "./swagger";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

// Use the Swagger UI middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Middleware to parse incoming requests with JSON payloads
app.use(express.json());

//Middleware to parse cookies
app.use(cookieParser());

//Middleware to handle API requests
app.use(router);

//Start server
app.listen(config.port, () => console.log(`Listening in port: ${config.port}`));
