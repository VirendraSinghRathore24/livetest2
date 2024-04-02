import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ReactModal from 'react-modal';


function LiveConditionPage({setHideHeader}) {
    const [isOpen, setIsOpen] = useState(false);    
    const [searchParams, setSearchParams] = useSearchParams();

    let navigate = useNavigate();

    const testid = searchParams.get('testid');
    const paper = searchParams.get('paper').replaceAll('%20', ' ');

    const handleBegin = () =>
    {
        setHideHeader(true);
      
        let path = `/livetest?testid=${testid}&paper=${paper}`; 
        navigate(path);
    }

    const handleCancelClick = () => 
    {
        window.location.href = `/`
    }

    useEffect(() => {
        window.scroll(0,0);
      }, []);
  return (
    <div className='p-4'>
        <ReactModal isOpen={isOpen}
            contentLabel="Example Modal"
            onRequestClose={() => setIsOpen(false)} 
            className='w-11/12 md:w-5/12 mx-auto flex flex-col shadow-lg rounded-lg items-center gap-y-4 p-4 mt-40 bg-gray-300 border-blue-600 border-2'>
            <div className='flex justify-between text-2xl w-full'>
                <div className=' text-center font-bold text-blue-600'>Attention!</div>
                <div onClick={() => {setIsOpen(false)}}><img src="../../images/x.svg" alt="Logo" width={35} loading='lazy'/></div>
            </div>
            <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
            <div>Once you start the test, you will not be able to pause it.</div>
            <div>Do not refresh the page. It may submit the test when you refresh it.</div>
            <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
            <div className='flex justify-end w-full '>
                <button className=' bg-blue-800 text-white px-8 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-500' onClick={handleBegin}>Begin</button>
            </div>
        </ReactModal>
        <div className='border-2 w-full md:w-5/12 mx-auto p-4'>
        <div className='text-xl font-bold text-center mb-4 text-blue-600'>Test Conditions</div>
        <div className='text-lg flex flex-col  justify-center text-left  gap-y-4'>
            <div>• This is an online live test for <span className='font-semibold'>{paper}</span></div>
            <div>• This online test is useful for <span className='font-semibold'>competitive exams.</span></div>
            <div>• <span className='font-semibold'>Multiple answer choices </span> are given for each question in the test.</div>
            <div>• You have to choose the <span className='font-semibold'>best option.</span></div>
            <div>• After completing test, you can see you result.</div>
            <div className='flex item-center justify-center gap-x-8'>
                <button className=' bg-blue-800 text-white px-6 py-2 font-xl rounded-md sm:mb-0' onClick={() => handleCancelClick()}>Cancel</button>
                <button className=' bg-green-800 text-white px-8 py-2 font-xl rounded-md sm:mb-0' onClick={() => {setIsOpen(true)}}>Start</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default LiveConditionPage