import { errorResponse } from "../helpers/httpResponse"
import httpStatusCode from "../helpers/httpStatusCode"
import { Subject } from "../models/subject"
import subjectService from "../services/subjectService"

// GET
const getSubject = async (req, res, next) => {
    const subjectID = req.params.id

    try {
        let data = []
        // get by ID
        if (subjectID) {
            data = subjectService.getSubjectById(subjectID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } else { //get all
            data = subjectService.getSubject()
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveSubject = async (req, res, next) => {
    const {subjectName,credit,description,subjectType,duration} = req.body
    if (!subjectName || !credit || !description || !subjectType || !duration) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newSubject = new Subject('',subjectName,credit,description,subjectType,duration)
        const result = subjectService.saveSubject(newSubject)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteSubject = async (req, res, next) => {
    const { id } = req.body
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const result = subjectService.deleteById(id)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// PUT
const updateSubject = async (req, res, next) => {
    const {subjectID,subjectName,credit,description,subjectType,duration} = req.body
    if (!subjectID || !subjectName || !credit || !description || !subjectType || !duration) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newSubject = new Subject(subjectID,subjectName,credit,description,subjectType,duration)
        const result = subjectService.updateSubject(newSubject)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { getSubject, saveSubject, deleteSubject, updateSubject }