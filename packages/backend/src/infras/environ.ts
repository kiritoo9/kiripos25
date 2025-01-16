import dotenv from "dotenv";
dotenv.config();

interface environ {
    // application identity
    APP_NAME: string;
    APP_PORT: string | number;
    APP_VER: string | number;

    // database default connection
    DB_HOST: string | number | null;
    DB_USER: string | null;
    DB_PASS: string | null;
    DB_NAME: string | null;
    DB_PORT: string | number | null;
}

const ENV: environ = {
    APP_NAME: process.env.APP_NAME ?? "BACKEND_SERVICE",
    APP_PORT: process.env.APP_PORT ?? 5000,
    APP_VER: process.env.APP_VER ?? 0.1,

    DB_HOST: process.env.DB_HOST ?? null,
    DB_USER: process.env.DB_USER ?? null,
    DB_PASS: process.env.DB_PASS ?? null,
    DB_NAME: process.env.DB_NAME ?? null,
    DB_PORT: process.env.DB_PORT ?? null,
}
export default ENV;