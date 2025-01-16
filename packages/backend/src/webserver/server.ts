import express from 'express';
import router from '../interfaces/routes/routes';
import ENV from '../infras/environ';

const app = express();

// initialize routes
app.use("/", router);

// run the server
app.listen(ENV.APP_PORT, () => {
    console.info(`Server is running in :${ENV.APP_PORT}`);
});