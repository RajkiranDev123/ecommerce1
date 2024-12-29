import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"

const generateRefreshToken = async (userId) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESH_TOKEN, { expiresIn: "2d" })
    const updateRefreshTokenUser = await UserModel.updateOne({ _id: userId }, { refresh_token: token,last_login_date:new Date() })
    return token
}

export default generateRefreshToken