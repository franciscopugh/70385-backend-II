import jwt from 'jsonwebtoken'

let secretKey = "codercoder"

const generateToken = (user) => {
    /*
        param1: Objeto a guardar (user en este caso)
        param2: clave privada
        param2: tiempo de vida del token
    */
    const token = jwt.sign({user}, secretKey, {expiresIn: '24h'} )
    return token
}

console.log(
 generateToken({
            first_name: "Camila",
            last_name: "Casares",
            email: "camil@cami.com",
            age: 38,
            rol:"Usuario"
}))