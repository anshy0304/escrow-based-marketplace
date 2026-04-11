import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const[orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchMyOrders = async () =>{
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if(!token || !userId){
                navigate('/login');
                return;
            }
            try{
                const response = await fetch(`https://localhost:7093/api/orders/buyer/${userId}`,{
                    headers:{
                        'Authorization' :`Bearer ${token}`
                    }
                });
                if(!response.ok) throw new Error("Could not load your orders");
                const data = await response.json();
                setOrders(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchMyOrders();
    },[navigate]);
    const handleConfirmDelivery = async (orderId) =>{
        const token = localStorage.getItem('token');
        try{
            const response = await fetch(`https://localhost:7093/api/orders/${orderId}/confirm`,{
                method: 'POST',
                headers :{
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            if(response.ok){
                alert(data.message);
                window.location.reload();
            }else {
                alert('Error: '+data);
            }
        }catch(err){
            alert("Could not connect to server");
        }
    }
    
  return (
    <>
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold text-gray-800 mb-8'>My Orders</h1>
            {loading && <p className='text-gray-500 text-xl'> Loading your orders..</p>}
            {error && <p className='text-red-500 font-bold'>{error}</p>}
            <div className='space-y-4'>
                {orders.map((order) => (
                    <div key={order.id} className='bg-white p-6 rounded-lg shadow border border-gray-200 flex justify-between items-center'>
                        <div>
                            <p className='text-sm text-gray-500'>Order #{order.id}</p>
                            <h2 className='text-xl font-bold text-blue-600'>{order.product?.name || "Product"}</h2>
                            <p className='mt-2 text-sm'>
                                Status: <span className={`font-bold ${order.status === 'Pending' ?'text-orange-500' :'text-green-500'}`}>
                                    {order.status}
                                </span>
                            </p>
                        </div>
                        {order.status === 'Pending' && (
                            <button 
                            onClick={() => handleConfirmDelivery(order.id)}
                            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
                            >
                                Confirm Delivery
                            </button>
                        )}
                        {!loading && order.length === 0 && (
                            <p className='text-gray-500'> You haven't bought anything yet.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Dashboard