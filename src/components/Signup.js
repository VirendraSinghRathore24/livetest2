import React from 'react'
import Template from "../components/Template"

function Signup({setIsLoggedIn}) {
  return (
    <div className='bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 p-4 md:p-10'>
    <Template
        title="Register"
        image="../images/signup.png"
        formType="signup"
        setIsLoggedIn={setIsLoggedIn}
    />
    </div>
  )
}

export default Signup