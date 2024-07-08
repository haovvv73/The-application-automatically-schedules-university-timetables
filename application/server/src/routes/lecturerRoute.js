import express from "express"
import { deleteRoom, getRoom, saveRoom, updateRoom } from "../controllers/roomController.js"
import { deleteLecturer, getLecturer, saveLecturer, updateLecturer } from "../controllers/lecturerController.js"

let router = express.Router()

router.get('/', getLecturer)
router.get('/:id', getLecturer)
router.post('/', saveLecturer)
router.delete('/:id', deleteLecturer)
router.put('/', updateLecturer)

export {router as initLecturerRoute} 