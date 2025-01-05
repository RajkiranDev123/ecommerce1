import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from "../components/UploadSubCategoryModel"
import Loading from "../components/Loading"
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from "@tanstack/react-table"
import ViewImage from "../components/ViewImage"
import EditSubCategory from "../components/EditSubCategory"
import ConfirmBox from '../components/ConfirmBox'

const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const [deleteData, setDeleteData] = useState({ _id: "" })

  const [editData, setEditData] = useState({
    _id: ""
  })
  const [subCategoryData, setSubCategoryData] = useState([])
  const columnHelper = createColumnHelper()
  const fetchSubCategories = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.getSubCategory,

      })
      const { data: responseData } = response
      if (responseData.success) {
        setSubCategoryData(responseData?.data)

      }
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  const column = [
    columnHelper.accessor("name", {
      header: "Name"
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return <div className='flex justify-center'>
          <img onClick={() => setImageUrl(row.original.image)}
            src={row.original.image} alt='img' className='w-10 h-10 cursor-pointer'
          />
        </div>
      }
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return <>
          {
            row?.original?.category?.map((c, index) => {
              return (
                <p className='inline-block shadow-md p-1' key={index}>{c?.name}</p>
              )
            })
          }
        </>
      }

    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return <div className='flex justify-center gap-2'>
          <button onClick={() => { setOpenEdit(true); setEditData(row.original) }} className='border rounded bg-yellow-400 text-black p-1'>Edit</button>
          <button onClick={() => { setDeleteData(row.original); setOpenDeleteConfirmBox(true) }} className='border rounded bg-red-900 text-white p-1'>Delete</button>

        </div>
      }

    }),

  ]

  const deleteSubCategory = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data:deleteData

      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success("Deleted Successfully!")
        setOpenDeleteConfirmBox(false)
        fetchSubCategories()
        deleteData({_id:""})

      }
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategories()
  }, [])
  return (
    <section>

      <div className='p-2 shadow-md flex justify-between w-full'>
        <h2 className='p-2 font-semibold'>Sub Category</h2>
        <button onClick={() => setOpenUploadSubCategory(p => !p)} className='p-1 bg-primary-200 rounded-md hover:bg-yellow-200'>Add Sub Category</button>
      </div>

      {openUploadSubCategory && <UploadSubCategoryModel fetchData={fetchSubCategories} close={setOpenUploadSubCategory} />}
      {
        <div>
          <DisplayTable
            data={subCategoryData}
            column={column}
          />
        </div>
      }

      {
        imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />
      }
      {
        openEdit && <EditSubCategory fetchData={fetchSubCategories} data={editData} close={() => setOpenEdit(false)} />
      }
      {
        openDeleteConfirmBox && <ConfirmBox close={() => setOpenDeleteConfirmBox(false)} confirm={deleteSubCategory} />
      }

      {
        !subCategoryData?.length > 0 && loading == false && <NoData />
      }
      <div>
        {
          loading ? <Loading /> : ""
        }
      </div>
    </section>
  )
}

export default SubCategory