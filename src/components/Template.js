import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import {FcGoogle} from "react-icons/fc"
import {auth, googleProvider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Template(props) {

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider)
        localStorage.setItem("currentUser", auth?.currentUser?.email);
        navigate('/');
    }
    catch(err){
        console.log(err);
    }
};
  return (
    <div className='flex justify-between w-full md:w-11/12 mx-auto mt-2 '>
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-700 font-semibold text-[1.875rem] leading-[2.375rem]'>{props.title}</h1>
            
           {props.formType === "signup" 
           ? (<SignupForm setIsLoggedIn={props.setIsLoggedIn}/>)
           : (<LoginForm setIsLoggedIn={props.setIsLoggedIn}/>)}
           <div className='flex w-full items-center my-4 gap-x-2'>
            <div className='w-full h-[1px] bg-richblack-700'></div>
            <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
            <div className='w-full h-[1px] bg-richblack-700'></div>
           </div>

           <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-700 border border-richblack-700
            px-[12px] py-[8px] gap-x-2 mt-6 hover:bg-yellow-300' onClick={signInWithGoogle}>
           <FcGoogle/>
            <p>Sign in with Google</p>
           </button>
        </div>
        <div className='w-11/12 max-w-[450px] mt-10 relative hidden lg:block'>
            <img src="../images/frame.png" alt="Pattern" width={558} height={504} loading="lazy" />
            <img className='absolute -top-4 right-4' src={props.image} alt="Students" width={558} height={490} loading="lazy" />
        </div>
    </div>
  )
}

export default Template