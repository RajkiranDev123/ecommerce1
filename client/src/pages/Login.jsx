import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa"
import { FaRegEyeSlash } from "react-icons/fa"
import toast from 'react-hot-toast';
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from "../utils/fetchUserDetails"

import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState({

        email: "",
        password: "",

    })
    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const valid = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            })
            console.log("response from login page ==> ", response)
            if (response?.data?.success) {
                toast.success("Login done!")
                localStorage.setItem("accessToken", response?.data?.data?.accessToken)
                localStorage.setItem("refreshToken", response?.data?.data?.refreshToken)
                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails?.data))


                setData({ email: "", password: "" })
                navigate("/")
            }
        } catch (error) {
            console.log("error==>", error)
            AxiosToastError(error)
        }
    }
    return (
        <section >
            <div className='bg-white  my-4 max-w-lg mx-auto p-4 rounded'>
                <p>Login to Blinkit Clone</p>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='grid'>

                        {/* email */}
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' value={data.email} onChange={handleChange} className='bg-blue-50 p-2' placeholder='Email' />
                        {/* password */}
                        <label htmlFor='password'>Password</label>
                        <div className='flex items-center w-full bg-blue-50 p-1 focus-within:border-bg-yellow'>
                            <input type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleChange} className='bg-blue-50 p-2 w-full outline-none' placeholder='Password' />
                            {
                                showPassword ? < FaRegEye onClick={() => setShowPassword(!showPassword)} /> : <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                            }
                        </div>
                        {/* forgot password */}
                        <Link className='ml-auto hover:text-primary-200' to={"/forgot-password"}>Forgot Password?</Link>


                        <button disabled={!valid} className={`${valid ? "bg-green-500" : "bg-gray-500"} text-white py-2 rounded my-2 font-semibold tracking-wide`}
                        >Login</button>


                    </div>
                </form>
                <p>
                    Don't have an account ? <Link to={"/register"} className='font-semibold text-green-800 hover:text-yellow-500'>Register</Link>
                </p>

            </div>
        </section>
    )
}

export default Login