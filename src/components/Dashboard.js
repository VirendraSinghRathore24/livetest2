import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {db} from "../config/firebase";
import {getDocs, collection, query, where, getDoc} from "firebase/firestore";
import Spinner from './Spinner';

function Dashboard() {

   const navigate = useNavigate();
   const [posts, setPosts] = useState([]);
   const [currentUser, setCurrentUser] = useState('');
   const [email, setEmail] = useState('');
   const [loading, setLoading] = useState(false);

   const [isLeader, setIsLeader] = useState(false);

   const testCollectionRef = collection(db, "tests");

   const getTestList = async () => {
    // Read
    try
    {
       setLoading(true);
       setIsLeader(false);
        const currentUser = localStorage.getItem("currentUser");
        var q = query(testCollectionRef,where('name', '==', (currentUser + "data") ))

        const pp = await getDocs(q);

        var productArray = [];

        for(var snap of pp.docs)
        {
          var data1 = snap.data();
          productArray.push({...data1});
        }
        setPosts(productArray);
        setLoading(false);
    }
    catch(err){
        console.log(err);
    }
    
}

const handleLeaderBoard = async () =>
{
  try
  {
    setIsLeader(true);
    const data = await getDocs(testCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
    setPosts(filteredData)
  }
  catch(err)
  {

  }
}
    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        setEmail(currentUser);
        getTestList();

        const user = localStorage.getItem("currentUser");

        setCurrentUser(user);

        window.scroll(0,0);
      }, []);

  return (
    <div className='py-10'>
    <div>
      {
        isLeader ? (<div onClick={getTestList} className='text-green-600 underline text-xl text-end mr-10 font-bold cursor-pointer'>Your Dashboard</div>)
                 : (<div onClick={handleLeaderBoard} className='text-green-600 underline text-xl text-end mr-10 font-bold cursor-pointer'>Leader Board</div>)
      }
    </div>
       
       <div>
        {
          isLeader ? (<p className='text-center text-2xl font-semibold text-blue-600'>Leader Dashboard</p>)
                   : (<p className='text-center text-2xl font-semibold text-blue-600'>{currentUser} - Test Dashboard</p>)
        }
       </div>
       
       <div className="overflow-hidden mt-10 p-2">
       <table className="w-full sm:w-10/12 mx-auto text-left text-sm font-light">
            <thead className="font-medium ">
                <tr className='bg-blue-300 border-2 border-black text-blue-800 font-semibold text-lg md:text-xl'>
                  <th scope="col" className="px-1 py-2 border-r-2 text-center">#</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Test Name</th>
                  <th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Test Score</th>
                  {
                    isLeader ? (<th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Name</th>)
                             : (<th scope="col" className="px-1 py-2 text-center border-r-2 border-black" >Test Date</th>)
                  }
                  
                </tr>
            </thead>
            <tbody>
            {
             loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) : (
              posts !== null && posts.map((p, index) => (
                <tr className="border-2 border-black">
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2  align-baseline text-center text-wrap ">{index+1}</td>
                  <td className="whitespace-wrap text-md text-blue-600 font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">
                      <NavLink to={`/testresult?testid=${p.testid}&paper=${p.paper}&&score=${p.result}&&date=${p.date}&&resultid=${p.resultid}`}>{p.paper}</NavLink>
                  </td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.result} %</td>
                  {
                    isLeader ? (<td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.name.substring(0, p.name.length -4)}</td>)
                             : (<td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.date}</td>)
                  }
                  
                </tr>
                )))
                } 
           </tbody> 
        </table>
       </div>  
    </div>
  )
}

export default Dashboard