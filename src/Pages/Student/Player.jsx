import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../Components/Student/Footer'
import Rating from '../../Components/Student/Rating'

const Player = () => {
  const {enrolledCourses, calculateChapterTime} = useContext(AppContext)
  // getting course id from use params which is imported from react-router-dom
  const {courseId} =useParams()
  // state var for course data
  const [courseData, setCourseData]=useState(null)
  //state var to store chapters and lecutres
  const [openSections, setOpenSections] = useState({})
  // state var to play video fo the course
  const [playerData,setPlayerData]= useState(null)

  // to get individual course data we create a function. If courseId from params === course._id, set the course data var to course
  const getCourseData= ()=>{
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourseData(course)
      }
  })
  }

   // toggle fun to show and hide the description of chapter when clicked on chapter
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  // whenever the component is loaded we execute the getCourseData fun
  // so we are using useEffect
  useEffect(()=>{
    getCourseData()
  },[enrolledCourses])

  return (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
      {/* left column */}
    <div className='text-gray-800'>
      <h2 className='text-xl font-semibold'>Course structure</h2>


{/* whenever couse data is present we execute the map fun below */}
{/* below div and toggleSection are copied from courseDetails.jsx file */}
        <div className="pt-5">
                    {courseData && courseData.courseContent.map((chapter, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 bg-white mb-2 rounded"
                      >
                        {/* toggleSection fun will display the no. of chapters and lectures */}
                        <div
                          onClick={() => toggleSection(index)}
                          className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              className={`transform transition-transform ${
                                openSections[index] ? "rotate-180" : ""
                              }`}
                              src={assets.down_arrow_icon}
                              alt="arrow icon"
                            />
                            <p className="font-medium md:text-base text-sm">
                              {chapter.chapterTitle}
                            </p>
                          </div>
                          <p className="text-sm md:text-default">
                            {chapter.chapterContent.length} lectures -{" "}
                            {calculateChapterTime(chapter)}
                          </p>
                        </div>
      
                        {/* displaying lectures under chapter */}
                        <div
                          className={`overflow-hidden transition-all duration-300
                       ${openSections[index] ? "max-h-96" : "max-h-0"}`}
                        >
                          <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                            {chapter.chapterContent.map((lecture, i) => (
                              <li key={i} className="flex items-start gap-2 py-1">
                                <img
                                  src={false ? assets.blue_tick_icon : assets.play_icon}
                                  alt="play_icon"
                                  className="w-4 h-4 mt-1"
                                />
                                <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                  <p>{lecture.lectureTitle}</p>
                                  <div className="glex gap-2">
                                    {/* if free preview of this lecture is present */}
                                    {/* onclick fun in p tag to play preview video when clicked on preview 
                                      */}
                                    {lecture.lectureUrl && (
                                      <p
                                        onClick={() =>
                                          setPlayerData({
                                            ...lecture, chapter: index + 1, lecture: i+ 1
                                          })
                                        }
                                        className="text-blue-500 cursor-pointer"
                                      >
                                        Watch
                                      </p>
                                    )}
                                    <p>
                                      {humanizeDuration(
                                        lecture.lectureDuration * 60 * 1000,
                                        { units: ["h", "m"] }
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* div for the user to rate the course */}
                  <div className='flex items-center gap-2 py-3 mt-10'>
                    <h1 className='text-xl font-bold'>Rate this Course:</h1>
                    <Rating initialRating={0}/>
                  </div>
    </div>

    {/* right column */}
    <div className='md:mt-10'>
      {/* if palyer data is present we display the video of that particular course. Otherwise display the thumbnail of the course */}
      {playerData ? (
        // import youtube tag to paly the video
        <div>
          <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video'/>
          <div className='flex justify-between items-center mt-1'>
            <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
            <button className='text-blue-600'>{false ? 'completed' : "Mark as complete"}</button>
            </div>
        </div>
      ) :
      
      <img src={courseData ? courseData.courseThumbnail : ""} alt=''/>
    }
    </div>
    </div>

    {/* adding footer section in player page */}
    <Footer />
    </>
  )
}

export default Player
