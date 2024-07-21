import express from "express"
import { checkIsAdmin, checkIsUser, login, register } from "../controllers/authController.js"

let router = express.Router()

// login
router.post('/login', login)

// register
router.post('/register', register)

router.post('/checkAdmin', checkIsAdmin)

router.post('/checkUser', checkIsUser)

export {router as initAuthRoute} 