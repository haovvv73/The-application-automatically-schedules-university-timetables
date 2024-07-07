import express from 'express';
import { initAuthRoute } from './authRoute.js';
import { initScheduleRoute } from './scheduleRoute.js';
import { initSubjectRoute } from './subjectRoute.js';
import { initRoomRoute } from './roomRouter.js';
import { initLecturerRoute } from './lecturerRoute.js';

const router = express.Router()

const initApiRoutes = (app)=>{

    // heathy check
    router.get('/helloworld', (req,res)=>{
        return res.send('Hello World!')
    })

    router.use('/auth', initAuthRoute)

    router.use('/schedule', initScheduleRoute)

    router.use('/subject', initSubjectRoute)

    router.use('/room', initRoomRoute)

    router.use('/lecturer', initLecturerRoute)

    return app.use('/api/v1',router)
}

export default initApiRoutes