import React from 'react'
import {useState} from "react"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom/dist"
import {toast} from "react-hot-toast"
import axios from 'axios';
import baseUrl from '../baseUrl';
import ReactModal from 'react-modal';
import bcrypt from 'bcryptjs';

function LoginForm({setIsLoggedIn}) {
    const [message, setMessage] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [invalidOTP, setInvalidOTP] = useState(false);
    const [isOTPSend, setIsOTPSend] = useState(false);
    const [isOTPVerified, setIsOTPVerified] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"", password:"", otp:""
    })
    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event){
        setFormData((prevData) =>(
        {
            ...prevData,
            [event.target.name] : event.target.value
        })
        )
    }

    function submitHandler(event){
        event.preventDefault();
        //setIsLoggedIn(true);

        const postData = new FormData();
        postData.append('email', formData.email);
        postData.append('password', formData.password);

        const hashedPassword = bcrypt.hashSync(formData.password, 10) 

        axios.post(`${baseUrl}/login`, {data:formData, password:hashedPassword}).then(function(response)
        {
            if(response.data.message == 'User logged in successfully')
            {
                toast.success("Logged in successfully !!!");
                localStorage.setItem("currentUser", formData.email);
                console.log(localStorage.getItem("currentUser"))
                navigate('/')
            }
            else
            {
                setMessage(response.data.message);
            }
        });
    }

    function handleForgotPassword(event) 
    {
        event.preventDefault();
        setIsOTPSend(false);
        setIsOTPVerified(false);
        setIsOpen(true);
    }
    function handleClose()
    {
        setIsOpen(false);
    }
    function handleSendOTP()
    {
        setIsOTPSend(true);
    }
    function handleVerifyOTP()
    {
        console.log('virennn');
        setIsOTPSend(false);
        setIsOTPVerified(true);
    }
    function handleChangePassword()
    {
        handleClose();
        toast.success("Password changed successfully !!!");
    }

  return (
    <div>
    <form onSubmit={submitHandler} className='flex flex-col w-full mx-auto gap-y-4 mt-5'>
        <div>
        {
            message ? (<div className='text-lg text-red-500'>Please enter correct username and password !!!</div>) : (<div></div>)
        }</div>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-700 mb-1 leading-[1.375rem]'>Email Address<sup className='text-red-600'>*</sup>
            </p>
            <input required type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Enter email address'
                className='bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-700 mb-1 leading-[1.375rem]'>Password<sup className='text-red-600'>*</sup>
            </p>
            <input 
                required 
                type={showPassword ? ("text") : ("password")}
                name="password" 
                value={formData.password} 
                onChange={changeHandler} 
                placeholder='Enter password'
                className='bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700'
                />

                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span> 

                <div className='flex justify-between'>
                    <p className='text-sm md:text-md mt-1 text-blue-500 max-w-max'>Don't have an account? <Link to="/signup" className='underline'>Register</Link></p>
                    <button onClick={handleForgotPassword}>
                        <p className='text-sm md:text-md mt-1 text-blue-500  max-w-max ml-auto'>
                            Forgot Password
                        </p>
                    </button>
                </div>
        </label>
        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 items-center flex justify-center hover:bg-green-500'>
            <button >
                Sign In
            </button>
        </button>

    </form>
    
    <ReactModal isOpen={isOpen}
                    contentLabel="Example Modal"
                    onRequestClose={() => setIsOpen(false)} 
                    className='w-11/12 md:w-4/12 mx-auto flex flex-col shadow-xl rounded-lg items-center gap-y-4 p-4 mt-40  border-blue-600 border-2'>
                    <div className='flex justify-between text-lg w-full'>
                    <div className='text-center text-2xl font-semibold '>Reset Password</div>
                        
                        <div onClick={handleClose}><img src="../../images/x.svg" alt="Logo" width={35} loading='lazy'/></div>
                    </div>
                        {/* <div>
                            {
                                invalidOTP ? (<div className='text-lg text-red-500'>Please enter valid OTP</div>) : (<div></div>)
                            }
                        </div> */}
                    <div className='w-full'>
                        {
                            isOTPSend ? (<label className='w-full'>
                                        <p className='text-lg md:text-[0.875rem] text-richblack-700 mb-3 leading-[1.375rem]'>Enter OTP<sup className='text-red-600'>*</sup></p>
                                        <input type="text" id="otp"  required="true" placeholder="Enter OTP" className="bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700" name="otp" value={formData.otp} onChange={changeHandler}/>
                                        </label>) 
                                        : 
                            isOTPVerified ? (<label className='w-full'>
                                            <p className='text-lg md:text-[0.875rem] text-richblack-700 mb-3 leading-[1.375rem]'>Password<sup className='text-red-600'>*</sup></p>
                                            <input required type="password" name="password"  placeholder='Enter new password' className='bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700' value={formData.password} onChange={changeHandler}/>
                                            </label>) 
                                          : (<label className='w-full'>
                                            <p className='text-lg md:text-[0.875rem] text-richblack-700 mb-3 leading-[1.375rem]'>Email Address<sup className='text-red-600'>*</sup></p>
                                            <input required type="email" name="email"  placeholder='Enter email address' className='bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700' value={formData.email} onChange={changeHandler}/>
                                            </label>)
                        }
                    </div>
                    <div className='flex justify-center w-full mx-auto bg-blue-800 text-white py-2 font-xl rounded-md sm:mb-0 hover:bg-green-500'>
                    {
                        isOTPSend ? (<button className='w-full' onClick={handleVerifyOTP}>Verify OTP</button>) :
                        isOTPVerified ? (<button className='w-full' onClick={handleChangePassword}>Change Password</button>)
                                  : <button className='w-full' onClick={handleSendOTP}>Send OTP</button>
                    }
                        
                    </div>
                </ReactModal>
    </div>
  )
}

export default LoginForm