import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {db} from "../../config/firebase";
import {getDocs, collection, query, where, getDoc, doc, updateDoc} from "firebase/firestore";
import Spinner from '../Spinner';

function LiveTestPage() {

   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);

   const testCollectionRef = collection(db, "livetests");

    const getLiveTest = async () =>
    {
        try
        {
            const data = await getDocs(testCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
            setPosts(filteredData)
        }
        catch(err)
        {

        }
    }

    const handlePublish = async () =>
    {
        try
        {
            const data = await getDocs(testCollectionRef);
            const liveTestDocData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
            const liveTestDoc = doc(db, "livetests", liveTestDocData[0].id);

            await updateDoc(liveTestDoc, {isPublished : true});
        }
        catch(err)
        {

        }
    }
    const handleStart = async () =>
    {
        try
        {
            const data = await getDocs(testCollectionRef);
            const liveTestDocData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
            const liveTestDoc = doc(db, "livetests", liveTestDocData[0].id);

            await updateDoc(liveTestDoc, {isStarted : true});
        }
        catch(err)
        {

        }
    }
    const handleComplete = async () =>
    {
        try
        {
            const data = await getDocs(testCollectionRef);
            const liveTestDocData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
            const liveTestDoc = doc(db, "livetests", liveTestDocData[0].id);

            await updateDoc(liveTestDoc, {isCompleted : true});
        }
        catch(err)
        {

        }
    }

    useEffect(() => {
        getLiveTest();
        window.scroll(0,0);
      }, []);

  return (
    <div className='py-10'>
       <div className='text-3xl font-semibold text-center'>Manage Live Test</div>
       <div className="overflow-hidden mt-10 p-2">
       <table className="w-full sm:w-10/12 mx-auto text-left text-sm font-light">
            <thead className="font-medium ">
                <tr className='bg-blue-300 border-2 border-black text-blue-800 font-semibold text-lg md:text-xl'>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Test Name</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Test Date</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Duration</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Publish</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Start</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Complete</th>
                </tr>
            </thead>
            <tbody>
            {
             loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) : (
              posts !== null && posts.map((p, index) => (
                <tr className="border-2 border-black">
                  <td className="whitespace-wrap text-md text-blue-600 font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.testname}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.date}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.duration}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">
                    <button className='bg-blue-600 rounded-[8px] font-medium text-white px-3 py-2' onClick={handlePublish}>Publish</button>
                  </td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">
                    <button className='bg-blue-600 rounded-[8px] font-medium text-white px-3 py-2' onClick={handleStart}>Start</button>
                  </td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">
                    <button className='bg-blue-600 rounded-[8px] font-medium text-white px-3 py-2' onClick={handleComplete}>Complete</button>
                  </td>
                </tr>
                )))
                } 
           </tbody> 
        </table>
       </div>  
       
    </div>
    
  )
}

export default LiveTestPage