import express from "express"
import { deleteRoom, getRoom, saveRoom, updateRoom } from "../controllers/roomController.js"
import { deleteLecturer, getLecturer, saveLecturer, updateLecturer } from "../controllers/lecturerController.js"

let router = express.Router()

router.get('/', getLecturer)
router.post('/', saveLecturer)
router.delete('/', deleteLecturer)
router.put('/', updateLecturer)

export {router as initLecturerRoute} 