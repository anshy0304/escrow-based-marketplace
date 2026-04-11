import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('Buyer');
    const [errorMessage,setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7093/api/auth/register',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    role:role
                })

                });
                if(response.ok){
                    alert("Registration successfull! You can now log in.");
                    navigate('/login');
                }else {
                    const errorData = await response.text();
                    setErrorMessage(errorData);
                }
         }catch(error){
            setErrorMessage("Could not connect to the server");
         }
    };

  return (
    <>
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create an Account</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input 
            type="text" required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input 
            type="email" required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input 
            type="password" required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">I want to be a...</label>
          <select 
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={role} onChange={(e) => setRole(e.target.value)}
          >
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
      
      <p className="text-center mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>
      </p>
    </div>
    </>
  )
}

export default Register