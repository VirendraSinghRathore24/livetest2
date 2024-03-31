import React, { useState } from 'react'
import {db} from "../config/firebase";
import {getDocs, collection, query, where, getDoc, orderBy} from "firebase/firestore";
import Spinner from './Spinner';

function LeaderBoard() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const testCollectionRef = collection(db, "tests");

   const handleClick = async (testid) => {
    // Read
    try
    {
       setLoading(true);
      
        const currentUser = localStorage.getItem("currentUser");
        var q = query(testCollectionRef, orderBy('timeTaken'))

        const pp = await getDocs(q);
        

        var productArray = [];

        for(var snap of pp.docs)
        {
          var data1 = snap.data();
          productArray.push({...data1});
        }
        console.log(productArray);
        setPosts(productArray);
        setLoading(false);
    }
    catch(err){
        console.log(err);
    }
    
}

  return (
    <div className='flex flex-col justify-evenly items-center mt-6 w-full mx-auto'>
        <div className='flex gap-y-12 gap-x-10 items-center mt-8 mb-4 text-lg md:text-2xl'>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(1)}>Reet Paper - Physics</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(2)}>Reet I P - Chemistry</button>
            <button className=' bg-blue-800 text-white px-4 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-600' onClick={() => handleClick(3)}>Reet I - Mathematics</button>
        </div>
        <div className="overflow-hidden mt-8 p-2 w-full">
        {
            loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) 
                    : (<table className="w-full sm:w-10/12 mx-auto text-left text-sm font-light">
            <thead className="font-medium ">
                <tr className='bg-blue-300 border-2 border-black text-blue-800 font-semibold text-lg md:text-xl'>
                  <th scope="col" className="px-1 py-2 border-r-2 text-center">#</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black">Email</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Paper</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Score</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Time Taken</th>
                </tr>
            </thead>
            <tbody>
            {
             loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) : (
              posts !== null && posts.map((p, index) => (
                <tr className="border-2 border-black">
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2  align-baseline text-center text-wrap ">{index+1}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.name.substring(0, p.name.length -4)}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.paper}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.result} %</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.timeTaken} sec</td>
                  
                  
                </tr>
                )))
                } 
           </tbody> 
        </table>)
        }
        
       </div>  
    </div>
  )
}

export default LeaderBoard