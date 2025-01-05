import SubCategoryModel from "../models/subCategory.model.js"

export const AddSubCategory = async (req, res) => {
    try {
        const { name, image, category } = req.body
        if (!name || !image || !category[0]) {
            return res.status(400).json({
                message: "All fields are required!",
                error: true,
                success: false
            })
        }
        const payload = { name, image, category }
        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()
        return res.status(201).json({ message: "SubCategory Added!", error: false, success: true, data: save })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

/////////////////////////get subCategory /////////////////////////

export const getSubCategory = async (req, res) => {
    try {

        const SubCategories = await SubCategoryModel.find().sort({ createdAt: -1 }).populate("category")
        return res.status(200).json({ message: "SubCategory data!", error: false, success: true, data: SubCategories })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

/////////////////////////update subCategory /////////////////////////

export const updateSubCategory = async (req, res) => {
    try {
        const { _id, name, image, category } = req.body
        const update = await SubCategoryModel.findByIdAndUpdate(_id, {
            name, image, category
        })
        return res.status(201).json({ message: "SubCategory Updated!", error: false, success: true, data: update })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

/////////////////////////////////// delete subCategory//////////////////////////////

export const deleteSubCategory = async (req, res) => {
    try {
        const _id = req.body
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)
        return res.status(200).json({ message: "SubCategory deleted!", error: false, success: true, data: deleteSub })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}





