import express from "express"
import { deleteNotification, getNotification, saveNotification } from "../controllers/notificationController.js"



let router = express.Router()

router.get('/:id', getNotification)
router.post('/', saveNotification)
router.delete('/:id', deleteNotification)

export {router as initNotificationRoute} 