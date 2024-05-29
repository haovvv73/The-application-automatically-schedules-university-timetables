import express from 'express';
import { initAuthRoute } from './authRoute.js';

const router = express.Router()

const initApiRoutes = (app)=>{

    router.use('/auth', initAuthRoute)

    return app.use('/api/v1',router)
}

export default initApiRoutes