import React from 'react'
import {BrowserRouter, Routes, Route, useMatch} from "react-router-dom";
import Home from "./Pages/Student/Home";
import Courseslist from "./Pages/Student/CoursesList";
import CourseDetails from "./Pages/Student/CourseDetails";
import MyEnrollments from "./Pages/Student/MyEnrollments";
import Player from "./Pages/Student/Player";
import Loading from "./Components/Student/Loading";
import Educator from "./Pages/Educator/Educator";
import Dashboard from "./Pages/Educator/Dashboard";
import AddCourse from "./Pages/Educator/AddCourse";
import MyCourses from "./Pages/Educator/MyCourses";
import StudentsEnrolled from "./Pages/Educator/StudentsEnrolled";
import Navbar from './Components/Student/Navbar';

const App = () => {
  // as the nav bar is diff for educator and student , we are showing diff navbar for educator and student
  const isEducatorRoute=useMatch("/educator/*")
  return (
    <div className='text-default min-h-screen bg-white'>
     
      {/*  if student pages the  below navbar will display */}
      {!isEducatorRoute && <Navbar />}
      
      <Routes>
        {/* routes for pages- student */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/coursesList" element={<Courseslist />} />
        <Route path="/coursesList/:input" element={<Courseslist />} /> //based on different keywords(input from user) we display the courses
        <Route path="/course/:id" element={<CourseDetails />} />  //generating diff id 's for different courses'
        <Route path="/myEnrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />  //play the course based on the course id

        {/* nested routes for pages-educator */}
        <Route path='/educator' element={<Educator />}>
           //nested route paths should not contain "/"
           //outlet should be provided to Educator.jsx page inorder to make nested routes work
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='addCourse' element={<AddCourse />}/>
          <Route path='myCourses' element={<MyCourses />}/>
          <Route path='studentsEnrolled' element={<StudentsEnrolled />}/>
        </Route>

        {/* routes for components -student*/}
        <Route path="/loading/:path" element={<Loading />} />

      </Routes>
     
      
    </div>
  )
}

export default App
