import express from 'express';
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';

import ENV from '../infras/environ';
import { ensureConnection } from '../infras/database/sequelize';
import router from '../interfaces/routes/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initiate swagger docs
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
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
            { name: "Auth", description: "Authentication" },
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
ensureConnection().then(() => {
    app.listen(ENV.APP_PORT, () => {
        console.info(`Server is running in :${ENV.APP_PORT}`);
    });
});