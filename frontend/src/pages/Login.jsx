import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`,{
                method :'Post',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email :email,
                    password:password
                })
            });
            const data = await response.json();
            if(response.ok){
                localStorage.setItem('token',data.token);
                localStorage.setItem('userId',data.userId);
                localStorage.setItem('role',data.role);
                navigate('/')
            }else {
                setErrorMessage(data);
            }
        }catch(error){
            setErrorMessage("Could not connect to the server.Backend issue");
        }
    };
  return (
    <>
        <div className='max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold text-center text-blue-600 mb-6'>
                Login to MarketPlace
            </h2>
            {errorMessage && (
                <div className='bg-red-100 text-red-700 p-3 rounded mb-4 text-center'>
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>
                        Email
                    </label>
                    <input type="email" 
                    required
                    className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>
                        Password
                    </label>
                    <input type="password"
                    required
                    className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                type='submit'
                className='bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition'
                >

                    Login
                </button>
            </form>
        </div>
    </>
  )
}

export default Login