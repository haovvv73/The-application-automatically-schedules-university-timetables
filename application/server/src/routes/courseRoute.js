import express from "express"
import { deleteCourse, getCourse, getCourseAndRoom, getDetailCourse, saveCourse, updateCourse } from "../controllers/courseController.js"

let router = express.Router()


router.post('/', saveCourse)
router.delete('/:id', deleteCourse)
router.put('/', updateCourse)
router.get('/:id', getCourse)
router.get('/detail/:id', getDetailCourse)
router.get('/courseAndRoom/:id', getCourseAndRoom)

export {router as initCourseRoute} 