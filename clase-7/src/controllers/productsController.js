import productModel from "../models/product.js";

export const getProducts = async(req,res) => {
    try {
        const {limit, page, metFilter, filter, metOrder, ord} = req.query
        console.log(limit);
        
        const pag = page !== undefined ? page : 1
        const limi = limit !== undefined || limit !== null ? limit : 10
                                            //status: "true"
        const filQuery = metFilter !== undefined ? {[metFilter]: filter} : {}
        const ordQuery = metOrder !== undefined ? {metOrder: ord} : {}

        const prods = await productModel.paginate(filQuery, {limit: limi, page: pag, ordQuery, lean: true})
        console.log(prods);

        prods.pageNumbers = Array.from({length: prods.totalPages}, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === prods.page
        }))

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
        res.status(201).send("Producto creado")
    }catch(e) {
        res.status(500).send(e)
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