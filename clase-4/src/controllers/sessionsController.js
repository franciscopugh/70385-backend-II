
export const login = async (req,res) => {
    try {
        if(!req.user) {
            return res.status(401).send("Usuario o contraseña no validos")
        }
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        } 
        res.status(200).redirect("/")
    }catch(e) {
        console.log(e); 
        res.status(500).send("Error al loguear usuario")
    }     
}

export const register = async (req,res) => {
    try {
        console.log(req.user);
        if(!req.user) { //Consulto si en la sesion se encuentra mi usuario
            return res.status(400).send("El mail ya se encuentra registrado")
        } 
        res.status(201).send("Usuario creado correctamente")
    }catch(e) {
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

export const githubLogin = (req,res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        } 
        res.status(200).redirect("/")
    }catch(e) {
        console.log(e); 
        res.status(500).send("Error al loguear usuario")
    }  
}