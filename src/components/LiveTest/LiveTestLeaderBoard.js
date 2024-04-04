import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import {db} from "../../config/firebase";
import {collection, getDocs} from "firebase/firestore";

function LiveTestLeaderBoard() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [paper, setPaper] = useState('');
    const [date, setDate] = useState('');

    const testCollectionRef = collection(db, "livetestcurrent");
    const fetchResult = async () => {
        const data = await getDocs(testCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));

        console.log(filteredData);
        setPaper(filteredData[0].paper);
        setDate(filteredData[0].date);

        var res = filteredData.sort((a, b) => (a.result === b.result) ? (a.timeTaken - b.timeTaken) : (b.result - a.result));

        setPosts(res);
    }

    useEffect(() => {
        fetchResult();
        window.scroll(0,0);
    }, [])

  return (
    <div className='flex flex-col justify-evenly items-center mt-6 w-full mx-auto'>
        <div className='flex gap-y-12 gap-x-10 items-center mt-8 mb-4 text-4xl text-blue-600 font-bold'>
            {paper} Result
        </div>
        <div className='text-lg'>Test Date : {date}</div>
        <div className="overflow-hidden mt-8 p-2 w-full">
        {
            loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) 
                    : (<table className="w-full sm:w-10/12 mx-auto text-left text-sm font-light">
            <thead className="font-medium ">
                <tr className='bg-blue-300 border-2 border-black text-blue-800 font-semibold text-lg md:text-xl'>
                  <th scope="col" className="px-1 py-2 border-r-2 text-center">Rank</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black">Email</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Score</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Time Taken</th>
                </tr>
            </thead>
            <tbody>
            {
             loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) : (
              posts !== null && posts.length > 0 && posts.map((p, index) => (
                <tr className="border-2 border-black">
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2  align-baseline text-center text-wrap ">{index+1}</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.name}</td>
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

export default LiveTestLeaderBoard