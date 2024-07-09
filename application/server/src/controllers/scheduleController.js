import { errorResponse, successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from '../helpers/httpStatusCode.js';
import { scheduleGenerate } from "../libs/scheduleGenerateLib.js";
import { format, set} from 'date-fns'
import scheduleService from "../services/scheduleService.js";
import { Schedule } from "../models/schedule.js";

const getSchedules = async (req, res) => {
    const scheduleID = req.params.id

    try {
        let data = []
        // get by ID
        if (scheduleID) {
            data = await scheduleService.getScheduleById(scheduleID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } else { //get all
            data = await scheduleService.getSchedule()
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const deleteSchedule = async (req, res) => {
    const id = req.params.id
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const result = await scheduleService.deleteSchedule(id)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const updateSchedule = async (req, res) => {
    const { scheduleID, title, yearStart, yearEnd, semester } = req.body
    if (!scheduleID || !title || !yearStart || !yearEnd || !semester) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newSchedule = new Schedule(
            scheduleID,
            title,
            yearStart,
            yearEnd,
            semester
        )
        const result = await scheduleService.updateSchedule(newSchedule)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const createSchedule = async (req, res) => {

    try {
        const rawCourses = [
            { name: 'Pháp luật đại cương', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', teacher: 'lorem' },
        ]

        const rawTeacherSameCourse = [
            {
                name: 'Pháp luật đại cương', duration: 4, type: 'LT', room: '',
                timeStart: set(new Date(), { hours: 7, minutes: 30, seconds: 0, milliseconds: 0 }),
                timeEnd: set(new Date(), { hours: 8, minutes: 20, seconds: 0, milliseconds: 0 }),
                day: 'mon', teacher: 'lorem', location: 1,
            },
            {
                name: 'Pháp luật đại cương', duration: 4, location: 0, type: 'LT',
                timeStart: set(new Date(), { hours: 13, minutes: 30, seconds: 0, milliseconds: 0 }),
                timeEnd: set(new Date(), { hours: 14, minutes: 20, seconds: 0, milliseconds: 0 }),
                day: 'mon', room: '', teacher: 'lorem'
            },
        ]

        // save schedule 
        // generate course
        // save course
        // return schedule-detail

        const schedule = await scheduleGenerate(rawCourses, rawTeacherSameCourse)

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, schedule)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { createSchedule, getSchedules, deleteSchedule, updateSchedule }