import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5"
import { FaArrowLeft } from "react-icons/fa"

import { TypeAnimation } from 'react-type-animation';
import { useNavigate, useLocation, Link } from 'react-router-dom';
const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const redirectToSearchPage = () => {
        navigate("/search")
    }
    useEffect(() => {
        const isSearch = location.pathname == "/search"
        setIsSearchPage(isSearch)
    }, [location])

    return (
        <div className='min-w-[300px] lg:min-w-[400px]  h-12 rounded-md border text-neutral-500 cursor-pointer'>
            <div className='flex items-center justify-start h-full p-1 w-full '  >
                {isSearchPage ? <Link to={"/"}><FaArrowLeft size={22} /></Link>
                    : <IoSearch size={22} />
                }
                {
                    isSearchPage ? <input autoFocus className='w-full h-full outline-none ml-2' type='text' placeholder='search...' />
                        :
                        <div className='w-full' onClick={redirectToSearchPage}>
                            <TypeAnimation className='ml-2 w-full '
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search like "Milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "Butter"',

                                ]}
                                wrapper="span"
                                speed={40}
                                repeat={Infinity}
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default Search