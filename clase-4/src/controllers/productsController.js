import productModel from "../models/product.js";

export const getProducts = async(req,res) => {
    try {
        const {limit, page, metFilter, filter, metOrder, ord} = req.query
      
        const pag = page !== undefined ? page : 1
        const limi = limit !== undefined ? limit : 10
                                            //status: "true"
        const filQuery = metFilter !== undefined ? {[metFilter]: filter} : {}
        const ordQuery = metOrder !== undefined ? {metOrder: ord} : {}

        const prods = await productModel.paginate(filQuery, {limit: limi, page: pag, ordQuery})
        console.log(prods);

        res.status(200).render('templates/home', {prods})
        
    } catch(e) {
        res.status(500).render('templates/error', {e})
    }
}

export const getProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)
        if(prod)
            res.status(200).render('templates/product', {prod})
        else
            res.status(404).render('templates/error', {e: "Producto no encontrado"})
    } catch(e) {
        res.status(500).render('templates/error', {e})
    }
}

export const createProduct = async(req,res) => {
    try {
        const product = req.body
        const rta = await productModel.create(product)
        res.status(201).redirect('templates/home', {rta})
    }catch(e) {
        res.status(500).render('templates/error', {e})
    }
}

export const updateProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const rta = await productModel.findByIdAndUpdate(idProd, updateProduct)
        if(rta)
            res.status(200).redirect('templates/home', {rta})
        else 
            res.status(404).render('templates/error', {e: "Producto no encontrado"})
    }catch(e) {
        res.status(500).render('templates/error', {e})
    }
}

export const deleteProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const rta = await productModel.findByIdAndDelete(idProd)
        if(rta)
            res.status(200).redirect('templates/home', {rta})
        else 
            res.status(404).render('templates/error', {e: "Producto no encontrado"})
    }catch(e) {
        res.status(500).render('templates/error', {e})
    }
}