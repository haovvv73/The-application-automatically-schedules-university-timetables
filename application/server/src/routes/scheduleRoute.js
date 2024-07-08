import express from "express"
import { createSchedule, deleteSchedule, getSchedules, updateSchedule } from "../controllers/scheduleController.js"

let router = express.Router()


router.post('/', createSchedule)
router.delete('/:id', deleteSchedule)
router.put('/', updateSchedule)
router.get('/', getSchedules)
router.get('/:id', getSchedules)

export {router as initScheduleRoute} 