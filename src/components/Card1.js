import React from 'react'

function Card1({courseName, color}) {
  return (
    <div className='relative w-[180px] pointer-events-auto mt-32 hover:scale-110 transition duration-300 ease-in '>

       <div style={{backgroundColor: color}} className='absolute bottom-8 px-4 text-left text-wrap h-28 w-full rounded-xl'>
            <p className='text-white font-bold text-lg  mt-2 '>{courseName}</p>
            <img className='mt-6' src="../images/arrow.svg" alt="img"/>
        </div>
        

    </div>
  )
}

export default Card1