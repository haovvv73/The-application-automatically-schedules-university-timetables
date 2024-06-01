import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import initApiRoutes from './routes/apiRoutes.js';
import morgan from 'morgan';

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})