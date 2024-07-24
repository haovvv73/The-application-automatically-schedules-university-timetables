import { parseISO, set } from "date-fns"
import { errorResponse, successResponse } from "../helpers/httpResponse.js"
import httpStatusCode from "../helpers/httpStatusCode.js"
import { Noti } from "../models/notification.js"
import { Request } from "../models/request.js"
import courseService from "../services/courseService.js"
import notification from "../services/notificationService.js"
import requestService from "../services/requestService.js"
import { isOverlap } from "../libs/scheduleGenerateLib.js"
import lecturerService from "../services/lecturerService.js"


// GET
const getRequest = async (req, res, next) => {
    const lecturerID = req.params.id

    try {
        let data = []
        // get by ID
        if (lecturerID) {
            data = await requestService.getRequest(lecturerID)
            // if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
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
    const {lecturerID,scheduleID,courseID, title, content, status, time, time2, reason, date, sender} = req.body

    if (!scheduleID || !courseID || !lecturerID || !title || !content || !status || !time || !time2 || !reason || !date) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRequest = new Request('', lecturerID, title, content, status, time, time2, reason, date)
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
            const noti = new Noti('', 1, title, 'message', content, sender, dateTime[1], dateTime[0])
            await notification.saveNotification(noti)

            //  send noti
            const userSocketId = req.getAdminSocketId('1');
            console.log('send to admin');
            console.log(userSocketId);
            if (userSocketId) {
                console.log('send to admin >>>> go');
                req.io.to(userSocketId).emit(
                    'notificationAdmin', noti
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
    // lecturerID : admin ID
    const { status, timeSelect, requestID, scheduleID, lecturerID} = req.body
    
    if (!status || !timeSelect || !requestID ) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newRequest = new Request(requestID, '', '', '', status, '', '', '', '', timeSelect)
        // console.log(newRequest);
        // console.log(req.body);

        // validate >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        const requestResult = await requestService.getRequestDetailById(requestID)
        // console.log('request >>',requestResult);
        const timeSelectStr = timeSelect == 1 ? requestResult[0].time : requestResult[0].time2
        const dayTime = timeSelectStr.split('_')
        const arrTimeStart = dayTime[1].split('-')[0].split(':')
        const arrTimeEnd = dayTime[1].split('-')[1].split(':')
        
        const cou = {
            day :  dayTime[0],
            timeStart : set(new Date(), {
                hours: parseInt(arrTimeStart[0]),
                minutes: parseInt(arrTimeStart[1]),
                seconds: 0,
                milliseconds: 0
            }),
            timeEnd : set(new Date(), {
                hours: parseInt(arrTimeEnd[0]),
                minutes: parseInt(arrTimeEnd[1]),
                seconds: 0,
                milliseconds: 0
            }),
        }
        const courseInSchedule = await courseService.getCourses(scheduleID)
        let check = true
        for(let cou2 of courseInSchedule){
            cou2.timeStart = parseISO(cou2.timeStart)
            cou2.timeEnd = parseISO(cou2.timeEnd)
            if( cou2.day == cou.day && isOverlap(cou,cou2)){
                check = false;
                break;
            }
        }
        
        if(status == 'success'){
            if(!check) return errorResponse(res, `Conflict with Course on ${cou.day} in schedule`, 200)
        }

        // update course >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // console.log('request : ',requestResult);
        let courseResult = await courseService.getCourseById(requestResult[0].courseID)
        courseResult = courseResult[0]
        // console.log('course : ',courseResult);
        // time start
        courseResult.timeStart = set(new Date(), {
            hours: cou.timeStart.getHours(),
            minutes: cou.timeStart.getMinutes(),
            seconds: 0,
            milliseconds: 0
        })
        // time end
        courseResult.timeEnd = set(new Date(), {
            hours: cou.timeEnd.getHours(),
            minutes: cou.timeEnd.getMinutes(),
            seconds: 0,
            milliseconds: 0
        })
        // day
        courseResult.day = cou.day

        // console.log('start = ', format(courseResult.timeStart, 'HH:mm'));
        // console.log('end = ', format(courseResult.timeEnd, 'HH:mm'));
        if(status == 'success'){
            await courseService.updateCourse(courseResult)
        }

        // update request >>>>>>>>>>>>>>>>>>>>>>>>>>
        const result = await requestService.updateRequest(newRequest)

        // noti
        const listLecturerID = []
        for(let item of courseInSchedule){
            const { lecturerID } = item
            if (lecturerID) listLecturerID.push(...lecturerID)
        }

        // save noti to user request
        const message = status == 'success' ? 'Your request success' : "Your request is rejected"
        const description = status == 'success' ? 'Your request has update please check it !' : "Your reason is not approval !"

        const event = new Date();
        const dateTime = event.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' }).split(', ');
        // save DB 
        const noti = new Noti('', requestResult[0].lecturerID, message, status, description, 'HCMUS ADMIN', dateTime[1], dateTime[0])
        await notification.saveNotification(noti)

        // send noti
        for(let lecID of listLecturerID){
            // send noti user online 
            const userSocketId = req.getUserSocketId(lecID);
            // console.log('omg2 >', userDB);
            // console.log('omg2 >>', userSocketId);
            if (userSocketId) {
                console.log('send to user >>>>>>');
                req.io.to(userSocketId).emit(
                    'notification', noti
                );
            }
        }

        if(result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {getRequest, saveRequest, deleteRequest, updateRequest, getRequestSchedule, getRequestedSchedule}