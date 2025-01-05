import React from 'react'
import { IoClose } from "react-icons/io5"

const ViewImage = ({ url, close }) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-600 bg-opacity-70 flex justify-center items-center '>
            <div className='w-full max-w-md p-4 bg-white rounded-sm'>
                <IoClose className='ml-auto cursor-pointer' onClick={close} />

                <img src={url} alt='view' className='w-full h-full object-scale-down' />
            </div>

        </div>
    )
}

export default ViewImage