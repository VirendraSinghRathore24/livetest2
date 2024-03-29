import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const handleClick = (testid, paper) => 
    {
        const currentUser = localStorage.getItem("currentUser");

        if(currentUser)
        {
          const path = `/testcondition?testid=${testid}&paper=${paper}`
          navigate(path);
        }
        else
        {
          navigate('/login');
        }
    }

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center mt-6'>
        <div className='text-5xl md:text-7xl'>Prepare <span className='text-blue-600'>Best</span></div>
        <div className='flex flex-col gap-y-12 items-center mt-8 mb-4 text-lg md:text-2xl'>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(1, "Reet Paper - Physics")}>Reet Paper - Physics</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(2, "Reet I P - Chemistry")}>Reet I P - Chemistry</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(3, "Reet I - Mathematics")}>Reet I - Mathematics</button>
        </div>
    </div>
  )
}

export default HomePage