import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";
import { authorization } from "../config/middlewares.js";
const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:pid', getProduct)
productRouter.post('/', authorization("Admin"), createProduct)
productRouter.put('/:pid', authorization("Admin"), updateProduct)
productRouter.delete('/:pid', authorization("Admin"), deleteProduct)

export default productRouter