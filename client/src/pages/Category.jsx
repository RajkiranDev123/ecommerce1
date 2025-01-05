import React, { useEffect, useState } from 'react'
import UploadCategoryModel from "../components/UploadCategoryModel"
import Loading from "../components/Loading"
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import { useSelector } from 'react-redux'
const Category = () => {
  const [uploadCategory, setUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEditCategory, setOpenEditCategory] = useState(false)
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const [editData, setEditData] = useState({})
  const [deleteCategory, setDeleteCategory] = useState({})

  const allCategory = useSelector(state => state.product.allCategory)



  // const fetchCategories = async () => {
  //   try {
  //     setLoading(true)
  //     console.log(8760)
  //     const response = await Axios({
  //       ...SummaryApi.getCategories,

  //     })
  //     const { data: responseData } = response
  //     if (responseData.success) {
  //       setCategoryData(responseData?.data)

  //     }
  //   } catch (error) {
  //     toast.error(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  useEffect(() => {
    setCategoryData(allCategory)

  }, [allCategory])

  const handleDeleteCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        headers: {
          "cat-id": deleteCategory?._id
        }

      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData?.message)
        // fetchCategories()
        setOpenDeleteConfirmBox(false)
      }
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <section>

      <div className='p-2 shadow-md flex justify-between w-full'>
        <h2 className='p-2 font-semibold'>Category</h2>
        <button onClick={() => setUploadCategory(p => !p)} className='p-1 bg-primary-200 rounded-md hover:bg-yellow-200'>Add Category</button>
      </div>

      {uploadCategory && <UploadCategoryModel close={setUploadCategory} />}
      {openEditCategory && <EditCategory data={editData} close={setOpenEditCategory} />}
      {openDeleteConfirmBox && <ConfirmBox close={setOpenDeleteConfirmBox} confirm={handleDeleteCategory} />}



      {
        !categoryData?.length > 0 && loading == false && <NoData />
      }
      {
        categoryData?.length > 0 && <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
          {
            categoryData?.map((category, index) => {
              return <div className='flex flex-col items-center justify-center rounded shadow-md p-1'>
                <img width={100} height={150} src={category?.image} alt='name' />
                <p>{category?.name}</p>
                <div className='flex justify-between gap-5'>
                  <button onClick={() => { setEditData(category); setOpenEditCategory(true) }} className='bg-green-500 p-1 rounded text-white'>Edit</button>
                  <button onClick={() => { setDeleteCategory(category); setOpenDeleteConfirmBox(true) }} className='bg-red-500 p-1 rounded text-white'>Delete</button>

                </div>
              </div>
            })
          }
        </div>
      }

      <div>
        {
          loading ? <Loading /> : ""
        }
      </div>



    </section>
  )
}

export default Category