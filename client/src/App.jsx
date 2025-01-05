

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';


import { useDispatch } from 'react-redux' //dispatch actions using useDispatch
import { setAllCategory,setAllSubCategory } from './store/productSlice'
import { useEffect } from 'react';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';

function App() {
  const dispatch = useDispatch()

  const fetchCategories = async () => {
    try {

      const response = await Axios({
        ...SummaryApi.getCategories,

      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData?.data))
        console.log("00", responseData.data)

      }
    } catch (error) {
      toast.error(error)
    } finally {
      // setLoading(false)
    }
  }

  // fetch sub
  const fetchSubCategories = async () => {
    try {


      const response = await Axios({
        ...SummaryApi.getSubCategory,

      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData?.data))


      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
  }, [])

  return (
    <>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
