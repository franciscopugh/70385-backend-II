import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PORT = 8080

app.use(express.json())

app.use(cookieParser("CoderSecret")) //Si agrego contraseña "firmo" las cookies
app.use(session({
    secret: 'SessionSecret',
    resave: true,
    saveUninitialized: true
}))

const auth = (req,res,next) => {
    if(req.session?.email == "f@f.com") {
        return next() //Continuo con la ejecucion normal
    } else {
        return res.status(401).send("Eror al autenticar usuario") //401 error de autenticacion
    }
}


//Creacion de una cookie
app.get('/setCookie', (req,res) => {
    //Devuelvo como resultado una cookie
    res.status(200).cookie('coderCookie', "Esta es mi primera cookie", {maxAge: 100000}).send("Cookie creada")
})

//Crear una cookie si firmada
app.get('/setSignedCookie', (req,res) => {
    //Devuelvo como resultado una cookie
    res.status(200).cookie('coderCookieSigned', "Esta es mi primera cookie firmada", {maxAge: 1000000, signed: true}).send("Cookie creada")
})

//Consultar una cookie
app.get('/getCookie', (req,res) => {
    res.status(200).send(req.cookies)//Devuelvo todas las cookies presentes en mi navegador
})

//Consultar una cookie solamente con firma
app.get('/getCookieSigned', (req,res) => {
    res.status(200).send(req.signedCookies)//Devuelvo todas las cookies presentes en mi navegador que presenten firma
})

//Eliminar una cookie
app.get('/deleteCookie', (req,res) => {
    res.status(200).clearCookie("coderCookie").send("Cookie eliminada")
})

//Creo una sesion
app.get('/session', (req,res) => {
    if(req.session.counter) {
        req.session.counter++
        res.status(200).send(`Ingresaste un total de ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.status(200).send("Bienvenido/a!")
    }
})

//Eliminar una sesion
app.get('/logout', (req,res) => {
    req.session.destroy((e) => {
        if(e) {
            res.status(500).send(e)
        } else {
            res.status(200).send("Logout")
        }
    })
})

app.get('/login', (req,res) => {
    const {email, password} = req.body

    if((email == "f@f.com" && password == "1234") || (email == "pepe@pepe.com" && password == "1234")) {
        req.session.email = email
        req.session.admin = true
        res.status(200).send("Usuario logueado")
    } else {
        res.status(400).send("Credenciales no validas")
    }
})

app.get('/private', auth ,(req,res) => {
    res.status(200).send("Contenido de f@f.com")
})
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})