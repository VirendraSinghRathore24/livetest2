import React, { useEffect, useState } from 'react'
import testdata from '../data/livetest.json'
import { NavLink, useNavigate } from 'react-router-dom';

function Dashboard() {

   const navigate = useNavigate();
   const [posts, setPosts] = useState([]);
   const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");

        if(currentUser)
        {
          const path = `/dashboard`
          navigate(path);
        }
        else
        {
          navigate('/login');
        }

        const user = localStorage.getItem("currentUser");
        var data = JSON.parse(localStorage.getItem(user + "data"));

        setCurrentUser(user);
        setPosts(data);
        window.scroll(0,0);
      }, []);

  return (
    <div className='py-10'>
       <p className='text-center text-2xl font-semibold text-blue-600'>{currentUser} - Test Dashboard</p>
       <div className="overflow-hidden mt-10 p-2">
       <table className="w-full sm:w-10/12 mx-auto text-left text-sm font-light">
            <thead className="font-medium ">
                <tr className='bg-blue-300 border-2 border-black text-blue-800 font-bold text-xl'>
                  <th scope="col" className="px-1 py-2 border-r-2 text-center">#</th>
                  <th scope="col" className="px-1 py-2  text-center border-r-2 border-black" >Test Name</th>
                  <th scope="col" className="px-1 py-2  text-center border-r-2 border-black" >Test Score</th>
                  <th scope="col" className="px-1 py-2  text-center border-r-2 border-black" >Test Date</th>
                </tr>
            </thead>
            <tbody>
            {
            //loading ? (<div className='ml-10 sm:ml-96 mt-10 sm:mt-20'><Spinner/> </div>) : (
              posts !== null && posts.map((p, index) => (
                <tr className="border-2 border-black">
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2  align-baseline text-center text-wrap ">{index+1}</td>
                  <td className="whitespace-wrap text-md text-blue-600 font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">
                      <NavLink to={`/testresult?testid=${p.testid}&paper=${p.paper}&&score=${p.result}&&date=${p.date}`}>{p.paper}</NavLink>
                  </td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.result} %</td>
                  <td className="whitespace-wrap text-md font-medium px-1 py-2 border-r-2 align-baseline text-center break-all text-wrap border-black">{p.date}</td>
                </tr>
                ))
                } 
           </tbody> 
        </table>
       </div>  
    </div>
  )
}

export default Dashboard