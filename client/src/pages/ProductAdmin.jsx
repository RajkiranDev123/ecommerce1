import React, { useEffect, useState } from 'react'
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from "../utils/AxiosToastError"
import Loading from '../components/Loading'
const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProducts,
        headers: {
          page: page
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
console.log(productData)
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <section>
      <div className='p-2 shadow-md flex justify-between w-full'>
        <h2 className='p-2 font-semibold'>All Products</h2>
      </div>
      {
        loading&&<Loading/>
      }
    </section>
  )
}

export default ProductAdmin