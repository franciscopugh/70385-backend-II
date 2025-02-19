import { hashSync, compareSync, genSaltSync } from "bcrypt";

//Encriptar una contraseña
export const createHash = (password) => hashSync(password, genSaltSync(4))

//Validar mi contraseña con la ingresada por el usuario
export const validatePassword = (passIngresada, passBDD) => compareSync(passIngresada, passBDD)

