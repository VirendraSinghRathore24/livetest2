import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import testdata from '../data/livetest.json';

function TestResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const score = searchParams.get('score');
    const paper = searchParams.get('paper').replaceAll('%20', ' ');
    const testid = searchParams.get('testid');
    const date = searchParams.get('date');
    const [posts, setPosts] = useState(testdata);

    useEffect(() => {
        window.scroll(0,0);
        const data1 = testdata.filter((x) => x.testid == testid);
        setPosts(data1[0].paper);
        
      }, []);
  return (
    <div>
    <p className='text-md font-light p-2 pointer-events-auto'><strong className='font-semibold underline text-blue-600'><NavLink to="/dashboard"> Back to Dashboard </NavLink></strong></p>
        <div className='text-xl flex flex-col items-center my-10 gap-y-1'>
            <div className='text-lg'>You have completed the test</div>
            <div className='text-xl font-bold text-blue-600'>{paper}</div>
            <div className='text-lg text-center p-2'>This test was organized by livetest.com on</div>
            <div className='text-lg text-center font-semibold'>{date}</div>
            <div className=' text-xl font-semibold mt-2'>Your Score : {score} %</div>
        </div>
        <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-8/12"></div>
        <div className='flex flex-col justify-evenly md:w-5/12 p-4 mx-auto'>
            {
                posts.map((d, index) => (
                        <div className='mt-8 '>
                            <div className='border-2 p-2'>
                            {
                                localStorage.getItem(testid + "#" + (index+1)) == null ? (<div className='text-blue-600 font-semibold text-xl text-center mb-5'>You have not answered this question</div>)
                                : localStorage.getItem(testid + "#" + (index+1)) == d.result ? (<div className='text-green-600 font-semibold text-xl text-center mb-5'>Correct</div>) :
                                (<div className='text-red-600 font-semibold text-xl text-center mb-5'>Wrong Answer</div>)
                            }
                            
                            <div className='font-semibold text-xl'>Question {index + 1}. {d.question}</div>
                             {
                                d.result == 1 ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>a. {d.a}</div>) :
                                localStorage.getItem(testid + "#" + (index+1)) == 1 ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>a. {d.a}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>a. {d.a}</div>)
                             }
                             {
                                d.result == 2 ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>b. {d.b}</div>) :
                                localStorage.getItem(testid + "#" + (index+1)) == 2 ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>b. {d.b}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>b. {d.b}</div>)
                             }
                             {
                                d.result == 3 ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>c. {d.c}</div>) :
                                localStorage.getItem(testid + "#" + (index+1)) == 3 ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>c. {d.c}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>c. {d.c}</div>)
                             }
                             {
                                d.result == 4 ? (<div className='border-2 w-92 p-2 mt-4 bg-green-500'>d. {d.d}</div>) :
                                localStorage.getItem(testid + "#" + (index+1)) == 4 ? (<div className='border-2 w-92 p-2 mt-4 bg-red-500'>d. {d.d}</div>)
                                              : (<div className='border-2 w-92 p-2 mt-4'>d. {d.d}</div>)
                             }
                             </div>
                            <br/>
                        </div>
                ))
            }
        </div>
    </div>
  )
}

export default TestResult