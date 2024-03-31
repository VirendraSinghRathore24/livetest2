import React from 'react'

function TestCard({d, setIndex, testid, setFirstIndex, setSecondIndex, setThirdIndex, setFourthIndex, setOpen}) {

const handleButtonClick = (ind) =>
  {
    setIndex(ind);
    setOpen(true);
    let selectedIndex = localStorage.getItem(testid + "#" + (ind+1));

    if(selectedIndex == 1)
    {
        setFirstIndex(true);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(false);
    } 
    else if(selectedIndex == 2)
    {
        setFirstIndex(false);
        setSecondIndex(true);
        setThirdIndex(false);
        setFourthIndex(false);
    }
    else if(selectedIndex == 3)
    {
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(true);
        setFourthIndex(false);
    }
    else if(selectedIndex == 4)
    {
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(true);
    }
    else
    {
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(false);
    }
  } 

  return (
    <div className=''>
    {
        localStorage.getItem(testid + "#" + (d+1)) ? (<button className=' bg-green-600 h-10 w-10 text-white font-xl shadow-md rounded-md sm:mb-0 mr-2 mb-4' onClick={() => handleButtonClick(d)}>{d+1}</button>)
            : (<button className=' bg-blue-600 text-white h-10 w-10 font-xl shadow-md rounded-md sm:mb-0 mr-2 mb-4' onClick={() => handleButtonClick(d)}>{d+1}</button>)
    }
        
    </div>
  )
}

export default TestCard