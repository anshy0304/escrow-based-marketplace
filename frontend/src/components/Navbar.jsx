import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Navbar() {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/login');
    }
  return (
    <>
        <nav className='bg-blue-600 text-white shadow-md p-4 flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold m-0'>MarketPlace</h2>
            <div className='space-x-6 font-medium'>
                <Link to ="/" className ="hover:text-blue-200 transition">Home</Link>
                
                {token ? (
                    <>
                    {userRole === 'Seller' && (
                    <Link to= '/add-product' className='text-green-300 hover:text-green-100 transition'>
                        Add Product
                    </Link>
                )}
                 <Link to='/dashboard' className='hover:text-blue-200 transition'>Dashboard</Link>
                 <button
                 onClick={handleLogout}
                 className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition ml-4'
                 >
                    Logout
                 </button>
                    </>
                ) :(
                <>
                
                <Link to='/register' className='hover:text-blue-200 transition'>Register</Link>
                <Link to ="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                    Login
                </Link>
                </>
                )}


            </div>
        </nav>
    </>
  )
}

export default Navbar