import React from 'react'
import { IoClose } from "react-icons/io5"

const ConfirmBox = ({ close,confirm }) => {

    return (
        <section className='fixed top-0 bottom-0 flex justify-center items-center left-0 right-0 bg-neutral-500 bg-opacity-50'>
            <div className='bg-white max-w-4xl w-full p-2 rounded flex-col'>
                <div className='flex justify-between'>
                    <p className='font-semibold'>Delete ?</p>
                    <IoClose onClick={() => close(false)} className='ml-auto cursor-pointer' />
                </div>
                <div>
                    Do you really want to delete?
                    <div className='flex justify-end gap-5'>
                        <button onClick={() => close(false)} className='border rounded border-red-500 hover:bg-red-400 hover:text-white p-1'>Cancel</button>
                        <button onClick={()=>confirm()} className='border rounded border-green-500 hover:bg-green-400 hover:text-white p-1'>Confirm</button>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ConfirmBox