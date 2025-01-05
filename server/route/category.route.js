
import {Router} from "express"
import auth from "../middleware/auth.js"
import {AddCategory,getCategories,updateCategory,deleteCategory} from "../controllers/category.controller.js"
const categoryRouter=Router()

categoryRouter.post("/add-category",auth,AddCategory)
categoryRouter.get("/get-categories",auth,getCategories)
categoryRouter.put("/update-category",auth,updateCategory)
categoryRouter.delete("/delete-category",auth,deleteCategory)




export default categoryRouter