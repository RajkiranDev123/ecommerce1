import React, { useEffect, useState } from 'react'
import { FaRegEye } from "react-icons/fa"
import { FaRegEyeSlash } from "react-icons/fa"
import toast from 'react-hot-toast';
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useLocation, useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const location = useLocation()
    console.log("location from reset password", location)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const valid = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.newPassword !== data.confirmPassword) {
            toast.error("password and confirm password are not same!")
            return
        }
        try {
            const response = await Axios({
                ...SummaryApi.reset_password,
                data: data
            })
            console.log("response from reset password ==> ", response)
            if (response?.data?.success) {
                toast.success("Reset done!")
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })

                navigate("/login")
            }
        } catch (error) {
            console.log("error==>", error)
            AxiosToastError(error)
        }
    }
    useEffect(() => {

        if (!location?.state?.data?.success) {
            navigate("/")
        }
        if (location?.state?.email) {
            setData((prev) => {
                return { ...prev, email: location?.state?.email }
            })
        }



    }, [])
    return (
        <section >
            <div className='bg-white  my-4 max-w-lg mx-auto p-4 rounded'>
                <p>Reset Password for : {location?.state?.email}</p>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='grid'>


                        {/* password */}
                        <label htmlFor='password'>Password</label>
                        <div className='flex items-center w-full bg-blue-50 p-1 focus-within:border-bg-yellow'>
                            <input type={showPassword ? "text" : "password"} name='newPassword' value={data.password} onChange={handleChange} className='bg-blue-50 p-2 w-full outline-none' placeholder='Password' />
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
                        >Change Password</button>


                    </div>
                </form>
                <p>
                    Already have an account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-yellow-500'>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default ResetPassword