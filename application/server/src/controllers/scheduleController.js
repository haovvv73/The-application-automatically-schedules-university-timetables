import { errorResponse, successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from '../helpers/httpStatusCode.js';
import { scheduleGenerate } from "../libs/scheduleGenerateLib.js";
import { format, set} from 'date-fns'

const getSchedules = (req, res) => {

}

const deleteSchedule = (req, res) => {

}

const getScheduleDetail = (req, res) => {

}

const updateSchedule = (req, res) => {

}

const createSchedule = (req, res) => {

    try {
        const rawCourses = [
            { name: 'Pháp luật đại cương', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', teacher: 'lorem' },
            // { name: 'Anh văn 1', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', teacher: 'lorem2' },
            // { name: 'Anh văn 1', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', },
            // { name: 'Đại số tuyến tính', duration: 2, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế 1', duration: 1, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Anh văn 12', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', },
            // { name: 'Thể dục 1', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Thể dục asdadasd', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Triết học Mác, Lênin', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Giải tích 1A', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Vi tích phân 1A', duration: 1, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Thực hành Đại số tuyến tính', duration: 2, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế 222', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế 333333', duration: 4, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế qwe', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế zzzz', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế xxx', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế ccccc', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },

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

        const schedule = scheduleGenerate(rawCourses, rawTeacherSameCourse)

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, schedule)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { createSchedule }