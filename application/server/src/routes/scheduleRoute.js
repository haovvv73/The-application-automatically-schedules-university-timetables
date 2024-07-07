import express from "express"
import { createSchedule, deleteSchedule, getSchedules, updateSchedule } from "../controllers/scheduleController.js"

let router = express.Router()


router.post('/', createSchedule)
router.delete('/', deleteSchedule)
router.put('/', updateSchedule)
router.get('/', getSchedules)

export {router as initScheduleRoute} 