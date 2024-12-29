import { useEffect } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';

// import fetchUserDetails from "./utils/fetchUserDetails"
//import { useDispatch } from 'react-redux' //dispatch actions using useDispatch
// import { setUserDetails } from './store/userSlice'

function App() {
  // const dispatch = useDispatch()

  // const fetchUser = async () => {
  //   const userData = await fetchUserDetails()
  //   console.log("user details from app.jsx ==>", userData.data)
  //   dispatch(setUserDetails(userData.data))
  // }
  // useEffect(() => {
  //   fetchUser()
  // }, [])

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
