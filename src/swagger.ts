import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "./config";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "QuestionPro-Grocery-Booking-API",
      version: "1.0.0",
      description: "API documentation for QuestionPro-Grocery-Booking-API",
    },
    servers: [
      {
        url: config.swaggerUrl,
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
