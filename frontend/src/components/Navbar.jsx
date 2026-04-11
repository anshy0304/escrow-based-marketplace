import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
        <nav className='bg-blue-600 text-white shadow-md p-4 flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold m-0'>Ansh's MarketPlace</h2>
            <div className='space-x-6 font-medium'>
                <Link to ="/" className ="hover:text-blue-200 transition">Home</Link>
                <Link to ="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                    Login
                </Link>


            </div>
        </nav>
    </>
  )
}

export default Navbar