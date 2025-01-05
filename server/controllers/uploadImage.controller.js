import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"


export const UploadImageController = async (req, res) => {
    try {
        const file = req.file
        // console.log("file",file)

        const upload = await uploadImageCloudinary(file)

        return res.status(200).json({
            message: "Img Added!",
            data: upload,
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