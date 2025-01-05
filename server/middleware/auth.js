import jwt from "jsonwebtoken"
const auth = (req, res, next) => {
    try {
        const token = req?.cookies?.accessToken || req?.headers["authorization"]?.split(" ")[1]
        //console.log("req?.cookies?.accessToken :", req?.cookies?.accessToken)
        //console.log("req?.headers?.authorization :", req?.headers.authorization) //Bearer cc
        //console.log("req?.headers[authorization] :", req?.headers["authorization"]?.split(" ")[1]) //cc

        if (!token) { return res.status(401).json({ message: "Provide token", error: true, success: false }) }

        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

        if (!decode) { return res.status(401).json({ message: "UnAuthorized", error: true, success: false }) }
        req.userId = decode?.id // add a property userId to the req object

        next()
    } catch (error) {

        return res.status(401).json({ message: "UnAuthorized j", error: true, success: false })
    }
}

export default auth