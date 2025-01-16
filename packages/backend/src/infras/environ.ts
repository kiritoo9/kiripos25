import dotenv from "dotenv";
dotenv.config();

interface environ {
    // application identity
    APP_NAME: string;
    APP_PORT: string | number;
    APP_VER: string | number;

    // database default connection
    DB_HOST: string | undefined;
    DB_USER: string | undefined;
    DB_PASS: string | undefined;
    DB_NAME: string | undefined;
    DB_PORT: any;
}

const ENV: environ = {
    APP_NAME: process.env.APP_NAME ?? "BACKEND_SERVICE",
    APP_PORT: process.env.APP_PORT ?? 5000,
    APP_VER: process.env.APP_VER ?? 0.1,

    DB_HOST: process.env.DB_HOST ?? "",
    DB_USER: process.env.DB_USER ?? "",
    DB_PASS: process.env.DB_PASS ?? "",
    DB_NAME: process.env.DB_NAME ?? "",
    DB_PORT: process.env.DB_PORT ?? 5050, // default pgsql port
}
export default ENV;