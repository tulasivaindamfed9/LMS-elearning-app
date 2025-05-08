import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext=createContext();

export const AppContextProvider=(props)=>{
 
  const currency=import.meta.env.VITE_CURRENCY

  const navigate=useNavigate();

  // creating state variable for educator
  const [isEducator,setIsEducator]=useState(true); 

  // we will save all dummy courses in assets.jsx in allCourses state in the AppContext.jsx
  const [allCourses, setAllCourses]=useState([])
  
  // Fetch all courses
  const fetchAllCourses = async() =>{
       setAllCourses(dummyCourses);
  }

  // function to calculate avg rating of the course
  const calculateRating=(course) =>{
    if(course.courseRatings.length === 0){
      return 0;
    }
     
    let totalRating=0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length
  }

  useEffect(()=>{
    
     fetchAllCourses();
  },[])


// function to calculate course chapter time
const calculateChapterTime =(chapter)=>{
 let time=0;
 chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration)) //here duration is in min, so to convert to hr,min we use humanised duration which is already imported
 return humanizeDuration(time * 60 *1000, {units: ["h", "m"]})
//  here we multiply time*60*1000 because humanize duration reads the time in milliseconds to convert to hr and min
}

// function to calculate course duration
const calculateCourseDuration = (course) =>{
  let time=0;
  course.courseContent.map((chapter) => 
  chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
  return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
}

// function to calculate no. of lectures in the course
const calculateNoOfLectures =(course) =>{
 let totalLectures=0;
 course.courseContent.forEach(chapter =>{
  if(Array.isArray(chapter.chapterContent)){
    totalLectures += chapter.chapterContent.length
  }
 })
  return totalLectures;
}

    const value={
      //  to access the currency varibale in our entire app we mentio it in value
      currency,
      // adding allCourses in value to access anywhere in our project
      allCourses,
      navigate,
      calculateRating,
      isEducator, setIsEducator,
      calculateChapterTime,
      calculateCourseDuration,
      calculateNoOfLectures
    }
  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}