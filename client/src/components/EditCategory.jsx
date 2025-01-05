import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
const EditCategory = ({ close, fetchData,data:CategoryData }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: CategoryData?.name, image: CategoryData?.image,_id:CategoryData?._id
    })
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (!data.name) {
            toast.error("Fill all the fields")
            return
        }
        try {
            console.log(44)
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                close(false)
                fetchData()
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    const onImageUpload = async (e) => {

        const file = e.target.files[0]
        if (!file) {
            return
        }
        setLoading(true)
        console.log("file from upload category image ==>", file)
        const res = await uploadImage(file)
        setLoading(false)
        const { data: ImageResponse } = res
        setData((prev) => {
            return { ...prev, image: ImageResponse?.data?.url }
        })
    }

    return (
        <section className='fixed top-0 bottom-0 flex justify-center items-center left-0 right-0 bg-neutral-500 bg-opacity-50'>
            <div className='bg-white max-w-4xl w-full p-2 rounded flex-col'>
                <IoClose onClick={() => close(false)} className='ml-auto cursor-pointer' />

                <form className='grid' onSubmit={handleOnSubmit}>
                    <p className='font-semibold'>Edit Category</p>
                    <label>Name :</label>
                    <input type='text' placeholder='Category Name' onChange={handleOnChange} className='bg-blue-50 p-2' name='name' value={data.name} />
                    <div >
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row gap-2 items-center'>
                            <div className='bg-blue-50 flex items-center justify-center h-36 rounded w-full lg:w-36'>
                                {data.image ? <img src={data?.image} width={140} height={140} alt='img' /> : <p>No Image</p>}
                            </div>
                            <label htmlFor={data.name ? "uploadImage" : ""}>
                                <div className={
                                    `${!data.name ? "bg-gray-500" : "bg-green-600"} h-12 p-1 rounded text-white flex items-center
                  ${!data.name ? "cursor-not-allowed" : "cursor-pointer"} `
                                }>  {loading?"loading...":"Upload"}</div>
                                <input type='file' id='uploadImage' className='hidden ' onChange={onImageUpload} />

                            </label>

                        </div>

                    </div>
                    <button className={`p-1 ${data.image && data.name ? "cursor-pointer bg-green-500" : "bg-slate-400 cursor-not-allowed"} text-white rounded mt-1`}>
                       Update
                    </button>

                </form>
            </div>

        </section>
    )
}

export default EditCategory