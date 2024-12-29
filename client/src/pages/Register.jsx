import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa"
import { FaRegEyeSlash } from "react-icons/fa"
import toast from 'react-hot-toast';
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const valid = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.password !== data.confirmPassword) {
            toast.error("password and confirm password are not same!")
            return
        }
        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            })
            console.log("response ==> ",response)
            if (response?.data?.success) {
                toast.success("Registration done!")
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }
        } catch (error) {
            console.log("error==>",error)
            AxiosToastError(error)
        }
    }
    return (
        <section >
            <div className='bg-white  my-4 max-w-lg mx-auto p-4 rounded'>
                <p>Welcome to Blinkit Clone</p>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='grid'>
                        {/* name */}
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={data.name} onChange={handleChange} className='bg-blue-50 p-2 outline-none focus:border-bg-red-500' autoFocus placeholder='Name' />
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
                        {/* confirm password */}
                        <label htmlFor='confirmpassword'>Confirm Password</label>
                        <div className='flex items-center w-full bg-blue-50 p-1 focus-within:border-secondary-200'>
                            <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={data.confirmPassword} onChange={handleChange} className='bg-blue-50 p-2 w-full outline-none' placeholder='Confirm Password' />
                            {
                                showConfirmPassword ? < FaRegEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <FaRegEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            }
                        </div>

                        <button disabled={!valid} className={`${valid ? "bg-green-500" : "bg-gray-500"} text-white py-2 rounded my-2 font-semibold tracking-wide`}
                        >Register</button>


                    </div>
                </form>
                <p>
                    Already have an account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-yellow-500'>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default Register