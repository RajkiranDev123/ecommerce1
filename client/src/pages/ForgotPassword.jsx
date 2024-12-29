import React, { useState } from 'react'

import toast from 'react-hot-toast';
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({ email: "" })
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
                ...SummaryApi.forgot_password,
                data: data
            })
            console.log("response ==> ", response)
            if (response?.data?.success) {
                toast.success("Otp sent ! Check your email!")
                navigate("/verification-otp", { state: data })
                setData({ email: "" })

            }
        } catch (error) {
            console.log("error==>", error)
            AxiosToastError(error)
        }
    }
    return (
        <section >
            <div className='bg-white  my-4 max-w-lg mx-auto p-4 rounded'>
                <p>Forgot Password</p>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='grid'>

                        {/* email */}
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' value={data.email} onChange={handleChange} className='bg-blue-50 p-2' placeholder='Email' />

                        <button disabled={!valid} className={`${valid ? "bg-green-500" : "bg-gray-500"} text-white py-2 rounded my-2 font-semibold tracking-wide`}
                        >Send Otp</button>
                        <p>
                            Already have an account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-yellow-500'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword