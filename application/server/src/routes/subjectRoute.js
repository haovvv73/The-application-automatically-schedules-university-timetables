import express from "express"
import { deleteSubject, getSubject, saveSubject, updateSubject } from "../controllers/subjectController.js"

let router = express.Router()

router.get('/', getSubject)
router.get('/:id', getSubject)
router.post('/', saveSubject)
router.delete('/:id', deleteSubject)
router.put('/', updateSubject)

export {router as initSubjectRoute} 