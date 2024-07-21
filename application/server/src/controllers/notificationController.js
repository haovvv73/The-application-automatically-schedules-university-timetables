import { errorResponse, successResponse } from "../helpers/httpResponse.js"
import httpStatusCode from "../helpers/httpStatusCode.js"
import { Noti } from "../models/notification.js"
import notification from "../services/notificationService.js"


// GET
const getNotification = async (req, res, next) => {
    const lecturerID = req.params.id

    try {
        let data = []
        // get by ID
        if (lecturerID) {
            data = await notification.getNotification(lecturerID)
            // if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } 
        
        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveNotification = async (req, res, next) => {
    const {lectureID, title, notiType, description, sender, time, date} = req.body
    if (!lectureID || !title || !notiType || !description || !sender || !date) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newNoti = new Noti('', lectureID, title, notiType, description, sender, time, date)
        const result = await notification.saveNotification(newNoti)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log("?>>>",error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteNotification= async (req, res, next) => {
    const id = req.params.id
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)
        
    try {
        const result = await notification.deleteById(id)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {getNotification, saveNotification, deleteNotification}