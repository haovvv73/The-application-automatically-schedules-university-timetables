import { errorResponse } from "../helpers/httpResponse"
import httpStatusCode from "../helpers/httpStatusCode"
import { Room } from "../models/room"
import roomService from "../services/roomService"

// GET
const getRoom = async (req, res, next) => {
    const roomID = req.params.id

    try {
        let data = []
        // get by ID
        if (roomID) {
            data = roomService.getRoomById(roomID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } else { //get all
            data = roomService.getRoom()
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveRoom = async (req, res, next) => {
    const { roomName, roomType, location, description } = req.body
    if (!roomName || !roomType || !location || !description) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRoom = new Room('', roomName, roomType, location, description)
        const result = roomService.saveRoom(newRoom)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteRoom = async (req, res, next) => {
    const { id } = req.body
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const result = roomService.deleteById(id)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// PUT
const updateRoom = async (req, res, next) => {
    const { roomID, roomName, roomType, location, description } = req.body
    if (!roomID || !roomName || !roomType || !location || !description) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRoom = new Room(roomID, roomName, roomType, location, description)
        const result = roomService.updateRoom(newRoom)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {getRoom, saveRoom, deleteRoom, updateRoom}