import { errorResponse, successResponse } from "../helpers/httpResponse.js"
import httpStatusCode from "../helpers/httpStatusCode.js"
import { Subject } from "../models/subject.js"
import subjectService from "../services/subjectService.js"

// GET
const getSubject = async (req, res, next) => {
    const subjectID = req.params.id

    try {
        let data = []
        // get by ID
        if (subjectID) {
            data = await subjectService.getSubjectById(subjectID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } else { //get all
            data = await subjectService.getSubject()
        }
        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveSubject = async (req, res, next) => {
    const {subjectName,credit,description,duration} = req.body
    if (!subjectName || !credit || !description || !duration) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newSubject = new Subject('',subjectName,credit,description,duration)
        const result = await subjectService.saveSubject(newSubject)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteSubject = async (req, res, next) => {
    const id = req.params.id
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const result = await subjectService.deleteById(id)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// PUT
const updateSubject = async (req, res, next) => {
    const {subjectID,subjectName,credit,description,duration} = req.body
    if (!subjectID || !subjectName || !credit || !description || !duration) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newSubject = new Subject(subjectID,subjectName,credit,description,duration)
        const result = await subjectService.updateSubject(newSubject)

        if (result) return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { getSubject, saveSubject, deleteSubject, updateSubject }