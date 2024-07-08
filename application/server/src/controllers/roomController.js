import { errorResponse, successResponse } from "../helpers/httpResponse.js"
import httpStatusCode from "../helpers/httpStatusCode.js"
import { Room } from "../models/room.js"
import roomService from "../services/roomService.js"

// GET
const getRoom = async (req, res, next) => {
    const roomID = req.params.id

    try {
        let data = []
        // get by ID
        if (roomID) {
            data = await roomService.getRoomById(roomID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } else { //get all
            data = await roomService.getRoom()
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveRoom = async (req, res, next) => {
    const { roomName, capacity ,roomType, location, description } = req.body
    if (!roomName || !capacity || !description) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRoom = new Room('', roomName, capacity ,roomType, location, description)
        const result = await roomService.saveRoom(newRoom)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log("?>>>",error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteRoom = async (req, res, next) => {
    const id = req.params.id
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)
        
    try {
        const result = await roomService.deleteById(id)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// PUT
const updateRoom = async (req, res, next) => {
    const { roomID, capacity, roomName, roomType, location, description } = req.body
    console.log(req.body);
    if (!roomID || !capacity || !roomName || !description) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRoom = new Room(roomID, roomName, capacity, roomType, location, description)
        const result = await roomService.updateRoom(newRoom)
        
        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {getRoom, saveRoom, deleteRoom, updateRoom}