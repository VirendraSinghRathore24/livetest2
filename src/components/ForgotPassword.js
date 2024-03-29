import React, { useState } from 'react'

function ForgotPassword() {
    const [isOTPSend, setIsOTPSend] = useState(false);
    const [isOTPValidated, setIsOTPValidated] = useState(false);
    
    const [formData, setFormData] = useState({
        email:"",
        otp:""
    })

    function changeHandler(event){
        setFormData((prevData) =>(
        {
            ...prevData,
            [event.target.name] : event.target.value
        })
        )
    }

    function handleSendOTP(event) 
    {
        event.preventDefault();
      
        setIsOTPSend(true);
    }

  return (
    
    <div className='h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'>
    <div className='text-center text-2xl font-semibold p-8'>Reset Password</div>
    <form onSubmit={handleSendOTP} className='flex flex-col w-4/12 mx-auto gap-y-4 p-2'>
        {
            isOTPSend ? (<label className='w-full'>
            <p className='text-lg md:text-[0.875rem] text-richblack-700 mb-3 leading-[1.375rem]'>Enter OTP<sup className='text-red-600'>*</sup>
            </p>
            <input type="text" id="otp"  required="true" placeholder="Enter OTP" className="bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700" name="otp" value={formData.otp} onChange={changeHandler}/>
            </label>) : (<label className='w-full'>
            <p className='text-lg md:text-[0.875rem] text-richblack-700 mb-3 leading-[1.375rem]'>Email Address<sup className='text-red-600'>*</sup>
            </p>
            <input required type="email" name="email"  placeholder='Enter email address'
                className='bg-richblack-5 rounded-[0.5rem] text-rickblack-5 w-full p-[12px] text-richblack-700' value={formData.email} onChange={changeHandler}
            />
        </label>)
        }
        <div className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 items-center flex justify-center hover:bg-green-500'>
            {
                isOTPSend ? (<button>Validate OTP</button>) 
                          : (<button>Send OTP</button>)
            }
        </div>
        

    </form>
    </div>
  )
}

export default ForgotPassword