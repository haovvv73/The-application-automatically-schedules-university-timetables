import express from "express"
import { deleteRoom, getRoom, saveRoom, updateRoom } from "../controllers/roomController.js"

let router = express.Router()

router.get('/', getRoom)
router.post('/', saveRoom)
router.delete('/', deleteRoom)
router.put('/', updateRoom)

export {router as initRoomRoute} 