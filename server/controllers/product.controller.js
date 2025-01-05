import ProductModel from "../models/product.model.js"

export const addProduct = async (req, res) => {

    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body
        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !discount || !description || !more_details) {
            return res.status(400).json({ message: "All Fields are required!", error: true, success: false })
        }

        const product = new ProductModel({
            name, image, category, subCategory, unit, stock, price, discount, description, more_details
        })
        const save = await product.save()
        return res.status(201).json({ message: "Product Added!", data: save, error: false, success: true })

    } catch (error) {

        return res.status(500).json({
            message: error.message || error, error: true, success: false
        })

    }
}


////////////////////////////////////////////////////
export const getProducts = async (req, res) => {

    try {
        let { page, limit, search } = req.headers

        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        const skip = (page - 1) * limit
        const query = search ? { $text: { $search: search } } : {}

        const [data, totalCount] = await Promise.all(
            [
                ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
                ProductModel.countDocuments(query)
            ]
        )

        return res.status(200).json({
            message: "Products!", error: false, success: true,
            totalCount: totalCount, data: data, totalPages: Math.ceil(totalCount / limit)
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message || error, error: true, success: false
        })

    }
}