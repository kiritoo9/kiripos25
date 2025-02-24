import express from 'express';
import router from '../interfaces/routes/routes';
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import ENV from '../infras/environ';

const app = express();

// define swagger docs
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "kiriPOS service API Documentation",
            contact: {
                name: "kiriPOS helpdesk",
                email: "help@kiripos.com"
            }
        },
        tags: [
            { name: "Welcome", description: "Welcome page for server test" },
            { name: "Masters", description: "Data masters" }
        ],
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./src/interfaces/routes/**/*.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/docs", serve, setup(swaggerDocs));

// initialize routes
app.use("/", router);

// run the server
app.listen(ENV.APP_PORT, () => {
    console.info(`Server is running in :${ENV.APP_PORT}`);
});