import { Router } from "express";
import passport from "passport";
import { login, register, viewLogin, viewRegister } from "../controllers/sessionsController.js";

const sessionRouter = Router()


sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewRegister)
sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register)

export default sessionRouter