import React, { useReducer, useState } from 'react'
import logo from "../assets/logo.jpg"
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import useMobile from '../hook/useMobile'
import "./Header.css"
import { BsCart4 } from "react-icons/bs"
import { FaRegCircleUser } from "react-icons/fa6"
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"

import { useSelector } from "react-redux"//read data from store using react-redux hooks
import UserMenu from './UserMenu'
const Header = () => {
    const navigate=useNavigate()
    const [isMobile] = useMobile()
    const location = useLocation()
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const user = useSelector(state => state.user)
    console.log("user from store (header.jsx) ==> ", user)

    const handleMobileUser=()=>{
        console.log(" id from handleMobileUser ==> ",user?._id)
        if(!user?._id){
            navigate("/login")
            return
        }
        navigate("/user-mobile")
    }
    return (
        // header tag
        <header className='shadow-md sticky top-0 bg-white'>
            {/*className= "container w-40 mx-auto" ==> to center the container */}
            {(location.pathname == "/search" && isMobile) ? <Search />
                // header_items
                : <div className='header_items  h-full flex items-center justify-between p-1 '>
                    {/* logo */}
                    <div>
                        <Link to="/">
                            <img src={logo} style={{ height: 60, borderRadius: 5 }} alt='logo' />
                        </Link>
                    </div>
                    {/* logo ends */}

                    {/* search */}
                    <div>
                        <div>
                            <Search />
                        </div>
                    </div>
                    {/* search ends*/}

                    {/* login & cart */}
                    <div>
                        {/*for  mobile view*/}
                        <button className='text-neutral-600 lg:hidden' >
                            <FaRegCircleUser  onClick={handleMobileUser}/>
                        </button>
                        {/*for desktop view */}
                        <div className='hidden lg:flex items-center gap-10 '>
                            {
                                user?._id ? (
                                    <div className='relative'>
                                        <div className='flex items-center gap-4'>
                                            <p className='cursor-pointer' onClick={() => setOpenUserMenu(p => !p)}>Account</p>
                                            {openUserMenu ? <GoTriangleDown onClick={() => setOpenUserMenu(p => !p)} className='cursor-pointer' />
                                                :
                                                <GoTriangleUp className='cursor-pointer' onClick={() => setOpenUserMenu(p => !p)} />
                                            }


                                        </div>
                                        {openUserMenu && <div className='absolute  bg-white top-9  p-3 shadow'>
                                            <UserMenu close={setOpenUserMenu}/>
                                        </div>}
                                    </div>

                                ) : (<Link className='text-lg' to={"/login"}>Login</Link>)
                            }
                            <button className='flex items-center bg-green-700 hover:bg-green-500 px-2 py-1 rounded text-white'>
                                {/* add to cart icon */}
                                <div className='animate-bounce'><BsCart4 size={22} /></div>
                                <div className='font-semibold'>
                                    <p>My Cart</p>
                                </div>
                            </button>
                        </div>
                        {/* desktop view ends*/}


                    </div>
                    {/* login and cart ends*/}

                    {/* header items ends */}
                </div>}



        </header>
        // header tag ends
    )
}

export default Header