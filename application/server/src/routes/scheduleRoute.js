import express from "express"
import { createSchedule } from "../controllers/scheduleController"

let router = express.Router()

// test schedule generate
router.get('/test', createSchedule)


export {router as initScheduleRoute} 