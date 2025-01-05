import axios from "axios"
import SummaryApi, { baseURL } from "../common/SummaryApi"

// const instance = axios.create();
// instance.interceptors.request.use(function () {});
const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

Axios.interceptors.request.use(
     (config) => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//refresh token : extend the life span of accessToken
Axios.interceptors.response.use(
    (response) => {
        console.log("2nd interceptor")
        console.log("response from 2nd interceptor",response)
        return response
    },
    async (error) => {
     
        let originRequest = error.config
        if (error?.response?.status == 401 && !originRequest.retry) {
            originRequest.retry = true

            const refreshToken = localStorage.getItem("refreshToken")

            if (refreshToken) {
        

                const newAccessToken = await refreshAccessToken(refreshToken)
                if (newAccessToken) {
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
        return Promise.reject(error)
    },

)

//api call
const refreshAccessToken = async (refreshToken) => {
    try {
        console.log("refresj token from front end",refreshToken)
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem("accessToken", accessToken)
        return accessToken
    } catch (error) {
        console.log(error)
    }
}

export default Axios