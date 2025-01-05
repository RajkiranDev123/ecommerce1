import React from 'react'
import UserMenu from '../UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <section className='bg-white'>
            <div className='container mx-auto grid grid-cols-[250px,1fr] p-3'>
                {/* left menu */}
                <div className='sticky top-24  hidden lg:block'><UserMenu /></div>


                {/* right menu */}
                <div className='min-h-[70vh] max-w-[99vw] border-l p-1'><Outlet /></div>
            </div>
        </section>
    )
}

export default Dashboard