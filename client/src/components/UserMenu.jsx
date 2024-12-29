import React from 'react'
import { useSelector } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'
import Divider from "./Divider"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"

import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'
import { logout } from "../store/userSlice"
import { useDispatch } from 'react-redux'
import {HiOutlineExternalLink} from "react-icons/hi"


const UserMenu = ({ close }) => {
    const user = useSelector(state => state?.user)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const logoutUser = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if (response?.data?.success) {
                if (close) { close() }
                dispatch(logout())
                localStorage.clear()
                toast.success(response?.data?.message)
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div className=''>
            <p  style={{ fontSize: 10, fontWeight: "bold",display:"flex",alignItems:"center" }}>Account &nbsp;
               <Link to={"/dashboard/profile"}><HiOutlineExternalLink className='cursor-pointer'/></Link> 
            </p>
            <div>{user?.name}</div>
            <Divider />


            <div className='grid'>
                <Link className='hover:bg-orange-200 ' style={{ fontSize: 10, fontWeight: 500 }} to={"/dashboard/myorders"}>My Orders</Link>
                <Link className='hover:bg-orange-200 ' style={{ fontSize: 10, fontWeight: 500 }} to={"/dashboard/address"}>Save Address</Link>
                <Link className='hover:bg-orange-200 ' style={{ fontSize: 10, fontWeight: 500 }} onClick={logoutUser} to={""}>Logout</Link>


            </div>

        </div>
    )
}

export default UserMenu