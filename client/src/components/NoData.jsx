import React from 'react'

const NoData = () => {
    return (
        <div className='flex justify-center mt-4'>
            <div className='flex flex-col justify-center items-center'>
                <p>No Data Found!</p>
                <img width={200} height={200} src='https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg?semt=ais_hybrid' alt='no data' />
            </div>
        </div>
    )
}

export default NoData