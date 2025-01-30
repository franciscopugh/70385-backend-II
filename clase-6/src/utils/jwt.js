import jwt from 'jsonwebtoken'

let secretKey = "codercoder"

export const generateToken = (user) => {
    /*
        param1: Objeto a guardar (user en este caso)
        param2: clave privada
        param2: tiempo de vida del token
    */
    const token = jwt.sign({user}, secretKey, {expiresIn: '24h'} )
    return token
}