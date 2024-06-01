import jwt from "jsonwebtoken"

const createToken = (payload)=>{
    return jwt.sign({...payload}, process.env.SECRET_KEY, {
        expiresIn: '1h'
    })
}

const decodeToken = (encodeToken)=>{

}

const isTokenExpired = (token)=>{

}

export {createToken,decodeToken,isTokenExpired}