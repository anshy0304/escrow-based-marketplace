import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://localhost:7093/api/products');
          if(!response.ok){
            throw new Error("Could not load Products");
          }
          const data = await response.json();
          setProducts(data);
        }
        catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
      };
      fetchProducts();
  },[]);

  const handleBuy = async (productId) => {
    const token = localStorage.getItem('token');
    if(!token){
      alert("Please log in to purchase items.");
      navigate('/login');
      return;
    }
    try{
      const response = await fetch('https://localhost:7093/api/orders/checkout', {
        method : 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization' :`Bearer ${token}`
        },
        body : JSON.stringify({
          productId:productId
        })
      });
      const data = await response.json();
      if(response.ok){
        alert("Congrats " + data.message);
      }else alert(data);
    }catch(err){
      alert("Could not connect to the server");
    }
  }

  return (
    <>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            All Products
          </h1>
          {loading && <p className='text-center text-gray-500 text-xl'>Loading items </p>}
          {error && <p className='text-center text-red-500 font-bold'>{error}</p>}
            {products.map((product) =>(
            <div key={product?.id} className='bg-white p-6 rounded-lg shadow-mg border-gray-200 flex flex-col justify-between'>
            <div>
              <h2 className='text-xl font-bold text-blue-600 mb-2'>{product.name}</h2>
              <p className='text-gray-500 text-sm mb-4'>Sold by: {product.seller.name || "Unknow Seller"}</p>
            </div>
            <div className='flex justify-between items-center mt-4'>
              <span className='text-2xl font-bold text-green-600'>${product.price}</span>
              <button 
              onClick={() => handleBuy(product.id)}
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
                Buy Now
              </button>
            </div>
          </div>))}
          {!loading && products.length == 0 && (
            <p className='text-center text-gray-500 col-span-full'>
              No Products available right now.
            </p>
          )}
        </div>
    </>
  )
}

export default Home