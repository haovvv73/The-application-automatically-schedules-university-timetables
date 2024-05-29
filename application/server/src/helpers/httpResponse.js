
const successResponse = (res,message, statusCode,data)=>{
    const objResponse = {
        status : true,
        message,
    }

    // checking data
    if(data){ objResponse.data = data }

    return res.status(statusCode).json(objResponse)
}

const errorResponse = (res,error,statusCode)=>{
    const objResponse = {
        status : false,
        error
    }

    return res.status(statusCode).json(objResponse)
}

export {successResponse, errorResponse}