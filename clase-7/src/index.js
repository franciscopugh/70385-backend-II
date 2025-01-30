import express from 'express'
import path from 'path'
import { __dirname } from './path.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import {create} from 'express-handlebars'
import passport from 'passport'
import initalizatePassport from './config/passport.config.js'
import MongoStore from 'connect-mongo'
import sessionRouter from './routes/sessions.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const PORT = 5000
const hbs = create()
app.use(cors())
//const fileStorage = new FileStore(session)
app.use(express.json())
app.use(cookieParser()) //Si agrego contraseña "firmo" las cookies
app.use(session({
    //ttl Time to Live tiempo de vida (segundos)
    //retries: Cantidad de veces que el servidor va a intentar leer ese archivo
    //store: new fileStorage({path: './src/sessions', ttl: 10, retries: 1 }),
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://franciscopugh01:9@cluster0.w0js7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        mongoOptions: {},
        ttl: 15
    }),
    secret: 'SessionSecret',
    resave: true,
    saveUninitialized: true
}))

mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.w0js7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))
.catch((e) => console.log("Error al conectarme a DB:", e))

initalizatePassport()
app.use(passport.initialize())
app.use(passport.session())
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views')) //Concateno evitando erroes de / o \

//Rutas
app.use('/public', express.static(__dirname + '/public')) //Concateno rutas
app.use('/api/sessions', sessionRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.get('/', (req,res) => {
    res.status(200).send("Hola desde Inicio")
})
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})