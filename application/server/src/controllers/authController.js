import { errorResponse, successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from "../helpers/httpStatusCode.js";
import { Lecturer } from "../models/lecturer.js";
import lecturerService from "../services/lecturerService.js";
import { comparePassword, hashPassword } from "../util/passwordUtil.js";
import { createToken } from "../util/tokenUtil.js";


const login = async (req, res, next) => {

    const { email, password } = req.body;
    // validate
    if (!email || !password) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        // check user
        const result = await lecturerService.getUserByEmail(email)
        if (result.length < 1) return errorResponse(res, 'User Does Not Exist', httpStatusCode.Unauthorized.code)

        // check password
        const user = result[0]
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) return errorResponse(res, 'Wrong Password', httpStatusCode.Unauthorized.code)

        // in case right => create token
        const token = createToken(user)

        // response with token
        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, token)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const register = async (req, res, next) => {
    const { email, lecturerName, phone, password, gender, faculty, birthday, address } = req.body;
    // validate
    if (!email || !password || !lecturerName || !phone || !gender || !faculty || !birthday || !address) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        // check user is exist ?
        const isUserExist = (await lecturerService.getUserByEmail(email)).length > 0
        if (isUserExist) return errorResponse(res, "User Is Exist", httpStatusCode.Conflict.code)

        // create new user 
        // hash password
        const hashPass = await hashPassword(password)
        const newUser = new Lecturer(
            '',email, lecturerName, phone, hashPass, gender, faculty, birthday, address
        )

        // save user in db
        const result = await lecturerService.saveUser(newUser)
        // invalid data
        if (result == 0) return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)

        // pass => return token
        const token = createToken(newUser)

        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, token)

    } catch (error) {
        console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { login, register }