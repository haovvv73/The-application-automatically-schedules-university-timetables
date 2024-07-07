import express from "express"
import { deleteRoom, getSubject, saveSubject, updateRoom } from "../controllers/subjectController"

let router = express.Router()

router.get('/', getSubject)
router.post('/', saveSubject)
router.delete('/', deleteRoom)
router.put('/', updateRoom)

export {router as initSubjectRoute} 