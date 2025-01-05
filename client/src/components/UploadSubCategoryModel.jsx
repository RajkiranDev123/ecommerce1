import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { useSelector } from 'react-redux'
const UploadSubCategoryModel = ({ close, fetchData }) => {
    const [loading, setLoading] = useState(false)
    const [subCategoryData, setSubCategoryData] = useState({
        name: "", image: "", category: []
    })
    const allCategory = useSelector(state => state.product.allCategory)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setSubCategoryData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (!subCategoryData.name || !subCategoryData?.image || !subCategoryData.category[0]) {
            toast.error("Fill all the fields")
            return
        }
        try {
            console.log(44)
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data: subCategoryData
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
        console.log("file from upload category image ==>", file)
        const res = await uploadImage(file)
        const { data: ImageResponse } = res
        setSubCategoryData((prev) => {
            return { ...prev, image: ImageResponse?.data?.url }
        })
    }
    console.log(subCategoryData)
    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData?.category.findIndex(e => e?._id == categoryId)
        subCategoryData?.category?.splice(index, 1)
        setSubCategoryData((prev) => { return { ...prev } })
    }
    return (
        <section className='fixed top-0 bottom-0 flex justify-center items-center left-0 right-0 bg-neutral-500 bg-opacity-50'>
            <div className='bg-white max-w-4xl w-full p-2 rounded flex-col'>
                <IoClose onClick={() => close(false)} className='ml-auto cursor-pointer' />

                <form className='grid' onSubmit={handleOnSubmit}>
                    <p className='font-semibold'>Add Sub Category</p>
                    <label>Sub Category Name :</label>
                    <input type='text' placeholder='Sub Category Name' onChange={handleOnChange}
                        className='bg-blue-50 p-2 border outline-none focus-within:border-purple-700' name='name' value={subCategoryData.name} />
                    <div >
                        <p>Image Sub Category</p>
                        <div className='flex flex-col lg:flex-row gap-2 items-center'>
                            <div className='bg-blue-50 flex items-center justify-center h-36 rounded w-full lg:w-36'>
                                {subCategoryData.image ? <img src={subCategoryData?.image} width={140} height={140} alt='img' /> : <p>No Image</p>}
                            </div>
                            <label htmlFor={subCategoryData.name ? "uploadImage" : ""}>
                                <div className={
                                    `${!subCategoryData.name ? "bg-gray-500" : "bg-green-600"} h-12 p-1 rounded text-white flex items-center
                  ${!subCategoryData.name ? "cursor-not-allowed" : "cursor-pointer"} `
                                }>Upload Image</div>
                                <input type='file' id='uploadImage' className='hidden ' onChange={onImageUpload} />

                            </label>

                        </div>

                    </div>

                    <div>
                        <label>Select Category</label>
                        <div className='flex items-center gap-1 m-1'>
                            {
                                subCategoryData?.category?.map((cat, index) => {
                                    return (
                                        <p className='border p-1 flex gap-1 items-center justify-between' key={index}>{cat?.name}
                                            <IoClose onClick={() => handleRemoveCategorySelected(cat?._id)}
                                                className='text-red-500 cursor-pointer' />
                                        </p>

                                    )
                                })
                            }
                        </div>
                        <div className='border focus-within:border-primary-200'>
                            <select className='w-full p-1 bg-transparent'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(e => e._id == value)
                                    setSubCategoryData((prev) => {
                                        return { ...prev, category: [...prev.category, categoryDetails] }
                                    })
                                }}
                            >
                                <option value={""} disabled>Select Category</option>
                                {
                                    allCategory?.map((category, index) => {
                                        return (
                                            <option value={category?._id} key={category?._id + "sub"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <button className={`p-1 ${subCategoryData.image && subCategoryData.name && subCategoryData?.category[0] ? "cursor-pointer bg-green-500" : "bg-slate-400 cursor-not-allowed"} text-white rounded mt-1`}>Add</button>

                </form>
            </div>

        </section>
    )
}

export default UploadSubCategoryModel