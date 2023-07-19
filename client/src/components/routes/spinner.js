import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 


const Spinner = () => {
  const [count,setCount] = useState(10);
  const navigate = useNavigate();
  const location  = useLocation();
  useEffect(()=>{
    const interval = setInterval(()=>{setCount((prevValue) => --prevValue)},1000);
    count ===0 && navigate('/login',{state: location.pathname});
    return () => clearInterval(interval);
  },[count,navigate,location]);
  return (
    <>
    <div class="d-flex justify-content-center align-item-center">
      <h1 className='Text-center'>Redirecting in {count} seconds ...</h1>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </div>   
    </>
  );
};

export default Spinner;