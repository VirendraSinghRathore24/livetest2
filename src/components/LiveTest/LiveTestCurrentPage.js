import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import {db} from "../../config/firebase";
import {collection, addDoc, getDocs, updateDoc, query, where} from "firebase/firestore";
import LiveTestTimer from './LiveTestTimer';
import LiveTestCard from './LiveTestCard';
import { getLiveTests } from './DbResults';

function LiveTestCurrentPage({setHideHeader}) {
  
  const navigate = useNavigate();
  const location = useLocation();

  const testid = location.state.testid;
  const paper = location.state.paper;
  
  const [posts, setPosts] = useState([]);
  const [lastIndex, setLastIndex] = useState(100);
  const [isOpen, setIsOpen] = useState(false);

  const [index, setIndex] = useState(0);
  const [firstIndex, setFirstIndex] = useState(false);
  const [secondIndex, setSecondIndex] = useState(false);
  const [thirdIndex, setThirdIndex] = useState(false);
  const [fourthIndex, setFourthIndex] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [runningMin, setRunningMin] = useState(0);
  const [runningSec, setRunningSec] = useState(0);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(true);
  const [isHindi, setIsHindi] = useState(true);

  const [isExpanded, setExpanded] = useState(false);

  function handleTranslate()
  {
    setIsHindi(!isHindi);
  }
  
  const fetchLiveTestData = () =>
  {
    try
    {
        setLoading(true);

        getLiveTests().then((data) => 
        { 
            return JSON.parse(data);
        }).then((filteredData) => 
        {
            const duration = filteredData[0].duration;
            const time = duration.split(':');
            setMinutes(time[0]);
            setSeconds(time[1]);
    
            setLastIndex(filteredData[0].problem.length);
            setPosts(filteredData[0].problem);    
        }).catch((er) => {
            console.log(er);
        });

        setLoading(false);
    }
    catch(err)
    {

    }
    
  }

  const handlePrevClick = (ind) => {
    //setOpen(true);
    setIndex(index - 1);
    setExpanded(false);
    //window.scroll(0,0);

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
    //setOpen(true);

    localStorage.removeItem(testid + "#" + ind);
        setFirstIndex(false);
        setSecondIndex(false);
        setThirdIndex(false);
        setFourthIndex(false);
  }
  const handleNextClick = (ind) => {
    //setOpen(true);
    setIndex(index + 1);
    setExpanded(false);
    //window.scroll(0,0);

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
    setOpen(true);
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
  }
 
  const handleSubmitClick1 = () =>
  {
    setIsOpen(true);
  }
    const handleClose = () =>
    {
        setIsOpen(false);
    }

  const testCollectionRef = collection(db, "livetestcurrent");
  const testCollectionRef1 = collection(db, "livetestcount");
  const handleSubmitClick = async () =>
  {
    setHideHeader(false);
    var ans = [];
    let c = 0;
    for(var i = 0; i < lastIndex; i++)
    {
        var resUser = localStorage.getItem(testid +"#"+(i + 1));
        var result1 = posts[i].ans;

        console.log("He => " + resUser + " => " + result1)
        if(resUser == result1)
        {
            c = c + 1;
        }

        ans.push({resUser});
    }

    var result = ((c/lastIndex)*100).toFixed(2);
     
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const time = today.toLocaleTimeString();

    var resultid = date + '-' + today.getMilliseconds();

    const totalTime = (minutes * 60) + seconds;
    const runningTime = (runningMin * 60) + runningSec;
    const timeTaken = (totalTime - runningTime);
    
    const user = localStorage.getItem("currentUser");

        try{
             await addDoc(testCollectionRef, {
                name: user, testid : testid, paper : paper, result : result, date:date, time:time, ans:ans, resultid:resultid, timeTaken:timeTaken
            });
        }
        catch(err)
        {
            console.log(err);
        }

        //updateLiveTestCount(user);
        
   
    // console.log("minutes => " + (minutes * 60));
    // console.log("seconds => " + seconds);
    // console.log("runningMin => " + (runningMin * 60));
    // console.log("runningSec => " + runningSec);

    
    //console.log("timeTaken => " + timeTaken);
    

    let path = `/livetestresult`; 

    navigate(path, {state : {testid : testid, paper : paper, score : result, date : date, resultid : resultid}});
  }

  const updateLiveTestCount = async (user) => 
  {
        try
        {
            var data = await getDocs(testCollectionRef1);
            console.log(data.docs.length)

            if(data.docs.length === 0)
            {
                await addDoc(testCollectionRef1, {
                    name : user, livetestcount : 1
                });
            }
            else
            {
                // get all docs
                var q = query(testCollectionRef1, where('name', '==', user));
                const pp = await getDocs(q);
                console.log(q)
                console.log(pp.docs)
                var dd;
                for(var snap of pp.docs)
                {
                    dd = snap.data();
                }

                console.log("ayya")

                await updateDoc(dd, {
                    livetestcount : 10
                });
                
                // check if user exist

            }
       
        }
        catch(err)
        {
            console.log(err);
        }
  }
  const handleBack = () =>
  {
    navigate('/')
  }

  useEffect(() => {
    for(var i = 0; i <= lastIndex; i++)
    {
        localStorage.removeItem(testid +"#"+ (i+1))
    }
    //completedTestTime();

    fetchLiveTestData();
    
    setHideHeader(true);
    window.scroll(0,0);
    
  }, []);
  
  return (
    <div className=''>
    <div className='w-full mx-auto top-0 fixed'>
    <div className='flex justify-between shadow-lg bg-blue-200 p-2'>
        <div className='flex justify-left mt-1 w-20'><LiveTestTimer testid={testid} paper={paper} lastIndex={lastIndex} posts={posts} setRunningMin={setRunningMin} setRunningSec={setRunningSec} totalMinutes={minutes} totalSeconds={seconds} setHideHeader={setHideHeader}/></div>
        <div className='text-lg md:text-xl mt-1 '> Ques: {index+1}/{lastIndex}</div>
        <div className="relative max-md:hidden" onClick={handleTranslate}>
            <img src="../../images/translate.svg" width={35} alt="Logo" loading='lazy'/>
        </div>
        <button className='bg-green-500 text-white px-4 py-2 text-md rounded-md sm:mb-0' onClick={handleSubmitClick1}>Submit</button>
    </div>
    {/* <div className='flex justify-end mt-2 md:px-4'><button className='bg-blue-600 text-white px-4 py-2 text-md rounded-md sm:mb-0 hover:scale-110 transition duration-300 ease-in hover:bg-green-500' onClick={handleSubmitClick1}>N</button></div> */}
    <div className="flex items-center justify-between md:hidden w-full bg-gray-100 mx-auto">
    <div className='p-2 text-xl font-semibold text-blue-600' onClick={handleBack}>Back</div>
    <div className="relative md:hidden" onClick={handleTranslate}>
            <img src="../../images/translate.svg" width={35} alt="Logo" loading='lazy'/>
    </div>
    <div>
              {
                open ? (
                <div className="relative flex h-[52px] w-[66px] cursor-pointer flex-col items-end justify-between mr-2 md:hidden" onClick={() => setOpen(false)}>
                    <img src="../../images/expand_down.svg" alt="Logo" width={45} loading='lazy'/>
                </div>) : (
                <div className="relative flex h-[52px] w-[66px] cursor-pointer flex-col items-end justify-between mr-2  md:hidden" onClick={() => setOpen(true)}>
                <img src="../../images/expand_up.svg" alt="Logo" width={45} loading='lazy'/>
                </div>
                )
              }
              </div>
              </div>
              <div>
                {
                    !open ? (
                    <div className="absolute left-12 right-0 bg-gray-100 pt-[2vh] pb-[3vh] md:hidden pointer-events-auto 
                    visible">
     
                <div className='flex flex-wrap w-full md:w-4/12 mx-auto gap-x-0 md:gap-x-4 justify-center'>
                {
                    posts.map((d, index) => (
                        <LiveTestCard key={index} d={index} setIndex={setIndex} testid={testid} setFirstIndex={setFirstIndex}
                     setSecondIndex={setSecondIndex} setThirdIndex={setThirdIndex} setFourthIndex={setFourthIndex} setOpen={setOpen} setExpanded={setExpanded}/>
                    ))
                }
            </div>
                    </div>) : (<div></div>)
                }
              </div>
              
              </div>
         <div className='flex flex-col md:flex-row justify-evenly w-11/12 md:w-9/12 mx-auto'>
         <div className='flex flex-wrap w-full md:w-5/12 mx-auto mt-28 gap-x-0 md:gap-x-4 max-md:hidden'>
            {
                posts.map((d, index) => (
                    <LiveTestCard key={index} d={index} setIndex={setIndex} testid={testid} setFirstIndex={setFirstIndex}
                     setSecondIndex={setSecondIndex} setThirdIndex={setThirdIndex} setFourthIndex={setFourthIndex} setOpen={setOpen} setExpanded={setExpanded}/>
                ))
            }
         </div>
         <div className='w-full md:w-5/12 mx-auto mb-20 mt-32'>
         <div>
            {
                isHindi ? ( <div>
                {
                    posts != null && posts.length > 0 && !loading ? (
                    <div className=''>
                        {
                           posts[index].desc ? ( <div onClick={() => setExpanded(!isExpanded)}>
                           <div className='flex justify-center mb-4 cursor-pointer'>
                           {
                            isExpanded ? (
                                <div className='flex text-blue-600 font-semibold'>
                                    <div>Show Description </div>
                                    <img  src="../../images/down-arrow.svg" alt="Logo" width={28} loading='lazy'/>
                                </div>) 
                                : (<div className=''>
                                    <div className=''>
                                    {
                                        !isExpanded ? (<div className='text-md mb-4'><span className='font-semibold'>Description :</span> {posts[index].desc}</div>) : (<div></div>)
                                    }
                                    </div>
                                    <div className='flex justify-center mb-4 cursor-pointer'>
                                        <div className='flex text-blue-600 font-semibold'>Hide Description</div>
                                        <img src="../../images/up-arrow.svg" alt="Logo" width={28} loading='lazy'/>
                                    </div>
                                </div>)
                            }
                            </div>
                            {/* <div>
                            {
                            !isExpanded ? (<div className='text-lg mb-4'><span className='font-semibold'>Description :</span> {posts[index].desc}</div>) : (<div></div>)
                            }
                            </div> */}
                            
                        </div>) : (<div></div>)
                        }
                       
                    
                       
                        <div className='font-semibold text-lg'>{posts[index].question}</div>
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
                    </div>) : (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>)   
                }
                </div>) : ( <div>
                {
                    posts != null && posts.length > 0 && !loading ? (
                    <div>
                    {
                           posts[index].descHindi ? ( <div onClick={() => setExpanded(!isExpanded)}>
                           <div className='flex justify-center mb-4 cursor-pointer'>
                           {
                            isExpanded ? (
                                <div className='flex text-blue-600 font-semibold'>
                                    <div>Show Description</div>
                                    <img  src="../../images/down-arrow.svg" alt="Logo" width={28} loading='lazy'/>
                                </div>) 
                                : (<div className='flex text-blue-600 font-semibold'>
                                    <div>Hide Description</div>
                                    <img src="../../images/up-arrow.svg" alt="Logo" width={28} loading='lazy'/>
                                </div>)
                            }
                            </div>
                            <div>
                            {
                            !isExpanded ? (<div className='text-lg mb-4'><span className='font-semibold'>Description :</span> {posts[index].descHindi}</div>) : (<div></div>)
                            }
                            </div>
                            
                        </div>) : (<div></div>)
                        }
                        <div className='font-semibold text-xl'>{posts[index].questionHindi}</div>
                        <div className='flex flex-col mt-4 gap-y-4'>
                        <div onClick={() => handleClick(1, index)}>
                        {
                            !firstIndex || localStorage.getItem(index) === 1 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>a. {posts[index].aHindi}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>a. {posts[index].aHindi}</div>)
                        }
                        </div>
                        <div onClick={() => handleClick(2, index)}>
                        {
                            !secondIndex || localStorage.getItem(index) === 2 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>b. {posts[index].bHindi}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>b. {posts[index].bHindi}</div>)
                        }
                        </div>
                        <div onClick={() => handleClick(3, index)}>
                        {
                            !thirdIndex || localStorage.getItem(index) === 3 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>c. {posts[index].cHindi}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>c. {posts[index].cHindi}</div>)
                        }
                        </div>
                        <div onClick={() => handleClick(4, index)}>
                        {
                            !fourthIndex || localStorage.getItem(index) === 4 ? (
                                <div className='border-2 w-92 p-2 hover:bg-indigo-300 cursor-pointer'>d. {posts[index].dHindi}</div>
                            ) : (<div className='border-2 w-92 p-2 bg-green-300 cursor-pointer'>d. {posts[index].dHindi}</div>)
                        }
                        </div>
                        </div>
                        <br/>
                    </div>) : (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>)   
                }
                </div>)
            }
         </div>
           
                <div className=' flex justify-between mb-6 max-md:hidden'>
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
               
                <div className="flex justify-between w-full mx-auto bottom-0 p-2 bg-gray-100 shadow-lg fixed md:hidden ">
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

export default LiveTestCurrentPage