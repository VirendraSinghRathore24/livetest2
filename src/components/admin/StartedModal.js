import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'

function StartedModal({isStarted}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () =>
    {
        setIsOpen(false);
    }

    useEffect(() => {
      //setIsOpen(isStarted);
      window.scroll(0,0);
    }, []);

  return (
    
    <ReactModal isOpen={isOpen}
                    contentLabel="Example Modal"
                    onRequestClose={() => setIsOpen(false)} 
                    className='w-11/12 md:w-5/12 mx-auto flex flex-col shadow-lg rounded-lg items-center gap-y-4 p-4 mt-40 bg-gray-300 border-blue-600 border-2'>
                    <div className='flex justify-between text-2xl w-full'>
                        <div className=' text-center font-bold text-blue-600'>Attention!</div>
                        <div onClick={handleClose}><img src="../../images/x.svg" alt="Logo" width={35} loading='lazy'/></div>
                    </div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
                    <div>Contest is not yet started</div>
                    <div>Have patience, Keep exploring our website</div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
    </ReactModal>
  )
}

export default StartedModal