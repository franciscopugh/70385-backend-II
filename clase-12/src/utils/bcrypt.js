import 'dotenv/config'
import { hashSync, compareSync, genSaltSync } from "bcrypt";

//Encriptar una contraseña
export const createHash = (password) => hashSync(password, genSaltSync(parseInt(process.env.SALT)))

//Validar mi contraseña con la ingresada por el usuario
export const validatePassword = (passIngresada, passBDD) => compareSync(passIngresada, passBDD)

