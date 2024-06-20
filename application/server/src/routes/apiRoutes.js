import express from 'express';
import { initAuthRoute } from './authRoute.js';
import { initScheduleRoute } from './scheduleRoute.js';

const router = express.Router()

const initApiRoutes = (app)=>{

    router.get('/helloworld', (req,res)=>{
        return res.send('Hello World!')
    })

    router.use('/auth', initAuthRoute)

    router.use('/schedule', initScheduleRoute)

    return app.use('/api/v1',router)
}

export default initApiRoutes