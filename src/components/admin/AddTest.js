import React, { useEffect, useState } from 'react';
import {db} from "../../config/firebase";
import {collection, addDoc, doc, updateDoc, getDocs} from "firebase/firestore";

function AddTest() {

    const [added, setAdded] = useState(false);
    const [testList, setTestList] = useState([]);

    const [formData, setFormData] = useState({
        testname:"", duration:"", testdate:"", question:"", 
        a:"", b:"", c:"", d:"", ans:""
    })

    const testCollectionRef = collection(db, "livetests");

    function changeHandler(event){
        setFormData((prevData) =>(
        {
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }

    const getTestList = async () => {
        // Read
        try
        {
            const data = await getDocs(testCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
           
            setTestList(filteredData[0].problem);

        }
        catch(err){
            console.log(err);
        }
        
    }

    const handleSubmit = async (event) =>
        {
            event.preventDefault();

            try
            {
                const data = await getDocs(testCollectionRef);
                const liveTestDocData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
 
                if(liveTestDocData.length === 0)
                {
                    await addDoc(testCollectionRef, {
                        testname: formData.testname, duration : formData.duration, 
                        isPublished:false, isStarted:false, isCompleted:false, date:formData.testdate
                    });
                }
                setAdded(true);
            }
            catch(err)
            {
                console.log(err);
            }
        }

        const handleSubmit2 = async (event) =>
        {
            event.preventDefault();

            try
            {
                const data = await getDocs(testCollectionRef);
                const liveTestDocData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
                const liveTestDoc = doc(db, "livetests", liveTestDocData[0].id);

                let problem = liveTestDocData[0].problem !== undefined ? liveTestDocData[0].problem : [];
                problem.push({question:formData.question, a:formData.a, b:formData.b, c:formData.c, d:formData.d, ans:formData.ans})

                await updateDoc(liveTestDoc, {
                    problem:problem
                });
                
                getTestList();

                setFormData({
                    question : "",
                    a : "",
                    b : "",
                    c : "",
                    d : "",
                    ans: ""
                  })

            }
            catch(err)
            {
                console.log(err);
            }
        }

        const editQuestion = () =>
        {

        }

        useEffect(() => {
            window.scroll(0,0);
          }, []);

  return (
    <div>
    {
        !added ? 
        (
        <div className='flex justify-between w-11/12 mx-auto'>
            <form onSubmit={handleSubmit2}>
                <div className='flex flex-col justify-center w-full md:justify-between md:w-11/12 mx-auto'>
                    <div className='flex justify-between gap-x-4 mt-[20px] border-2 w-full mx-auto'>
                            <label className='w-full'>
                                <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Question<sup className='text-red-600'>*</sup></p>
                                <input required type="text" name="question" onChange={changeHandler} placeholder='Enter question' value={formData.question}
                                    className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 p-[12px]'/>
                            </label>
                    </div>
                    <div className='flex justify-between gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Option a<sup className='text-red-600'>*</sup></p>
                                <input required type="text" name="a" onChange={changeHandler} placeholder='Enter option a' value={formData.a}
                                    className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                            </label>
                    </div>
                    <div className='flex justify-between gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Option b<sup className='text-red-600'>*</sup></p>
                                <input required type="text" name="b" onChange={changeHandler} placeholder='Enter option b' value={formData.b}
                                    className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                            </label>
                    </div>
                    <div className='flex justify-between gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Option c<sup className='text-red-600'>*</sup></p>
                                <input required type="text" name="c" onChange={changeHandler} placeholder='Enter option c' value={formData.c}
                                    className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                            </label>
                    </div>
                    <div className='flex justify-between gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Option d<sup className='text-red-600'>*</sup></p>
                                <input required type="text" name="d" onChange={changeHandler} placeholder='Enter option d' value={formData.d}
                                    className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                            </label>
                    </div>
                    <div className='flex justify-between gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Correct Answer<sup className='text-red-600'>*</sup></p>
                                <input required type="text" name="ans" onChange={changeHandler} placeholder='Enter correct ans' value={formData.ans}
                                    className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                            </label>
                    </div>
                    <button className='bg-yellow-200 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full'> Submit </button>
                </div>
            </form>
            
            <div>
            {
                    testList.map((m, index) => (
                        <div className='flex justify-left gap-x-4 mt-4'>
                            <h1>{index+1}.</h1>
                            <div>{m.question}</div>
                            <div className='text-blue-600 underline font-xl rounded-md sm:mb-0 cursor-pointer' onClick={() => editQuestion(m.id)}>Edit</div>
                        </div>
                    ))
                }
            </div>
        </div>
        ) : 
        (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center w-full md:justify-between md:w-4/12 mt-10 mx-auto'>
                <div className='flex justify-between gap-x-4 mt-[20px]'>
                        <label className='w-full'>
                            <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Test Name<sup className='text-red-600'>*</sup></p>
                            <input required type="text" name="testname" onChange={changeHandler} placeholder='Enter test name' value={formData.testname}
                                className='bg-richblack-5 rounded-[0.5rem] border-blue-400 border-1 text-rickblack-700 w-full p-[12px]'/>
                        </label>
                </div>
                <div className='flex justify-between gap-x-4 mt-[20px]'>
                        <label className='w-full'>
                            <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Duration<sup className='text-red-600'>*</sup></p>
                            <input required type="text" name="duration" onChange={changeHandler} placeholder='Enter test duration' value={formData.duration}
                                className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                        </label>
                </div>
                <div className='flex justify-between gap-x-4 mt-[20px]'>
                        <label className='w-full'>
                            <p className='text-xl text-richblack-700 mb-1 leading-[1.375rem]'>Test Date<sup className='text-red-600'>*</sup></p>
                            <input required type="date" name="testdate" onChange={changeHandler} placeholder='Enter test date' value={formData.testdate}
                                className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'/>
                        </label>
                </div>
                <button className='bg-yellow-200 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full'> Continue </button>
            </div>
        </form>
        )
    }
    </div>
  )
}

export default AddTest