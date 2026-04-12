import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import baseURL from '../api';
function AddProduct() {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const navigate = useNavigate();

    const handleAddProduct = async (e) =>{
        e.preventDefault();
        const sellerId = localStorage.getItem('userId');
        if(!sellerId) {
            alert("You must be logged in to add a product");
            navigate('/login');
            return;
        }
        try{
            const response = await fetch(`${baseURL}/products`,{
                method:'POST',
                headers  :{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name:name,
                    price:parseFloat(price),
                    sellerId:parseInt(sellerId)
                })
            });
            if(response.ok){
                alert("Product added successfully");
                navigate('/');
            }else {
                alert('Failed to add Product');
            }
        }catch(err){
            alert("Could not connect to the server");
        }
    }
  return (
    <>
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">List a New Product</h2>

      <form onSubmit={handleAddProduct} className="flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Name</label>
          <input 
            type="text" required placeholder="e.g., Used Laptop"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input 
            type="number" step="0.01" required placeholder="500.00"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
            value={price} onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">
          Add to Shop
        </button>
      </form>
    </div>
    </>
  )
}

export default AddProduct