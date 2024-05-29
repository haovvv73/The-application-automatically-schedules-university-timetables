import express from "express"
import { login, register } from "../controllers/authController.js"

let router = express.Router()

// login
router.post('/login', login)

// register
router.post('/register', register)

export {router as initAuthRoute} 