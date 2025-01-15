import { Router } from "express";
import { login, register, viewLogin, viewRegister } from "../controllers/sessionsController.js";

const sessionRouter = Router()


sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewRegister)
sessionRouter.post('/login',  login)
sessionRouter.post('/register', register)

export default sessionRouter