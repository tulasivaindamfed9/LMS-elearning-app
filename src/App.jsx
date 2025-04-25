import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
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

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* routes for pages- student */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/coursesList" element={<Courseslist />} />
        <Route path="/coursesList/:input" element={<Courseslist />} /> //based on different keywords(input from user) we display the courses
        <Route path="/course/:id" element={<CourseDetails />} />  //generating diff id 's for different courses'
        <Route path="/myEnrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />

        {/* routes for pages-educator */}
        <Route path='/educator' element={<Educator />}>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='addCourse' element={<AddCourse />}/>
          <Route path='myCourses' element={<MyCourses />}/>
          <Route path='studentsEnrolled' element={<StudentsEnrolled />}/>
        </Route>

        {/* routes for components -student*/}
        <Route path="/loading/:path" element={<Loading />} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
