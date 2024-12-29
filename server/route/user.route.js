import { Router } from "express"
import {
    register, login, verifyEmail, logout, uploadAvatar, updateUserDetails, forgotPasswordSendOtp,
    verifyOtp,resetPassword,refreshToken,userDetails
} from "../controllers/user.controller.js"
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js"
const userRouter = Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/verify-email", verifyEmail)

userRouter.get("/logout", auth, logout)
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar)
userRouter.put("/update-user", auth, updateUserDetails)


userRouter.put("/forgot-password", forgotPasswordSendOtp)
userRouter.post("/verify-otp", verifyOtp)
userRouter.put("/reset-password", resetPassword)
userRouter.post("/refresh-token", refreshToken)

userRouter.get("/user-details",auth, userDetails)


export default userRouter