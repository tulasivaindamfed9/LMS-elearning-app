import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import SearchBar from '../../Components/Student/SearchBar'
import { useParams } from 'react-router-dom';
import CourseCard from '../../Components/Student/CourseCard';
import { assets } from '../../assets/assets';

const CoursesList = () => {

const {navigate,allCourses}= useContext(AppContext);
const {input}=useParams()

// creating state to store filtered course which is searched in search bar
const [filteredCourse,setFilteredCourse]=useState([])
useEffect(()=>{
   if(allCourses && allCourses.length >0){
    const tempCourses = allCourses.slice(

      input ? 
       setFilteredCourse(allCourses.filter(
        (item)=>(item.courseTitle.toLowerCase().includes(input.toLowerCase()))
      ))
      : setFilteredCourse(allCourses)
    )
    
   } 
   
},[allCourses,input])

  return (
    <>
    <div className='relative md:px-36 px-8 pt-20 text-left'>
      <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
        <div>
        <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
        <p className='text-gray-500'>
          <span className='text-blue-600 cursor-pointer' onClick={()=>navigate("/")}>Home</span> / <span>Course List</span></p>
        </div>

        {/* providing  input(which we get from url) as props in search bar inorder o search data according to the text given */}
      <SearchBar data={input}/>
      </div>

{/* if input i.e. some search keyword eg:python is present then a bow with that keyword and cross img is present and if clicked cross img(onclick) , page should display entire course list */}
{input && <div
className='inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600'>
  <p>{input}</p>
  <img className='coursor-pointer'  src={assets.cross_icon} onClick={()=>navigate("/coursesList")}/>
  </div>}

      {/* displaying courses in another div */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      my-16 gap-3 px-2 md:p-0'>
          {filteredCourse.map((course,index)=>(<CourseCard key={index} course={course}/>))}
      </div>
    </div>
    </>
  )
}

export default CoursesList
