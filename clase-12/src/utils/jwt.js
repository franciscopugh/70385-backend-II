import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    /*
        param1: Objeto a guardar (user en este caso)
        param2: clave privada
        param2: tiempo de vida del token
    */
    const token = jwt.sign({user}, process.env.SECRET_JWT, {expiresIn: '24h'} )
    return token
}