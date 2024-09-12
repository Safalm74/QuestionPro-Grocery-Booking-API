import express from "express";
import config from "./config";
import router from "./routes";
import { swaggerDocs, swaggerUi } from "./swagger";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middlewares/logger";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
import helmet from "helmet";

const app = express();

//Middleware to add security level
app.use(helmet());

//Middleware to enable cors
app.use(cors());

// Use the Swagger UI middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Middleware to log
app.use(requestLogger);

//Middleware to parse incoming requests with JSON payloads
app.use(express.json());

//Middleware to parse cookies
app.use(cookieParser());

//Middleware to handle API requests
app.use(router);

//Middleware to handle errors
app.use(genericErrorHandler);

//Middleware to handle if route requested is not found
app.use(notFoundError);

//Start server
app.listen(config.port, () => console.log(`Listening in port: ${config.port}`));
