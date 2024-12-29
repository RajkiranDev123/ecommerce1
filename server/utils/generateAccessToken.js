import jwt from "jsonwebtoken"

const generateAccessToken = async (userId) => {
    //////////////////////////// object 
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: "6h" })
    // jwt.sign(payload,sk,expiry) payload is an object

    return token

}

export default generateAccessToken