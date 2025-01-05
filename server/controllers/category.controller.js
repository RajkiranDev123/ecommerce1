import CategoryModel from "../models/category.model.js"
import SubCategoryModel from "../models/subCategory.model.js"
import ProductModel from "../models/product.model.js"



export const AddCategory = async (req, res) => {
    try {
        const { name, image } = req.body
        if (!name || !image) {
            return res.status(400).json({
                message: "All fields are required!",
                error: true,
                success: false
            })
        }

        const addCategory = new CategoryModel({
            name, image
        })
        const saveCategory = await addCategory.save()
        if (!saveCategory) {
            return res.status(500).json({
                message: "Try Again! Something went wrong!",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Category Added!",
            data: saveCategory,
            success: true,
            error: false
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


//////////////////////////getCategories///////////////////////
export const getCategories = async (req, res) => {
    try {
        const data = await CategoryModel.find().sort({createdAt:-1})
        return res.status(200).json({
            message:"fetched all categories",
            data: data,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//////////////////////////////////update category //////////////////////////////

export const updateCategory = async (req, res) => {
    try {
        const { _id, name, image } = req.body
        const update = await CategoryModel.updateOne({ _id: _id }, {
            name, image
        })
        return res.status(200).json({
            data: update,
            error: false,
            success: true,
            message: "Category Updated!"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//////////////////////////////////// delete category /////////////////////////////////////////

export const deleteCategory = async (req, res) => {
    try {
        const { _id } = req.headers["cat-id"]

        const checkSubCategory = await SubCategoryModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()
        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({ message: "Category Already in use", error: true, success: false })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id: _id })


        return res.status(200).json({
            data: deleteCategory,
            error: false,
            success: true,
            message: "Category Deleted!"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}