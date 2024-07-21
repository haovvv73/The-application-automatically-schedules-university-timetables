import express from "express"
import { deleteRequest, getRequest, getRequestedSchedule, getRequestSchedule, saveRequest, updateRequest } from "../controllers/requestController.js"


let router = express.Router()

router.get('/:id', getRequest) 
router.get('/scheduleRequest/:id', getRequestSchedule)
router.get('/scheduleRequested/:id', getRequestedSchedule)
router.post('/', saveRequest)
router.delete('/:id', deleteRequest)
router.put('/', updateRequest)

export {router as initRequestRoute} 