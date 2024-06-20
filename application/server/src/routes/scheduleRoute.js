import express from "express"
import { createSchedule } from "../controllers/scheduleController.js"

let router = express.Router()

// test schedule generate
router.get('/generate', createSchedule)

export {router as initScheduleRoute} 