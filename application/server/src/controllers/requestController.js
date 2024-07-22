import { errorResponse, successResponse } from "../helpers/httpResponse.js"
import httpStatusCode from "../helpers/httpStatusCode.js"
import { Noti } from "../models/notification.js"
import { Request } from "../models/request.js"
import courseService from "../services/courseService.js"
import notification from "../services/notificationService.js"
import requestService from "../services/requestService.js"


// GET
const getRequest = async (req, res, next) => {
    const lecturerID = req.params.id

    try {
        let data = []
        // get by ID
        if (lecturerID) {
            data = await requestService.getRequest(lecturerID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } 

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const getRequestSchedule = async (req, res, next) => {
    const scheduleID = req.params.id

    try {
        let data = []
        // get by ID
        if (scheduleID) {
            data = await requestService.getRequestSchedule(scheduleID)
            // if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } 

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const getRequestedSchedule = async (req, res, next) => {
    const scheduleID = req.params.id

    try {
        let data = []
        // get by ID
        if (scheduleID) {
            data = await requestService.getRequestedSchedule(scheduleID)
            // if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } 

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveRequest = async (req, res, next) => {
    const {lectureID,scheduleID,courseID, title, content, status, time, time2, reason, date, sender} = req.body
    if (!scheduleID || !courseID || !lectureID || !title || !content || !status || !time || !time2 || !reason || !date) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRequest = new Request('', lectureID, title, content, status, time, time2, reason, date)
        const new2Request = {
            scheduleID,
            courseID,
            ...newRequest
        }

        const result = await requestService.saveRequest(new2Request)

        if (result) {
            const event = new Date();
            const dateTime = event.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' }).split(', ');

            // save DB 
            const noti = new Noti('', lectureID, title, 'message', content, sender, dateTime[1], dateTime[0])
            await notification.saveNotification(noti)

            //  send noti
            const userSocketId = req.getAdminSocketId('6');
            if (userSocketId) {
                req.io.to(userSocketId).emit(
                    'notification-admin', noti
                );
            }

            return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        }
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log("?>>>",error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteRequest = async (req, res, next) => {
    const id = req.params.id
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)
        
    try {
        const result = await requestService.deleteById(id)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// PUT
const updateRequest = async (req, res, next) => {
    const { status, timeSelect, requestID} = req.body
    
    if (!status || !timeSelect || !requestID ) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRequest = new Request(requestID, '', '', '', status, '', '', '', '', timeSelect)
        console.log(newRequest);
        const result = await requestService.updateRequest(newRequest)

        // validate

        // update course
        const requestResult = await requestService.getRequestDetailById(requestID)
        const courseResult = await courseService.getCourseById(requestResult[0].courseID)

        // sen noti
        
        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {getRequest, saveRequest, deleteRequest, updateRequest, getRequestSchedule, getRequestedSchedule}