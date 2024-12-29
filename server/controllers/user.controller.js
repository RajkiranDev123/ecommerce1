import UserModel from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { sendEmail } from "../config/sendEmail.js"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"
import generateAccessToken from "../utils/generateAccessToken.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"
import generateOtp from "../utils/generateOtp.js"
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js"
//////////////////////////////////// register //////////////////////////////////////////////////
// export const reg=async()=>{}
export async function register(req, res) {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory !", error: true, success: false })
    }
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email is already registered !", error: true, success: false })
        }
        const salt = await bcryptjs.genSalt(6)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const payload = { name, email, password: hashedPassword }
        const newUser = new UserModel(payload)
        const save = await newUser.save()//returns saved doc {} too!
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const mail = await sendEmail({ sendTo: email, subject: "Verify email !", html: verifyEmailTemplate({ name, url: verifyEmailUrl }) })

        return res.status(201).json({ message: "User registered!", error: false, success: true, data: save })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

///////////////////////////////////////////// login ///////////////////////////////////////
//401 : UnAuthorized
export async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) { return res.status(400).json({ message: "Email & Password are required!", error: true, success: false }) }
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User is not registered!", error: true, success: false })
        }
        if (user?.status !== "Active") {
            return res.status(400).json({ message: "Contact to Admin!", error: true, success: false })
        }
        const hashedPasswordCompare = await bcryptjs.compare(password, user?.password)
        if (!hashedPasswordCompare) {
            return res.status(400).json({ message: "Password is not Correct!", error: true, success: false })
        }
        const accessToken = await generateAccessToken(user?._id)
        const refreshToken = await generateRefreshToken(user?._id)
        const cookiesOption = { httpOnly: true, secure: true, sameSite: "None" }
        res.cookie("accessToken", accessToken, cookiesOption)
        res.cookie("refreshToken", refreshToken, cookiesOption)
        return res.status(200).json({ message: "Login Done!", error: false, success: true, data: { accessToken, refreshToken, user } })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

/////////////////////////////////////////////////////////logout ////////////////////////////////////////////////////

export async function logout(req, res) {
    try {
        const userId = req?.userId
        //res.clearCookie("key");
        const cookiesOption = { httpOnly: true, secure: true, sameSite: "None" }
        res.clearCookie("accessToken", cookiesOption)
        res.clearCookie("refreshToken", cookiesOption)
        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, { refresh_token: "" })
        return res.status(200).json({ message: "logout done!", error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

///////////////////////////////////////////////////// verify email ////////////////////////////////////////////

export async function verifyEmail(req, res) {
    try {
        const { code } = req?.body
        const user = await UserModel.findOne({ _id: code })
        if (!user) {
            return res.status(400).json({ message: "Invalid code", error: true, success: false })
        }
        const updateUser = await UserModel.updateOne({ _id: code }, { verify_email: true })
        return res.status(200).json({ message: "Email verification done!", error: false, success: true })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}



////////////////////////////////////////////////// upload avatar ////////////////////////////
export async function uploadAvatar(req, res) {
    try {
        const userId = req?.userId //req.userId = decode?.id
        const image = req?.file //from multer
        console.log(image)
        const upload = await uploadImageCloudinary(image)
        console.log("upload profile ==> ", upload)
        const updateAvatar = await UserModel.findByIdAndUpdate(userId, { avatar: upload?.url || "" })
        return res.status(200).json({ message: "Profile Uploaded!", data: { _id: userId, avatar: upload?.url }, error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}


//////////////////////////////////////      update user          ////////////////////////////////////////

export async function updateUserDetails(req, res) {
    try {
        const userId = req?.userId
        const { name, email, password, mobile } = req.body
        let hashedPassword = ""
        if (password) {
            const salt = await bcryptjs.genSalt(6)
            hashedPassword = await bcryptjs.hash(password, salt)
        }
        const updatedUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(password && { password: hashedPassword }),
            ...(mobile && { mobile: mobile }),
        })

        return res.status(200).json({ message: "user updated!", data: updatedUser, error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

//////////////////////////////////////      forgot password   (public route)      ////////////////////////////////////////

// flow ==> forgotPassword Controller (send otp to email) ===> verify otp controller ===> reset password controller (set new password)
export async function forgotPasswordSendOtp(req, res) {

    try {
        const { email } = req?.body
        const user = await UserModel.findOne({ email })
        if (!user) { return res.status(400).json({ message: "Email is not registered!", error: true, success: false }) }
        const otp = generateOtp()
        console.log("generated otp", otp)
        const expireTime = new Date() + 60 * 60 * 1000
        console.log("new Date() + 60 * 60 * 1000 ==> ", expireTime)
        console.log("new Date(expireTime).toISOString() ==> ", new Date(expireTime).toISOString())
        console.log("new Date() ==> ", new Date())
        const update = await UserModel.findByIdAndUpdate(user?._id,
            { forgot_password_otp: otp, forgot_password_expiry: new Date(expireTime).toISOString() })
        await sendEmail({ sendTo: email, subject: "otp", html: forgotPasswordTemplate({ name: user?.name, otp: otp }) })
        return res.status(200).json({ message: "check your email !", otp: otp, error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

////////////////////////////////////////// verify otp ///////////////////////////////////////
export async function verifyOtp(req, res) {
    try {
        const { email, otp } = req?.body
        if (!email || !otp) { return res.status(400).json({ message: "Email and OTP are required!", error: true, success: false }) }
        const user = await UserModel.findOne({ email })
        if (!user) { return res.status(400).json({ message: "User not found!", error: true, success: false }) }
        const currentTime = new Date().toISOString()
        if (user?.forgot_password_expiry < currentTime) {
            return res.status(400).json({ message: "OTP is expired!", error: true, success: false })
        }
        if (otp !== user?.forgot_password_otp) {
            return res.status(400).json({ message: "OTP is not Correct!", error: true, success: false })
        }
        const updateUser = await UserModel.findByIdAndUpdate(user?._id,
            { forgot_password_otp: "", forgot_password_expiry: "" })
        return res.status(200).json({ message: "otp verification done!", error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

////////////////////////////////////////// reset password ///////////////////////////////////////
export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req?.body
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required!", error: true, success: false })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User is not available!", error: true, success: false })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "new and confirm password doesnt match!", error: true, success: false })
        }
        const salt = await bcryptjs.genSalt(6)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)
        const update = await UserModel.findByIdAndUpdate(user?.id, { password: hashedPassword })
        return res.status(200).json({ message: "password reset done!", error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

////////////////////////////////////////// refreshToken ///////////////////////////////////////
export async function refreshToken(req, res) {
    try {
        const refreshToken = req?.cookies?.refreshToken || req?.headers["authorization"]?.split(" ")[1]
        if (!refreshToken) {
            return res.status(401).json({ message: "unAuthorized!", error: true, success: false })
        }
        const verifyToken = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        console.log("verify token", verifyToken)
        if (!verifyToken) {
            return res.status(401).json({ message: "Token Expired!", error: true, success: false })
        }
        const userId = verifyToken?.id
        const newAccessToken = await generateAccessToken(userId)
        const cookiesOption = { httpOnly: true, secure: true, sameSite: "None" }
        res.cookie("accessToken", newAccessToken, cookiesOption)
        return res.status(200).json({ message: "new access token generated!", data: { accessToken: newAccessToken }, error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}

///////////////////////////////////////////// user details ///////////////////////////////
////////////////////////////////////////// refreshToken ///////////////////////////////////////
export async function userDetails(req, res) {
    try {
        const userId = req?.userId //req.userId = decode?.id
        const user = await UserModel.findById(userId).select("-password -refresh_token")
        return res.status(200).json({ message: "user details!", data: user, error: false, success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message || error, error: true, success: false })
    }
}