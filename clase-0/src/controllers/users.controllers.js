import userModel from "../models/userModel.js";

//Consultar todos los usuarios
export const getUsers = async (req,res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch(e) {
        console.log(e);
        res.status(500).send(e)
    }
}

//Consultar un usuario dado su ID
export const getUser = async (req,res) => {
    try {
        const idUser = req.params.uid
        const user = await userModel.findById(idUser)
        if(user)
            res.status(200).send(user)
        else 
            res.status(404).send("Usuario no encontrado")
    } catch(e) {
        console.log(e);
        res.status(500).send(e)
    }
}

//Crear un usuario con nombre, email y edad pedidos via el req.body
export const createUser = async (req,res) => {
    try {
        const {name, email, age} = req.body
        const message = await userModel.create({name, email, age})
        res.status(201).send(message) //200 es OK, 201 es Created
    } catch(e) {
        console.log(e);
        res.status(500).send(e)
    }
}

//Actualizar un usuario dado su ID
export const updateUser = async (req,res) => {
    try {
        const idUser = req.params.uid
        const {name, email, age} = req.body
        const message = await userModel.findByIdAndUpdate(idUser, {name, email, age})
        if(message)
            res.status(200).send("Usuario actualizado")
        else 
            res.status(404).send("Usuario no encontrado")
    }catch(e){
        console.log(e);
        res.status(500).send(e)
    }
}

//Eliminar un usuario dado su ID
export const deleteUser = async (req,res) => {
    try {
        const idUser = req.params.uid
        const message = await userModel.findByIdAndDelete(idUser)
        if(message)
            res.status(200).send("Usuario eliminado")
        else 
            res.status(404).send("Usuario no encontrado")
    }catch(e){
        console.log(e);
        res.status(500).send(e)
    }
}