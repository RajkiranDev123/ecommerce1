import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddField = ({ close, value, onChange, submit }) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-600 bg-opacity-30 flex justify-center items-center'>

            <div className='bg-white p-4 rounded-sm flex flex-col justify-center'>
                <div className='flex justify-between items-center'>
                    <h1>Add Field</h1>
                    <IoClose className='cursor-pointer' onClick={close} />
                </div>

                <input type='text' onSubmit={submit} onChange={onChange} value={value}
                    className='p-1 bg-blue-50' placeholder='Add Field Name' />


                <button onClick={submit} className='block text-center bg-red-600 text-white p-1 rounded mt-1'>Add</button>

            </div>

        </div>
    )
}

export default AddField