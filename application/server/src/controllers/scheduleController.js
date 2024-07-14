import { errorResponse, successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from '../helpers/httpStatusCode.js';
import { roomGenerate, scheduleGenerate } from "../libs/scheduleGenerateLib.js";
import { format, parseISO, set } from 'date-fns'
import scheduleService from "../services/scheduleService.js";
import { Schedule } from "../models/schedule.js";
import { Course } from "../models/course.js";
import courseService from "../services/courseService.js";
import subjectService from "../services/subjectService.js";
import roomService from "../services/roomService.js";

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

    const { course, schedule, room } = await req.body
    if (!course | !schedule | !room) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    // course | schedule 
    // className: 'Pháp luật đại cương', cohort , duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', LecturerID: [1,2]
    try {
        // save schedule
        // const result = await scheduleService.saveSchedule(schedule)

        // prepareCourse
        const listLecturerID = []
        const modelCourses = []
        for (let cou of course) {
            const { lecturerID } = cou
            if (lecturerID) listLecturerID.push(...lecturerID)
            let subjectFind = await subjectService.getSubjectById(cou.subjectID)
            modelCourses.push(
                new Course(
                    '', // courseID
                    cou.className,
                    cou.coHort,
                    cou.classSize,
                    '', //time start
                    '', //time end
                    '', // day
                    cou.type,
                    cou.location,
                    cou.lecturerID,
                    cou.subjectID,
                    '', //roomID
                    '',
                    subjectFind[0].duration
                )
            )
        }

        // get course same teacher
        const rawTeacherSameCourse = await courseService.getCourseByTeacher(listLecturerID)
        const modelTeacherCourse = []
        for (let cou of rawTeacherSameCourse) {
            modelTeacherCourse.push(
                new Course(
                    cou.courseID,
                    cou.className,
                    cou.cohort,
                    cou.classSize,
                    parseISO(cou.timeStart),
                    parseISO(cou.timeEnd),
                    cou.day,
                    cou.type,
                    cou.location,
                    cou.lecturerID,
                    cou.subjectID,
                    cou.roomID,
                    cou.scheduleID
                )
            )
        }

        // get room used
        const rID = room.map(r => r.roomID)
        const rawRoomUsed = await courseService.getCourseByRoom(rID)
        const roomUsed = []
        for (let cou of rawRoomUsed) {
            roomUsed.push(
                new Course(
                    cou.courseID,
                    cou.className,
                    cou.cohort,
                    cou.classSize,
                    parseISO(cou.timeStart),
                    parseISO(cou.timeEnd),
                    cou.day,
                    cou.type,
                    cou.location,
                    cou.lecturerID,
                    cou.subjectID,
                    cou.roomID,
                    cou.scheduleID
                )
            )
        }

        const modelRoom = []
        for (let r of rID) {
            let item = await roomService.getRoomById(r)
            if (item.length > 0) {
                modelRoom.push(item[0])
            }
        }

        const [scheduleResult, courseMissing] = scheduleGenerate(modelCourses, modelTeacherCourse)
        const [scheduleClone, courseMissingRoom, message] = roomGenerate(modelRoom, roomUsed, scheduleResult)

        const objJson = {
            scheduleGenerate: scheduleClone,
            courseMissing,
            courseMissingRoom,
            roomMessage: message
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, objJson)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const continueSchedule = async (req, res) => {
    const { course, schedule } = await req.body
    if (!course | !schedule) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        // save schedule
        const result = await scheduleService.saveSchedule(schedule)

        const modelCourses = []
        for (let cou of course) {
            modelCourses.push(
                new Course(
                    '', // courseID
                    cou.className,
                    cou.cohort,
                    cou.classSize,
                    cou.timeStart, //time start
                    cou.timeEnd, //time end
                    cou.day, // day
                    cou.type,
                    cou.location,
                    cou.lecturerID,
                    cou.subjectID,
                    cou.roomID, //roomID
                    result[1], // scheduleID
                    cou.duration
                )
            )
        }

        // save course
        await courseService.saveCourses(modelCourses)
        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { createSchedule, getSchedules, deleteSchedule, updateSchedule, continueSchedule }