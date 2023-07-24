import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

function Error404() {
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    redirectCountdown(4, 1000, false);
    redirectCountdown(3, 2000, false);
    redirectCountdown(2, 3000, false);
    redirectCountdown(1, 4000, false);
    redirectCountdown(1, 5000, true);

    // setTimeout(()=> {
    //   setCountdown(4)
    // }, 1000);
    // setTimeout(()=> {
    //   setCountdown(3)
    // }, 2000);
    // setTimeout(()=> {
    //   setCountdown(2)
    // }, 3000);
    // setTimeout(()=> {
    //   setCountdown(1)
    // }, 4000);
    // setTimeout(() => {
    //   setRedirect(true);
    //   navigate("/");
    // }, 5000);

  }, []);

  function redirectCountdown(count, seconds, redirect) {
    setTimeout(()=> {
      setCountdown(count)
      if (redirect === true) {
        setRedirect(true);
        navigate("/", { replace: true });
      }
    }, seconds);
  }

  return (
    <div>
      <h1>Error404</h1>
      <button onClick={() => navigate(-1)}>Back...</button>
      <h4>Redirecting in: {countdown}</h4>
      
      {/* { redirect && <Navigate to={"/"} replace={true} /> } */}
    </div>
  )
}

export default Error404