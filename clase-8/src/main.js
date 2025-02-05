/*import { Command } from "commander";
const program = new Command();
import config from "./config.js";
console.log(config);

program
    .option('-d', "Var de debug", false)
    .option('-p <port>', "Puerto de mi app", 8080)
    .option('--mode <mode>', "Entorno de ejecucion", "development")
    .requiredOption('-u <user>', "Usuario que va a ejecutar las tareas", "No se ingreso ningun usuario")
    .option('-l, --letters [letters...]', "Letras de prueba para mi app")
program.parse()

console.log(program.opts());
console.log(program.args);
*/

import express from 'express'
import {fork} from 'child_process'

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Hola!")
})
app.get('/suma', function (req,res)  {
   const child = fork('./src/operacionCompleja.js') //En esta ruta defino el archivo donde va a trabajar el proceso hijo
   child.send("Ponete a laburar vago") //Envio un mensaje para que se ejecute la funcion
   console.log(process.pid);
   
   child.on("message", resultado => { //Cuando la funcion termina, recibo los resultados y los muestro
    console.log("Ejecutate", resultado)
    res.send(`El resultado es: ${resultado}`)
   })

    
})

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})