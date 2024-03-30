import React, { useEffect, useState } from 'react'
import testdata from '../data/livetest.json'
import { useNavigate, useSearchParams } from 'react-router-dom';
import TestCard from './TestCard';
import Timer from './Timer';
import ReactModal from 'react-modal';
import axios from 'axios'
import baseUrl from '../baseUrl';
import {db} from "../config/firebase";
import {collection, addDoc} from "firebase/firestore";

function TestPage() {
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const testid = searchParams.get('testid'); 
  const paper = searchParams.get('paper');

  const [posts, setPosts] = useState(testdata);
  const [lastIndex, setLastIndex] = useState(100);
  const [isOpen, setIsOpen] = useState(false);

  const [index, setIndex] = useState(0);
  const [firstIndex, setFirstIndex] = useState(false);
  const [secondIndex, setSecondIndex] = useState(false);
  const [thirdIndex, setThirdIndex] = useState(false);
  const [fourthIndex, setFourthIndex] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function fetchTestData()
  {
      const data1 = testdata.filter((x) => x.testid == testid);
      setPosts(data1[0].paper);
    //   setMinutes(data1[0].timeInMinutes);
    //   setSeconds(data1[0].timeInSeconds);
  
      setLastIndex(data1[0].paper.length);
  }

  function completedTestTime()
  {
    let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds + 1);
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(myInterval)
            } else {
                setMinutes(minutes + 1);
                setSeconds(59);
            }
        } 
    }, 1000)
    return ()=> {
        clearInterval(myInterval);
    };
};

  const handlePrevClick = (ind) => {
    setIndex(index - 1);

    let selectedIndex = localStorage.getItem(testid + "#" + ind);

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
        console.log('Jaipur')
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
 
  const handleResetClick = (ind) => {
    console.log("Sanju " + ind);

    localStorage.removeItem(testid + "#" + ind);
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(false);
  }
  const handleNextClick = (ind) => {
   
    setIndex(index + 1);

    let selectedIndex = localStorage.getItem(testid + "#" + ind);

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
        console.log('Jaipur')
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
 
  
  const handleClick = (e) =>{
    if(e == 1)
    {
        setFirstIndex(true);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(false);
    }
    else if(e == 2)
    {
        setFirstIndex(false);
        setSecondIndex(true);
        setThirdIndex(false);
        setFourthIndex(false);
    }
    else if(e == 3)
    {
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(true);
        setFourthIndex(false);
    }
    else
    {
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(true);
    }
    localStorage.setItem(testid +"#"+(index+1), e);
    console.log('Stored Values')
    console.log(testid +"#"+(index+1)+ " => " + e)
    
  }
 
  const handleSubmitClick1 = () =>
  {
    setIsOpen(true);
  }
    const handleClose = () =>
    {
        setIsOpen(false);
    }

  const testCollectionRef = collection(db, "tests");
  const handleSubmitClick = async () =>
  {
    var ans = [];
    let c = 0;
    for(var i = 0; i < lastIndex; i++)
    {
        var resUser = localStorage.getItem(testid +"#"+(i + 1));
        var result1 = posts[i].result;

        if(resUser == result1)
        {
            c = c + 1;
        }

        ans.push({resUser});
    }

    var result = (c/lastIndex)*100;
     
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    var resultid = date + '-' + today.getMilliseconds();
    
    const user = localStorage.getItem("currentUser");

        try{
             await addDoc(testCollectionRef, {
                name: (user + "data"), testid : testid, paper : paper, result : result, date:date, ans:ans, resultid:resultid
            });
        }
        catch(err)
        {
            console.log(err);
        }

    const timeTaken = `${minutes}:${seconds}`
    console.log(timeTaken);

    let path = `/testresult?testid=${testid}&paper=${paper}&&score=${result}&&date=${date}&&resultid=${resultid}`; 
    navigate(path);
  }

  
  useEffect(() => {
    window.scroll(0,0);
    for(var i = 0; i <= lastIndex; i++)
    {
        localStorage.removeItem(testid +"#"+ (i+1))
    }
    completedTestTime();
    fetchTestData();
    
  }, []);

  return (
    <div>
    <div className='flex justify-end mr-5 mt-2'><div className=' '><Timer testid={testid} paper={paper} lastIndex={lastIndex} posts={posts} /></div></div>
    <div className='flex flex-col md:flex-row justify-evenly w-11/12 md:w-9/12 mx-auto'>
    <div className='flex flex-wrap w-full md:w-4/12 mx-auto mt-8 gap-x-0 md:gap-x-4'>
            {
                posts.map((d, index) => (
                    <TestCard key={index} d={index} setIndex={setIndex} testid={testid} setFirstIndex={setFirstIndex}
                     setSecondIndex={setSecondIndex} setThirdIndex={setThirdIndex} setFourthIndex={setFourthIndex}/>
                ))
            }
         </div>
         <div className='w-full md:w-5/12 mx-auto'>
                {
                    <div className=' mt-8 '>
                        <div className='font-semibold text-xl'>Question {index + 1}. {posts[index].question}</div>
                        <div className='flex flex-col mt-4 gap-y-4'>
                        <div onClick={() => handleClick(1, index)}>
                        {
                            !firstIndex || localStorage.getItem(index) === 1 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>a. {posts[index].a}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>a. {posts[index].a}</div>)
                        }
                        </div>
                        <div onClick={() => handleClick(2, index)}>
                        {
                            !secondIndex || localStorage.getItem(index) === 2 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>b. {posts[index].b}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>b. {posts[index].b}</div>)
                        }
                        </div>
                        <div onClick={() => handleClick(3, index)}>
                        {
                            !thirdIndex || localStorage.getItem(index) === 3 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>c. {posts[index].c}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>c. {posts[index].c}</div>)
                        }
                        </div>
                        <div onClick={() => handleClick(4, index)}>
                        {
                            !fourthIndex || localStorage.getItem(index) === 4 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>d. {posts[index].d}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>d. {posts[index].d}</div>)
                        }
                        </div>
                        </div>
                        <br/>
                    </div>
                }
                <div className=' flex justify-between mb-6'>
                <div>
                    {
                        index > 0 ? (
                        <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0' onClick={() => handlePrevClick(index)}>Prev</button>
                        ) : (<div></div>)
                    }
                </div>  
                
                    <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0' onClick={() => handleResetClick(index + 1)}>Reset</button>

                
                <div>
                {
                    index < lastIndex - 1 ? (
                    <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0' onClick={() => handleNextClick(index + 2)}>Next</button>
                    ) : 
                    index == lastIndex - 1 ? (
                    <button className=' bg-green-500 text-white px-4 py-2 font-xl rounded-md sm:mb-0' onClick={handleSubmitClick1}>Submit</button>
                    ) : (<div></div>)
                }
                </div>
</div>
                </div>
                </div>

                <ReactModal isOpen={isOpen}
                    contentLabel="Example Modal"
                    onRequestClose={() => setIsOpen(false)} 
                    className='w-11/12 md:w-5/12 mx-auto flex flex-col shadow-lg rounded-lg items-center gap-y-4 p-4 mt-40 bg-gray-300 border-blue-600 border-2'>
                    <div className='flex justify-between text-2xl w-full'>
                        <div className=' text-center font-bold text-blue-600'>Attention!</div>
                        <div onClick={handleClose}><img src="../../images/x.svg" alt="Logo" width={35} loading='lazy'/></div>
                    </div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
                    <div>Are you sure to submit the test now.</div>
                    <div>Click cancel icon to resume the test and click Submit to complete the test</div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
                    <div className='flex justify-end w-full'>
                        <button className=' bg-blue-800 text-white px-8 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-500' onClick={handleSubmitClick}>Submit</button>
                    </div>
                </ReactModal>

                </div>
  )
}

export default TestPage