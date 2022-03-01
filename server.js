import dotenv from 'dotenv';
import bodyParser from "body-parser";
import boom from "express-boom";
import routes from "./src/routes";
import express from "express";
import cors from "cors";
import useragent from 'express-useragent';
import expressDevice from 'express-device';
import utils from './src/utils';

dotenv.config();
const app = express();

if (process.env.NODE_ENV !== 'production') {
   app.use(cors())
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(boom());
app.use(useragent.express());
app.use(expressDevice.capture());
app.set('trust proxy', true);

/** initialize route */
routes.initRoutes(app);

// set port, listen for requests
console.log("env port :- ", process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});
