import { errorResponse } from "../helpers/httpResponse"
import httpStatusCode from "../helpers/httpStatusCode"
import { Lecturer } from "../models/lecturer"
import { Room } from "../models/room"
import lecturerService from "../services/lecturerService"
import { hashPassword } from "../util/passwordUtil"

// GET
const getLecturer = async (req, res, next) => {
    const LecturerID = req.params.id

    try {
        let data = []
        // get by ID
        if (LecturerID) {
            data = lecturerService.getUserById(LecturerID)
            if (data.length < 1) return errorResponse(res, httpStatusCode.NotFound.message, httpStatusCode.NotFound.code)
        } else { //get all
            data = lecturerService.getUsers()
        }

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, data)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// POST
const saveLecturer = async (req, res, next) => {
    const { email, lecturerName, phone, password, gender, faculty, birthday, address } = req.body;
    if (!email || !password || !lecturerName || !phone || !gender || !faculty || !birthday || !address) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const hashPass = await hashPassword(password)
        const newLecturer = new Lecturer(
            '','',email, lecturerName, phone, hashPass, gender, faculty, birthday, address
        )
        const result = lecturerService.saveUser(newLecturer)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }

}

// DELETE
const deleteLecturer = async (req, res, next) => {
    const { id } = req.body
    if (!id) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const result = lecturerService.deleteUserById(id)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

// PUT
const updateLecturer = async (req, res, next) => {
    const { lecturerID, accountID ,email, lecturerName, phone, gender, faculty, birthday, address } = req.body;
    if (!lecturerID|| !accountID || !email || !lecturerName || !phone || !gender || !faculty || !birthday || !address) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const newLecturer = new Lecturer(
            lecturerID, accountID,email, lecturerName, phone, '', gender, faculty, birthday, address
        )
        const result = lecturerService.updateUser(newLecturer)

        if (result) successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code)
        return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)
    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export {getLecturer, saveLecturer, deleteLecturer, updateLecturer}