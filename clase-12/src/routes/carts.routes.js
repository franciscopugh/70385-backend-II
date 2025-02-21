import { Router } from "express";
import { getCart, createCart, insertProductCart, updateProductCart, updateQuantityProductCart, deleteCart, deleteProductCart, checkout } from "../controllers/cartsController.js";
import { authorization } from "../config/middlewares.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCart )
cartRouter.post('/', authorization("Usuario"), createCart )
cartRouter.post('/:cid/products/:pid', insertProductCart)
cartRouter.post('/:cid/checkout', checkout)
cartRouter.put('/:cid', authorization("Usuario"), updateProductCart)
cartRouter.put('/:cid/products/:pid', authorization("Usuario"), updateQuantityProductCart )
cartRouter.delete('/:cid', authorization("Usuario"), deleteCart )
cartRouter.delete('/:cid/products/:pid',authorization("Usuario"),  deleteProductCart )


export default cartRouter