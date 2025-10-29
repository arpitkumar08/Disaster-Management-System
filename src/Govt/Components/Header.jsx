import React from 'react'

const Header = () => {
    return (
        <div className='flex items-center justify-between shadow-xl md:gap-4 bg-gray-100'>
            <div className='flex items-center ml-8'>
                <div>
                    <img src="../../../public/shield.png" alt="sheild" className='h-20 w-20' />
                </div>

                <div>
                    <h1 className='font-bold text-2xl'>Disaster Management Portal</h1>
                    <p>Government Officials Dashboard</p>
                </div>
            </div>

            <div className='mr-8'>
                <button
                    onClick={() => { alert("Logout clicked") }}
                    className='font-semibold text-white bg-red-500 p-2 cursor-pointer hover:bg-red-700 rounded-md'>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header


