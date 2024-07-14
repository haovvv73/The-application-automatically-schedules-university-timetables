import express from "express"
import { continueSchedule, createSchedule, deleteSchedule, getSchedules, updateSchedule } from "../controllers/scheduleController.js"

let router = express.Router()


router.post('/', createSchedule)
router.post('/continue', continueSchedule)
router.delete('/:id', deleteSchedule)
router.put('/', updateSchedule)
router.get('/', getSchedules)
router.get('/:id', getSchedules)

export {router as initScheduleRoute} 