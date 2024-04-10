import React from 'react'
import Card1 from './Card1'

function HomePage1() {
  return (
    <div className='bg-gray-200'>
    <div className='w-full mx-auto bg-white'>
        <h1 className='ml-6 font-semibold'>What are you looking for?</h1>
        <div className='flex flex-wrap justify-evenly mt-10'>
            <Card1 courseName={"Free Courses"} color={"blue"}/>
            <Card1 courseName={"Paid Courses"} color={"purple"}/>
            <Card1 courseName={"Free Test Series"} color={"orange"}/>
            <Card1 courseName={"Paid Test Series"} color={"cyan"}/>
            <Card1 courseName={"Free E-Books"} color={"lightblue"}/>
            <Card1 courseName={"Paid E-Books"} color={"gray"}/>
            <Card1 courseName={"Old Papers"} color={"blue"}/>
            <Card1 courseName={"Books"} color={"green"}/>
        </div>
    </div>

    <div className='bg-white'>
        <h1 className='ml-6 font-semibold mt-2'>Free Content</h1>
        <div className='flex flex-wrap justify-evenly mt-10'>
            <Card1 courseName={"Recorded Videos"} color={"green"}/>
            <Card1 courseName={"Study Material"} color={"gray"}/>
            
        </div>
    </div>
    </div>
  )
}

export default HomePage1