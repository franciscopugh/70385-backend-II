import express from "express";
import productRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import sessionRouter from "./sessions.routes.js";
import { __dirname } from "../path.js";

const indexRouter = express.Router()

indexRouter.use('/api/sessions', sessionRouter)
indexRouter.use('/api/products', productRouter)
indexRouter.use('/api/carts', cartRouter)
indexRouter.use('/public', express.static(__dirname + '/public')) 

export default indexRouter