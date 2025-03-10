import express from 'express';
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
import path from "path";

import ENV from '../infras/environ';
import { ensureConnection } from '../infras/database/sequelize';
import router from '../interfaces/routes/routes';

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// serve static file
app.use("/cdn", express.static(path.join(process.cwd(), "cdn")));

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
            { name: "Master - Tenants", description: "Data master of tenants" },
            { name: "Master - Roles", description: "Data master of roles" },
            { name: "Master - Branches", description: "Data master of branches" },
            { name: "Master - Users", description: "Data master of users" },
            { name: "Master - Menus", description: "Data master of menus" },
            { name: "Master - Role Menus", description: "List of menus each roles" },
            { name: "Master - Tables", description: "List of tables available" },
            { name: "Master - Product Categories", description: "List of product categories available" },
            { name: "Master - Products", description: "List of product available" },
        ],
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            { BearerAuth: [] }, // to catch bearer-header
        ],
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