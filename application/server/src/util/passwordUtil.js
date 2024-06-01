import bcrypt from "bcrypt"

const hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password_1,password_2)=>{
    return await bcrypt.compare(password_1,password_2)
}

export {hashPassword,comparePassword}