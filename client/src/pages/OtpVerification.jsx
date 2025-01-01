import React, { useEffect, useRef, useState } from 'react'

import toast from 'react-hot-toast';
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useLocation, useNavigate } from 'react-router-dom';
const OtpVerification = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(["", "", "", "", "", ""])
  const inputRef = useRef([])
  console.log("input ref", inputRef)
  const location = useLocation()
  console.log("location from otp verification", location)
  const valid = data.every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.verify_otp,
        data: { otp: data.join(""), email: location?.state?.email }
      })
      console.log("response ==> ", response)
      if (response?.data?.success) {
        toast.success("Otp verification done and now you can reset your password!")
        setData(["", "", "", "", "", ""])
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email
          }
        })
      }
    } catch (error) {
      console.log("error==>", error)
      AxiosToastError(error)
    }
  }
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password")
    }
  }, [])
  return (
    <section >
      <div className='bg-white  my-4 max-w-lg mx-auto p-4 rounded'>
        <p className='font-semibold'>Verify your OTP</p>
        <form className='mt-4' onSubmit={handleSubmit}>
          <div className='grid'>

            {/* email */}
            <label htmlFor='otp'>Type OTP</label>
            <div className='flex justify-between'>
              {
                data?.map((element, index) => {
                  return <input value={data[index]} key={index} ref={(ref) => {
                    inputRef.current[index] = ref
                    return ref
                  }}
                    onChange={(e) => {
                      const value = e.target.value
                      const newData = [...data]
                      newData[index] = value
                      setData(newData)
                      if (value && index < 5) {
                        inputRef.current[index + 1].focus()
                      }
                    }}
                    maxLength={1} type='text' name='otp' className='bg-blue-50 p-2 w-14 text-center' />
                })
              }
            </div>

            <button disabled={!valid} className={`${valid ? "bg-green-500" : "bg-gray-500"} text-white py-2 rounded my-2 font-semibold tracking-wide`}
            >Verify</button>
            <p>
              Already have an account ? <Link to={"/login"} className='font-semibold text-green-800 hover:text-yellow-500'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default OtpVerification