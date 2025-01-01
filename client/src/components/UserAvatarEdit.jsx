import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import Axios from "../utils/Axios"
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import { updateAvatar } from "../store/userSlice"
import { IoClose } from "react-icons/io5"
import toast from 'react-hot-toast'

const UserAvatarEdit = ({ close }) => {
    const user = useSelector(state => state.user)
    console.log("user from UserUpdateAvatar", user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target.files)
    }
    const handleUploadAvatarImage = async (e) => {
        e.preventDefault()
        // console.log(e.target.files[0])
        const file = e.target.files[0]
        if (!file) { return }
        setFileName(file?.name)
        const formData = new FormData()
        formData.append("avatar", file)
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: responseData } = response
            dispatch(updateAvatar(responseData.data.avatar))
            toast.success(responseData?.message)

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full flex flex-col items-center justify-center rounded p-5 gap-3'>
                <IoClose onClick={() => close(false)} className='ml-auto block cursor-pointer ' />
                <div>
                    {
                        user?.avatar ?
                            <div>
                                <img src={user?.avatar} alt='img' width={25} height={25} className='rounded-full drop-shadow-sm' />
                            </div>
                            :
                            <div>
                                <FaRegUserCircle />
                            </div>
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='uploadProfile'>
                        <div className='border border-primary-200 px-2 rounded text-sm'>
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>

                    </label>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden' />
                </form>
                <p>{fileName}</p>
            </div>


        </section>
    )
}

export default UserAvatarEdit