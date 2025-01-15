import userModel from "../models/user.js"

export const login = async (req,res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email: email})

    //Si user no existe me devuelve undefined
    
    if(user && (password == user.password)){ ////Contraseña ingresada es igual a la contraseña de mi usuario
            //Genero la sesion de mi usuario
            req.session.email = user.email
            req.session.rol = user.rol
            req.session.first_name = user.first_name
            req.session.last_name = user.last_name
            req.session.age = user.age
            return res.status(200).send("Usuario logueado correctamente")
    } else {
        return res.status(400).send("Usuario o contraseña incorrecta")
    }
    
}

export const register = async (req,res) => {
    const {first_name, last_name, email, password, age} = req.body
    try {
        let message = await userModel.create({first_name, last_name, email, password, age})
        console.log(message);
        //redirect = redirecciono a una ruta de mi aplicacion (un template en una ruta get)
        res.status(201).redirect('/api/sessions/viewlogin') //.send("Usuario registrado correctamente")
    }catch (e) {
        console.log(e);
        res.status(500).send("Error al registrar usuario")
    }
    
}

export const viewRegister = (req,res) => {
    res.status(200).render('templates/register', {})
}

export const viewLogin = (req,res) => {
    res.status(200).render('templates/login', {})
}