import express from 'express';
import { initAuthRoute } from './authRoute.js';
import { initScheduleRoute } from './scheduleRoute.js';
import { initSubjectRoute } from './subjectRoute.js';
import { initRoomRoute } from './roomRouter.js';
import { initLecturerRoute } from './lecturerRoute.js';
import { initCourseRoute } from './courseRoute.js';
import { initRequestRoute } from './requestRoute.js';
import { initNotificationRoute } from './notificationRoute.js';
import jwt from "jsonwebtoken"

const router = express.Router()


// Middleware to extract and verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const initApiRoutes = (app) => {

    // heathy check
    router.get('/helloworld', (req, res) => {
        return res.send('Hello World!')
    })

    router.use('/auth', initAuthRoute)

    router.use('/schedule', initScheduleRoute)

    router.use('/subject', initSubjectRoute)

    router.use('/room', initRoomRoute)

    router.use('/lecturer', initLecturerRoute)

    router.use('/course', initCourseRoute)

    router.use('/request', initRequestRoute)

    router.use('/notification', initNotificationRoute)

    return app.use('/api/v1', router)
}

export default initApiRoutes
