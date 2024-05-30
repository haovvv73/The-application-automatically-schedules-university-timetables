import { errorResponse, successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from "../helpers/httpStatusCode.js";
import lecturerService from "../services/lecturerService.js";


const login = async (req, res, next) => {

    const { email, password } = req.body;
    // validate
    if (!email || !password) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        let hao = await lecturerService.getUsers()
        console.log(hao);

        // check user
        const result = email === 'asd'
        if (!result) return errorResponse(res, 'User Does Not Exist', httpStatusCode.Unauthorized.code)

        // check password
        const user = {
            password: 123
        };
        const isMatch = (password === user.password) ? true : false
        if (!isMatch) return errorResponse(res, 'Wrong Password', httpStatusCode.Unauthorized.code)

        // in case right => create token
        const token = 'sdasda'

        // response with token
        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, token)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

const register = async (req, res, next) => {
    const { email, name, phone, password, gender, faculty, birthday, address } = req.body;
    // validate
    if (!email || !password || !name || !phone || !!gender || !faculty || !birthday || !address) return errorResponse(res, httpStatusCode.BadRequest.message, httpStatusCode.BadRequest.code)

    try {
        const user = {
            email, name, phone, password, gender, faculty, birthday, address
        }

        // check user is exist ?
        const isUserExist = false
        if(isUserExist) return errorResponse(res, httpStatusCode.Conflict.message, httpStatusCode.Conflict.code)

        // save user
        const result = user
        // invalid data
        if (result === 0) return errorResponse(res, httpStatusCode.NotImplemented.message, httpStatusCode.NotImplemented.code)

        // pass => return token
        const token = 'dasdas';
        return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, token)

    } catch (error) {
        return errorResponse(res, httpStatusCode.InternalServerError.message, httpStatusCode.InternalServerError.code)
    }
}

export { login, register }