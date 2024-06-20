import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import initApiRoutes from './routes/apiRoutes.js';
import morgan from 'morgan';
import httpStatusCode from './helpers/httpStatusCode.js';
import { errorResponse } from './helpers/httpResponse.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 40420

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// config CORS
app.use(
    cors({
        origin: '*',
    })
);

// logger middleware
app.use(morgan('combined'))

// init all routes
initApiRoutes(app)

// 404 not foud
app.use((req, res) => {
    return errorResponse(res, httpStatusCode.NotFound, httpStatusCode.NotFound.code)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})