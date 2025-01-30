import cartModel from '../models/cart.js'

export const getCart = async (req,res) => {
    try {
        const cartId = req.params.cartId
        const cart = await cartModel.findOne({_id: cartId})
        if(cart)
            res.status(200).send(cart)
        else
            res.status(404).send("Carrito no existe")
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}

export const createCart = async (req,res) => {
    try {
        const rta = await cartModel.create({products: []})
        res.status(201).send(rta)
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}

export const insertProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const {quantity} = req.body
        const cart = await cartModel.findOne({_id: cartId})
        if(cart) {
            const indice = cart.products.findIndex(prod => prod._id == productId)

            if(indice != -1 ) {
                cart.products[indice].quantity = quantity
            } else {
                cart.products.push({id_prod: productId, quantity: quantity})
            }

            const rta = await cartModel.findByIdAndUpdate(cartId, cart)
            return res.status(200).send(rta)
        }else {
            res.status(404).send("Carrito no existe")
        }
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}
export const updateProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid
        const {newProduct} = req.body
        const cart = await cartModel.findOne({_id: cartId})
        cart.products = newProduct
        cart.save()
        res.status(200).send(cart)
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}

export const updateQuantityProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const {quantity} = req.body
        const cart = await cartModel.findOne({_id: cartId})
        if(cart) {
            const indice = cart.products.findIndex(prod => prod._id == productId)

            if(indice != -1 ) {
                cart.products[indice].quantity = quantity
                cart.save()
                res.status(200).send(cart)
            } else {
                res.status(404).send("Producto no encontrado")
            }
        }else {
            res.status(404).send("Carrito no existe")
        }
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}

export const deleteProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const cart = await cartModel.findOne({_id: cartId})
        if(cart) {
            const indice = cart.products.findIndex(prod => prod._id == productId)

            if(indice != -1 ) {
                cart.products.splice(indice, 1)
                cart.save()
                res.status(200).send(cart)
            } else {
               res.status(404).send("Producto no existe")
            }

        }else {
            res.status(404).send("Carrito no existe")
        }
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}

export const deleteCart = async (req,res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        if(cart ){
            cart.products = []
            cart.save()
            res.status(200).send(cart)
        } else {
            res.status(404).send("Carrito no existe")
        }
    }catch(e){
        res.status(500).render('templates/error', {e})
    }
}