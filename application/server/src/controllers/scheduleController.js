import { errorResponse, successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from '../helpers/httpStatusCode.js';
import { scheduleGenerate } from "../libs/scheduleGenerateLib.js";

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
        const rawCourses =[
            { name: 'Pháp luật đại cương', duration: 6, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            { name: 'Anh văn 1', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            { name: 'Thể dục 1', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Thể dục asdadasd', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Triết học Mác, Lênin', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Giải tích 1A', duration: 3, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Vi tích phân 1A', duration: 1, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Đại số tuyến tính', duration: 2, location: 1, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Thực hành Đại số tuyến tính', duration: 2, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế 1', duration: 3, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
            // { name: 'Kinh tế 222', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
            // { name: 'Kinh tế 333333', duration: 4, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
            // { name: 'Kinh tế qwe', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
            // { name: 'Kinh tế zzzz', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
            // { name: 'Kinh tế xxx', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
            // { name: 'Kinh tế ccccc', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
            
        ]

        const schedule = scheduleGenerate(rawCourses)

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, schedule)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }    
}

export { createSchedule }