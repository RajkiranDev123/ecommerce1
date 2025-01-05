import { Router } from "express"
import { AddSubCategory, getSubCategory, updateSubCategory,deleteSubCategory } from "../controllers/subCategory.controller.js"
import auth from "../middleware/auth.js"
const SubCategoryRouter = Router()

SubCategoryRouter.post("/add-subcategory", auth, AddSubCategory)
SubCategoryRouter.post("/get-subcategory", getSubCategory)
SubCategoryRouter.put("/update-subcategory", auth, updateSubCategory)
SubCategoryRouter.delete("/delete-subcategory", auth, deleteSubCategory)





export default SubCategoryRouter