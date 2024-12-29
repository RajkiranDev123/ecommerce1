import { v2 as cloudinary } from "cloudinary"
cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
})
const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "bClone" }, (error, uploadResult) => {
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage
}
export default uploadImageCloudinary
// async function o() {
//     const uploadImage = await new Promise((resolve, reject) => {
//         resolve(77700)
//     })
//     console.log(uploadImage)
// }
// console.log(1)

// //  console.log(uploadImage)
// o()
// console.log(2)
// async function p() {
//     const uploadImage = await new Promise((resolve, reject) => {
//         return resolve(77)
//     })
//     console.log(uploadImage)
// }
// console.log(99)
// p()
// console.log(88)

// 1
// 2
// 99
// 88
// 77700
// 77