import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {db} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";

import ReactModal from 'react-modal'

function HomePage({setHideHeader}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () =>
    {
        setIsOpen(false);
    }
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

    const testCollectionRef = collection(db, "livetests");
    const handleRegisterNow = async () => 
    {
        // check if user registered, if not then ask for login
        const currentUser = localStorage.getItem("currentUser");

        if(currentUser)
        {
          // check if test is started, if not not then show message
          const data = await getDocs(testCollectionRef);
          const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
          const isStarted = filteredData[0].isStarted;
          
          if(isStarted)
          {
            const paper = filteredData[0].testname;
            const testid = filteredData[0].id;
            const testtype = 'livetest';
            // move to condition page
            const path = `/livetestcondition?testid=${testid}&paper=${paper}`
            navigate(path);
          }
          else
          {
            setIsOpen(true);
            setIsStarted(false);
          }
        }
        else
        {
           navigate('/login');
        }
    }
   
    
    const getLiveTest = async () =>
    {
        try
        {
            const data = await getDocs(testCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));

            console.log("virennnn => " + filteredData[0].isPublished);

            if(filteredData[0].isPublished)
            {
               setIsPublished(true);
               setPosts(filteredData);
            }
            else
            {
              setIsPublished(false);
              setPosts([]);
            }
        }
        catch(err)
        {

        }
    }

    useEffect(() => {
      getLiveTest();
      setHideHeader(false);
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
      <div className='flex flex-col justify-evenly items-center mt-6 gap-y-4'>
        <div className='text-4xl md:text-5xl font-bold text-blue-600 text-center'>Upcoming Contest</div>
        {
          !isPublished ? (<div className='text-xl font-semibold'>No Live Contest</div>) : (<div>
          <div>
          {
            posts.map((p, index) => (
              <div>
                <div className='text-3xl font-bold text-green-600'>{p.testname}</div>
                <div className='text-2xl'>Test Day - {p.date}</div>
                <div className='text-2xl'>Duration - {p.duration} </div>
              </div>
            ))
          }
          </div>
          <div className='w-full mx-auto'><button onClick={handleRegisterNow} className='text-black text-3xl gap-x-1 bg-yellow-500 w-full rounded-md py-2 hover:bg-green-400 hover:text-blue-600 hover:scale-110 transition duration-300 ease-in'>Register Now</button></div>
        </div>)}
      </div>
      <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-8/12"></div>
      <div className='flex flex-wrap justify-evenly items-center w-full mx-auto'>
        <div className='bg-bgDark bg-opacity-80 rounded-lg overflow-hidden shadow-2xl pointer-events-auto p-5'>
          <div className='text-3xl font-bold'>Previous Year Mock Tests</div>
          <div class="flex items-center text-center border-t border-brColor pt-4 mt-6"></div>
          <div className='flex flex-col gap-y-12 items-center mt-8 mb-4 text-lg md:text-2xl'>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(1, "Reet Paper - Physics")}>Reet Paper - Physics</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(2, "Reet I P - Chemistry")}>Reet I P - Chemistry</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(3, "Reet I - Mathematics")}>Reet I - Mathematics</button>
          </div>
        </div>
        
        <div className=' mt-6 md:mt-0 bg-bgDark bg-opacity-80 rounded-lg overflow-hidden shadow-2xl pointer-events-auto p-5'>
          <div className='text-3xl font-bold'>Completed Contests</div>
          <div class="flex items-center text-center border-t border-brColor pt-4  mt-6"></div>
          <div className='flex flex-col gap-y-12 items-center mt-8 mb-4 text-lg md:text-2xl'>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' >Live Test 01 - Maths</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' >Live Test 02 - Maths</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' >Live Test 03 - Maths</button>
          </div>
        </div>
      </div>
      <div className='text-5xl md:text-7xl'>Prepare <span className='text-blue-600'>Best</span></div>
      <div>
      
      <ReactModal isOpen={isOpen}
                    contentLabel="Example Modal"
                    onRequestClose={() => setIsOpen(false)} 
                    className='w-11/12 md:w-5/12 mx-auto flex flex-col shadow-lg rounded-lg items-center gap-y-4 p-4 mt-40 bg-gray-300 border-blue-600 border-2'>
                    <div className='flex justify-between text-2xl w-full'>
                        <div className=' text-center font-bold text-blue-600'>Attention!</div>
                        <div onClick={handleClose}><img src="../../images/x.svg" alt="Logo" width={35} loading='lazy'/></div>
                    </div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
                    <div className='text-xl text-red-600 font-semibold'>Contest is not yet started !!!</div>
                    <div className='text-xl'>Have patience, Keep exploring our website</div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
    </ReactModal>
            
      </div>

    </div>
  )
}

export default HomePage