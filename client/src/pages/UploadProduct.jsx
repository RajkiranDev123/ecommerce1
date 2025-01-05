import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa"
import uploadImage from "../utils/UploadImage"
import Loading from "../components/Loading"
import { MdDelete } from "react-icons/md"
import ViewImage from "../components/ViewImage"
import { useSelector } from "react-redux"
import AddField from "../components/AddField"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from "../utils/AxiosToastError"
import toast from 'react-hot-toast'

const UploadProduct = () => {
  const [imageLoading, setImageLoading] = useState(false)
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")


  const [openViewImage, setOpenViewImage] = useState("")
  const [data, setData] = useState({
    name: "", image: [], category: [], subCategory: [], unit: "", stock: "", price: "", discount: "", description: "", more_details: {}
  })

  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)


  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleAddField = () => {
    setData((p) => {
      return { ...p, more_details: { ...p.more_details, [fieldName]: "" } }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleDeleteImage = (index) => {
    data.image.splice(index, 1)
    setData((prev) => {
      return { ...prev }
    })
  }
  const handleDeleteCategory = (index) => {
    data.category.splice(index, 1)
    setData((prev) => {
      return { ...prev }
    })
  }
  const handleDeleteSubCategory = (index) => {
    data?.subCategory?.splice(index, 1)
    setData((prev) => {
      return { ...prev }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      const response =await Axios({
        ...SummaryApi.addProduct,
        data: data
      })
      const { data: responseData } = response
      console.log("jio",response)
      if (responseData?.success) {
        toast.success(responseData.message)
        setData({
          name: "", image: [], category: [], subCategory: [], unit: "", stock: "", price: "", discount: "", description: "", more_details: {}
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleUploadImage = async (e) => {
    setImageLoading(true)
    const file = e.target.files[0]
    if (!file) {
      return
    }
    const res = await uploadImage(file)
    const { data: ImageResponse } = res
    setData((prev) => {
      return { ...prev, image: [...prev.image, ImageResponse?.data?.url] }
    })
    setImageLoading(false)

  }
  console.log(data)
  return (
    <section>

      <div className='p-2 shadow-md flex justify-between  max-w-[95vw]'>
        <h2 className='p-2 font-semibold'>Add Product</h2>
      </div>
      <div className='mt-3'>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name :</label>
            <input id='name' type='text' value={data.name} placeholder='Name' name='name'
              className='bg-blue-50 outline-none p-1 rounded' onChange={handleChange} />

            <label htmlFor='description'>Description :</label>
            <textarea id='description' type='text' value={data.description} placeholder='Description' name='description' rows={4}
              className='bg-blue-50 outline-none p-1 rounded' onChange={handleChange} />
            {/* image */}
            <div>
              <p>Image</p>
              <div>
                <div className='bg-blue-50 h-24 flex justify-center items-center'>
                  <label htmlFor='image' className='flex flex-col justify-center items-center'>
                    {imageLoading ? <Loading /> : <><FaCloudUploadAlt className='cursor-pointer' size={33} />
                      <p>Upload Image</p></>}
                  </label>

                  <input id='image' accept='image/*' type='file' className='hidden' onChange={handleUploadImage} />
                </div>
                {/* display uploaded image */}
                <div className='mt-1 flex justify-center group'>
                  {
                    data?.image?.map((img, index) => {
                      return (
                        <div className='relative '>
                          <img onClick={() => setOpenViewImage(img)} width={55} height={55} className='rounded cursor-pointer' src={img} alt='img' />
                          <div className='absolute bottom-0  bg-white rounded-sm'>
                            <MdDelete onClick={() => handleDeleteImage(index)} className='text-red-600 cursor-pointer hidden group-hover:block' size={17} />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            {/* image */}

            {/* category */}
            <div className='grid gap-1'>
              <label>Category</label>
              <div>
                <select
                  onChange={(e) => {
                    const value = e.target.value
                    const category = allCategory.find(e => e?._id == value)
                    setData((prev) => {
                      return { ...prev, category: [...prev?.category, category] }
                    })

                  }}
                  className='bg-blue-50 w-full p-1 rounded-sm'>
                  <option value={""}>Select Category</option>
                  {
                    allCategory?.map((c, index) => {
                      return (
                        <option value={c?._id}>{c?.name}</option>
                      )
                    })
                  }
                </select>
                <div className='flex gap-1 mt-1'>
                  {

                    data?.category?.map((c, index) => {
                      return (
                        <div className='flex border p-1 items-center'>
                          <p className='p-1 '>{c?.name}</p>
                          <span onClick={() => handleDeleteCategory(index)} className='text-red-600 cursor-pointer'>x</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            {/* category ends */}

            {/*sub category */}
            <div className='grid gap-1'>
              <label>Sub Category</label>
              <div>
                <select
                  onChange={(e) => {
                    const value = e.target.value
                    const subCategory = allSubCategory.find(e => e?._id == value)
                    setData((prev) => {
                      return { ...prev, subCategory: [...prev?.subCategory, subCategory] }
                    })

                  }}
                  className='bg-blue-50 w-full p-1 rounded-sm'>
                  <option value={""}>Select SubCategory</option>
                  {
                    allSubCategory?.map((s, index) => {
                      return (
                        <option value={s?._id}>{s?.name}</option>
                      )
                    })
                  }
                </select>
                <div className='flex gap-1 mt-1'>
                  {

                    data?.subCategory?.map((s, index) => {
                      return (
                        <div className='flex border p-1 items-center'>
                          <p className='p-1 '>{s?.name}</p>
                          <span onClick={() => handleDeleteSubCategory(index)} className='text-red-600 cursor-pointer'>x</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            {/*sub category ends*/}

            {/* unit */}
            <label htmlFor='unit'>Unit :</label>
            <input id='unit' type='text' value={data.unit} placeholder='Unit' name='unit'
              className='bg-blue-50 outline-none p-1 rounded' onChange={handleChange} />

            {/* unit ends */}

            {/* stock */}
            <label htmlFor='stock'>Stock :</label>
            <input id='stock' type='number' value={data.stock} placeholder='Stock' name='stock'
              className='bg-blue-50 outline-none p-1 rounded' onChange={handleChange} />

            {/* stock */}


            {/* price */}
            <label htmlFor='price'>Price :</label>
            <input id='price' type='number' value={data.price} placeholder='Price' name='price'
              className='bg-blue-50 outline-none p-1 rounded' onChange={handleChange} />

            {/* price */}

            {/* discount */}
            <label htmlFor='discount'>Discount :</label>
            <input id='discount' type='number' value={data.discount} placeholder='Discount' name='discount'
              className='bg-blue-50 outline-none p-1 rounded' onChange={handleChange} />

            {/* discount */}

            {/* add field button*/}
            {/* add more field */}
            <div>
              {
                Object.keys(data.more_details)?.map((k, index) => {
                  return (
                    <> <label htmlFor={k}>{k} : </label>
                      <input id={k} type='text' value={data.more_details[k]}
                        className='bg-blue-50 outline-none p-1 rounded' onChange={(e) => {
                          const value = e.target.value
                          setData((prev) => {
                            return { ...prev, more_details: { ...prev.more_details, [k]: value } }
                          })
                        }} />
                    </>)
                })
              }
            </div>

            {/* add more field */}

            <div onClick={() => setOpenAddField(true)}
              className='bg-blue-500 font-semibold cursor-pointer rounded-sm text-white p-1 w-25'>Add More Field</div>
            {/* add field button*/}


            {/* add product */}
            <button className='p-1 bg-red-600 text-red-50 rounded-sm'>
              Add Product</button>
            {/* add product */}




          </div>
        </form>
      </div>
      {/* modals */}
      {
        openViewImage && <ViewImage url={openViewImage} close={() => setOpenViewImage("")} />
      }
      {
        openAddField && <AddField
          value={fieldName}
          close={() => setOpenAddField(false)}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
        />
      }
    </section>
  )
}

export default UploadProduct