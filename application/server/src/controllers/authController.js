import { errorResponse, successResponse } from "../helpers/httpResponse.js";


const login = async (req,res,next)=>{
    
    const { email, password } = req.body;
    // validate
    if (!email || !password) return errorResponse(res, 'missing data', 400)

    try {
        // check user
        const result = email === 'asd'
        if(!result)return errorResponse(res, 'user does not exist', 401)

        // check password
        const user = {
            password: 123
        };
        const isMatch = (password === user.password) ? true : false
        if (!isMatch) return errorResponse(res, 'wrong password', 401)

        // in case right => create token
        const token = 'sdasda'

        // response with token
        return successResponse(res,"LOGIN SUCCESS",200,token)

    } catch (error) {
        // console.log(error);
        return errorResponse(res, 'SERVER ERROR !', 500) 
    }
}

const register = (req,res,next)=>{
    res.send('Hello register!')
}

export {login, register}