import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { useState } from 'react';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='p-6'>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path = "/Login" element = {<Login />}></Route>
      </Routes>
      </div>
    </>
  )
}

export default App
