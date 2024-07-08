import express from "express"
import { deleteRoom, getRoom, saveRoom, updateRoom } from "../controllers/roomController.js"

let router = express.Router()

router.get('/', getRoom)
router.get('/:id', getRoom)
router.post('/', saveRoom)
router.delete('/:id', deleteRoom)
router.put('/', updateRoom)

export {router as initRoomRoute} 