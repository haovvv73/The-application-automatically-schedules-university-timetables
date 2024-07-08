import { errorResponse, successResponse } from "../helpers/httpResponse.js"
import httpStatusCode from "../helpers/httpStatusCode.js"
import { Course } from "../models/course.js"
import courseService from "../services/courseService.js"

const getCourse = () => {
    const scheduleID = req.params.id
    if (!scheduleID) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)
    try {
        let data = []
        // get by ID
        if (scheduleID) {
            data = courseService.getCourses(scheduleID)
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const getDetailCourse = () => {
    const courseID = req.params.id
    if (!courseID) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)
    try {
        let data = []
        // get by ID
        if (courseID) {
            data = courseService.getCourseById(courseID)
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const deleteCourse = () => {
    const courseID = req.params.id
    if (!courseID) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const result = courseService.deleteCourseById(courseID)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const saveCourse = () => {
    const course = req.body.course

    try {
        if (course && course.length > 0) {
            const data = []
            for (let i = 0; i < course.length; ++i) {
                // validate
                const { className, cohort, classSize, timeStart, timeEnd, day, location, lecturerID, subjectID, roomID, scheduleID } = course[i]
                if (!className || !cohort || !classSize || !timeStart || !timeEnd || !day || !lecturerID || !subjectID || !roomID || !scheduleID) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

                data.push(
                    new Course(
                        '', className, cohort, classSize, timeStart, timeEnd, day, lecturerID, subjectID, roomID, scheduleID
                    )
                )

            }

            const result = courseService.saveCourses(data)

            if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
            return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
        } else {
            return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)
        }

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const updateCourse = () => {
    const { courseID, className, cohort, classSize, timeStart, timeEnd, day, location, lecturerID, subjectID, roomID, scheduleID } = req.body
    if (!courseID || !className || !cohort || !classSize || !timeStart || !timeEnd || !day || !lecturerID || !subjectID || !roomID || !scheduleID) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newCourse = new Course(
            courseID, className, cohort, classSize, timeStart, timeEnd, day, location, lecturerID, subjectID, roomID, scheduleID
        )
        const result = courseService.updateCourse(newCourse)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {
    getCourse,
    getDetailCourse,
    deleteCourse,
    saveCourse,
    updateCourse,
}