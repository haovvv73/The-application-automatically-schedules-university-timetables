import jwt from "jsonwebtoken"

const createToken = (payload) => {
    return jwt.sign({ ...payload }, process.env.SECRET_KEY, {
        expiresIn: '8h'
    })
}

const decodeToken = (encodeToken) => {
    try {
        const decoded = jwt.verify(encodeToken, process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
  
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
}

export { createToken, decodeToken, isTokenExpired }