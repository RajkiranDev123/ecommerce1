import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa"
import UserAvatarEdit from '../components/UserAvatarEdit'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import fetchUserDetails from "../utils/fetchUserDetails"
import { setUserDetails } from '../store/userSlice'
const Profile = () => {
  const dispatch=useDispatch()
  const user = useSelector(state => state.user)
  console.log("user from profile", user)
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile
  })
  const [loading, setLoading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUserData(p => {
      return { ...p, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        const userData=await fetchUserDetails()
        dispatch(setUserDetails(userData.data))

      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div>
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
      <button onClick={() => setProfileAvatarEdit(p => !p)} className='text-sm bg-gray-500 p-1 rounded-md mt-2 text-white hover:bg-gray-400'>Edit</button>
      {openProfileAvatarEdit && <UserAvatarEdit close={setProfileAvatarEdit} />}

      {/* name, mobile, email , change password */}
      <form className='my-3' onSubmit={handleSubmit}>
        <div className='grid'>
          <label>Name</label>
          <input type='text' required name='name' onChange={handleOnChange} value={userData?.name} className='bg-blue-50 outline-primary-200' />
          <label>Email</label>
          <input type='text' name='email' onChange={handleOnChange} value={userData?.email} className='bg-blue-50 outline-primary-200' />
          <label>Mobile</label>
          <input type='text' name='mobile' onChange={handleOnChange} value={userData?.mobile} className='bg-blue-50 outline-primary-200' />
          <button className='bg-yellow-50 my-2 text-semibold '>
            {
              loading ? "Loading..." : "Submit"
            }
          </button>

        </div>

      </form>

    </div>
  )
}

export default Profile