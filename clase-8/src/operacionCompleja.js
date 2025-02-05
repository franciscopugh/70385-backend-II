process.on('message', (mensaje) => {
    console.log(process.pid);
    
    let result = 0

    for(let i = 0; i<5e9; i++) {
        result += i
    }

    process.send(result) //Envio al proceso principal el resultado de la operacion
}) 
    