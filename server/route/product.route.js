import { Router } from "express"
import { addProduct ,getProducts} from "../controllers/product.controller.js"
import auth from "../middleware/auth.js"
const productRouter = Router()

productRouter.post("/add-product", auth, addProduct)
productRouter.get("/get-products", auth, getProducts)

export default productRouter