import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';

import {db} from "../../config/firebase";
import {getDocs, collection, query, where, getDoc} from "firebase/firestore";
import Spinner from '../Spinner';

function LiveTestResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const score = searchParams.get('score');
    const paper = searchParams.get('paper').replaceAll('%20', ' ');
    const testid = searchParams.get('testid');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const resultid = searchParams.get('resultid');
    const [posts, setPosts] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const [allAns, setAllAns] = useState();

    const [loading, setLoading] = useState(false);

    const testCollectionRef = collection(db, "livetestcurrent");

    async function getAnsList() {
        // Read
        try
        {
            setLoading(true);
            
            var q = query(testCollectionRef, where('resultid', '==', resultid))
    
            const pp = await getDocs(q)
            var productArray = [];
            
            for(var snap of pp.docs)
            {
                var data1 = snap.data();
                console.log(data1)
                productArray.push({...data1});
            }

            const prod = productArray[0].ans;
            setAllAns(prod);
                    
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }
    const handleClick = () =>
    {
        getAnsList();
        setIsDone(true);
    }
    const getData = async () =>
    {
        const testCollectionRef1 = collection(db, "livetests");
        const data = await getDocs(testCollectionRef1);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
        console.log(filteredData)
        setPosts(filteredData[0].problem);
       
    }

    useEffect(() => {
        
        getData();

        // const data1 = testdata.filter((x) => x.testid == testid);
        // setPosts(data1[0].paper);

        window.scroll(0,0);

      }, []);
      
  return (
    <div>
    <p className='text-md font-light p-2 pointer-events-auto'><strong className='font-semibold underline text-blue-600'><NavLink to="/dashboard"> Back to Dashboard </NavLink></strong></p>
        <div className='text-xl flex flex-col items-center my-10 gap-y-1'>
            <div className='text-lg'>You have completed the test</div>
            <div className='text-xl font-bold text-blue-600'>{paper}</div>
            <div className='text-lg text-center p-2'>This test was organized by livetest.com on</div>
            <div className='text-lg text-center font-semibold'>Test Date : {date}</div>
            <div className='text-lg text-center font-semibold'>Time Taken : <span className='text-green-600'>{time} sec</span></div>
            <div className=' text-2xl font-semibold mt-2'>Your Score : <span className='text-blue-600'>{score} %</span></div>
        </div>
        <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-8/12"></div>
        <div className='text-center'>
            <button onClick={handleClick} className='bg-blue-800 text-white px-6 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600'>View Answers</button>
        </div>
        <div className='flex flex-col justify-evenly md:w-5/12 p-4 mx-auto'>
            {
                loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) : (
                isDone && posts != null && posts.length > 0 && posts.map((d, index) => (
                        <div className='mt-8 '>
                        <div className='border-2 p-2'>
                            { 
                                String(allAns[index].resUser) === 'null' ? (<div className='text-blue-600 font-semibold text-xl text-center mb-5'>You have not answered this question</div>)
                                : String(allAns[index].resUser) === String(d.result) ? (<div className='text-green-600 font-semibold text-xl text-center mb-5'>Correct</div>) :
                                (<div className='text-red-600 font-semibold text-xl text-center mb-5'>Wrong Answer</div>)
                            }
                            
                            <div className='font-semibold text-xl'>Question {index + 1}. {d.question}</div>
                             {
                                d.ans == "1" ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>a. {d.a}</div>) :
                                allAns[index].resUser === "1" ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>a. {d.a}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>a. {d.a}</div>)
                             }
                             {
                                d.ans == "2" ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>b. {d.b}</div>) :
                                allAns[index].resUser === "2" ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>b. {d.b}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>b. {d.b}</div>)
                             }
                             {
                                d.ans == "3" ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>c. {d.c}</div>) :
                                allAns[index].resUser === "3" ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>c. {d.c}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>c. {d.c}</div>)
                             }
                             {
                                d.ans == "4" ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>d. {d.d}</div>) :
                                allAns[index].resUser === "4" ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>d. {d.d}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>d. {d.d}</div>)
                             }
                             </div>
                            <br/>
                        </div>
                )))
            }
        </div>
    </div>
  )
}

export default LiveTestResult