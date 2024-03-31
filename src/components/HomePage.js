import React, { useEffect } from 'react'
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
   
    useEffect(() => {
      
      var time1 = 2 * 60 + 30;
      var time2 = 1 * 60 + 10;
      console.log("Soniya => " + (time1 - time2));

      window.scroll(0,0);
    }, []);

    
  return (
    // <div className='flex flex-col md:flex-row justify-evenly items-center mt-6'>
    //     <div className='text-5xl md:text-7xl'>Prepare <span className='text-blue-600'>Best</span></div>
    //     <div className='flex flex-col gap-y-12 items-center mt-8 mb-4 text-lg md:text-2xl'>
    //         <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(1, "Reet Paper - Physics")}>Reet Paper - Physics</button>
    //         <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(2, "Reet I P - Chemistry")}>Reet I P - Chemistry</button>
    //         <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(3, "Reet I - Mathematics")}>Reet I - Mathematics</button>
    //     </div>
    // </div>
    <div className='flex flex-col flex-wrap justify-evenly items-center mt-6 gap-y-10 w-full mx-auto'>
      <div className='flex flex-col justify-evenly items-center mt-6 gap-y-4 '>
        <div className='text-4xl md:text-5xl font-bold text-blue-600 text-center'>Upcoming Contest</div>
        <div className='text-3xl font-bold text-green-600'>Live Test - Physics</div>
        <div className='text-2xl'>Test Day : 12 April 2024 </div>
        <div className='w-full mx-auto'><button className='text-black text-3xl gap-x-1 bg-yellow-500 w-full rounded-md py-2 hover:bg-green-400 hover:text-blue-600 hover:scale-110 transition duration-300 ease-in'>Register Now</button></div>
      </div>
      <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-8/12"></div>
      <div className='flex flex-wrap justify-evenly items-center w-full mx-auto'>
        <div>
          <div className='text-3xl font-bold'>Previous Year Mock Tests</div>
          <div className='flex flex-col gap-y-12 items-center mt-8 mb-4 text-lg md:text-2xl'>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(1, "Reet Paper - Physics")}>Reet Paper - Physics</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(2, "Reet I P - Chemistry")}>Reet I P - Chemistry</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(3, "Reet I - Mathematics")}>Reet I - Mathematics</button>
          </div>
        </div>
        
        <div className='mt-6 md:mt-0'>
          <div className='text-3xl text-green-600 font-bold'>Completed Contests</div>
          <div className='flex flex-col gap-y-12 items-center mt-8 mb-4 text-lg md:text-2xl'>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' >Live Test 01 - Maths</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' >Live Test 02 - Maths</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' >Live Test 03 - Maths</button>
          </div>
        </div>
      </div>
      <div className='text-5xl md:text-7xl'>Prepare <span className='text-blue-600'>Best</span></div>
    </div>
  )
}

export default HomePage