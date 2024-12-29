import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./config/connectDB.js"
import userRouter from "./route/user.route.js"

const app = express()
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))
app.use(express.json())// parses JSON data from incoming HTTP requests
app.use(cookieParser())//parses incoming cookies from client requests and makes them accessible in the req.cookies object.
app.use(morgan())
//request from any origin : false (protect against requests from other origins)
app.use(helmet({ crossOriginResourcePolicy: false }))//sets HTTP response headers, set security headers returned from express app
const PORT = process.env.PORT || 8001
//or : true then stop
app.use("/api/user", userRouter)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at ${PORT}`)
    })

})
