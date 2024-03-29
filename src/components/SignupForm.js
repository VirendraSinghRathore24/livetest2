import React from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {useState} from "react"
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../baseUrl';
import ReactModal from 'react-modal';
import bcrypt from 'bcryptjs';


function SignupForm({setIsLoggedIn}) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"", email:"", password:"", otp:""
    })
    const [accountType, setAccountType] = useState("student");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const [invalidOTP, setInvalidOTP] = useState(false);

    function changeHandler(event){
        setFormData((prevData) =>(
        {
            ...prevData,
            [event.target.name] : event.target.value
        })
        )
    }
        function submitHandler(event)
        {
            event.preventDefault();

            axios.get(`${baseUrl}/getuser`, {params:formData})
            .then(function(response)
            {
                if(response.data.userExists)
                {
                    //user already registered
                    setUserAlreadyExists(true);
                }
                else
                {
                    const postData = new FormData();
                    postData.append('name', formData.name);
                    postData.append('email', formData.email);
                    //postData.append('password', formData.password);
                       

                    axios.post(`${baseUrl}/sendemail`, formData)

                    setInvalidOTP(false);
                    setIsOpen(true);
                }
            });
        }

        const handleSubmitClick = () =>
        {
            axios.get(`${baseUrl}/getotp`, {params:formData})
            .then(function(response)
            {
                if(response.data.otp == formData.otp)
                {
                    // Register new user
                    const hashedPassword = bcrypt.hashSync(formData.password, 10) 
                    axios.post(`${baseUrl}/signup`, {data:formData, pass:hashedPassword})
                    .then(function(response)
                    {
                        if(response.data.message === 'User Added Successfully')
                        {
                            toast.success("User Added Successfully !!!");

                            // also add login
                            localStorage.setItem("currentUser", formData.email);

                            navigate('/')      
                        }
                        else
                        {
                            // Error while creating account
                            toast.error("Error while creating account !!!");
                        }
                        setIsOpen(false);
                    });
                }
                else
                {
                    setInvalidOTP(true);
                }
            });

            //setIsOpen(true);
        }
            const handleClose = () =>
            {
                setIsOpen(false);
            }
  return (
    <div className='w-full mx-auto'>
       <div>
        {
            userAlreadyExists ? (<div className='text-lg text-red-500'>User Already Exists, Please <Link to={'/login'} className='underline text-blue-600'>Login</Link></div>) : (<div></div>)
        }
       </div>
    
        <form onSubmit={submitHandler}>
            <div className='flex justify-between gap-x-4 mt-[20px]'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-700 mb-1 leading-[1.375rem]'>Name<sup className='text-red-600'>*</sup></p>
                    <input 
                        required
                        type="text"
                        name="name"
                        onChange={changeHandler}
                        placeholder='Enter name'
                        value={formData.name}
                        className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'
                        />
                </label>

            </div>
            <div className='mt-[20px]'>
            <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-700 mb-1 leading-[1.375rem]'>Email Address<sup className='text-red-600'>*</sup></p>
                    <input 
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder='Enter email address'
                        value={formData.email}
                        className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'
                        />
            </label>
            </div>
            
            <div className='flex justify-between gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-700 mb-1 leading-[1.375rem]'>Create Password<sup className='text-red-600'>*</sup></p>
                    <input 
                        required
                        type={showPassword ? ("text") :("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder='Enter password'
                        value={formData.password}
                        className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'
                        />
                         <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                </label>

                {/* <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-700 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input 
                        required
                        type={showConfirmPassword ? ("text") :("password")}
                        name="confirmpassword"
                        onChange={changeHandler}
                        placeholder='Confrim Password'
                        value={formData.confirmpassword}
                        className='bg-richblack-5 rounded-[0.5rem] text-rickblack-700 w-full p-[12px]'
                        />
                         <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                </label> */}
            </div>
            <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full'>
                Create Account
            </button>
        </form>
        <ReactModal isOpen={isOpen}
                    contentLabel="Example Modal"
                    onRequestClose={() => setIsOpen(false)} 
                    className='w-11/12 md:w-4/12 mx-auto flex flex-col shadow-xl rounded-lg items-center gap-y-4 p-4 mt-40  border-blue-600 border-2'>
                    <div className='flex justify-between text-lg w-full'>
                        <div className=' text-center '>Please enter OTP which sent on registered email</div>
                        
                        <div onClick={handleClose}><img src="../../images/x.svg" alt="Logo" width={35} loading='lazy'/></div>
                    </div>
                        <div>
                            {
                                invalidOTP ? (<div className='text-lg text-red-500'>Please enter valid OTP</div>) : (<div></div>)
                            }
                        </div>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
                    <input type="text" id="otp"  required="true" placeholder="Enter OTP" value={formData.otp} onChange={changeHandler} className="p-2 rounded-lg border-2 border-blue-600" name="otp"/>
                    <div class="flex items-center mx-auto text-center border-t border-brColor pt-4 w-full"></div>
                    <div className='flex justify-end w-full '>
                        <button className=' bg-blue-800 text-white px-8 py-2 font-xl rounded-md sm:mb-0 hover:bg-green-500' onClick={handleSubmitClick}>Submit</button>
                    </div>
                </ReactModal>
    </div>
  )
}

export default SignupForm