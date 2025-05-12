import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../Components/Student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../Components/Student/Footer";
// importing youtube to paly video from the yt site
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();

  // state variable to store the course data
  const [courseData, setCourseData] = useState(null);
  // state variable to store the open or close  lecture section when clicked on chapter
  const [openSections, setOpenSections] = useState({});
  // state var to show Enroll Now button in right side
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  // state var to display video when preview of the course is clicked
  const [playerData, setPlayerData] = useState(null);

  const {
    currency,
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    // using find method. If course.id = id from params, then course data will be displayed
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  // toggle fun to show and hide the description of chapter when clicked on chapter
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // return stmt for course details fun
  return courseData ? (
    <>
      <div
        className="flex md:flex-row flex-col-reverse gap-10 relative items-start
    justify-between md:px-36 px-8 md:pt-30 pt-20 text-left"
      >
        {/* to create a gradient color below the nav bar of this courseDetails page, defining div with css */}
        {/* section-height css is from tailwind.config.js file */}
        <div
          className="absolute top-0 left-0 w-full h-section-height -z-1
      bg-gradient-to-b from-cyan-100/70"
        ></div>
        {/* left column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1
            className="md:text-course-details-heading-large
      text-course-details-heading-small font-semibold text-gray-800"
          >
            {courseData.courseTitle}
          </h1>
          {/* as the description in dummy courses (assets.js file) has html tags inside it, we use dangerouslySetInnerHTML */}
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* displaying review and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-600">
              {courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length ? "Ratings" : "Rating"}
            </p>

            {/* to dispaly the total no. of enrolled students */}
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}
            </p>
          </div>

          <p className="text-sm">
            Course by <span className="text-blue-600">Great Stack</span>
          </p>

          {/* displaying course  chapter and no. of lectures  */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
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
                      {chapter.chapterContent.map((lecture, index) => (
                        <li key={index} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="play_icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="glex gap-2">
                              {/* if free preview of this lecture is present */}
                              {/* onclick fun in p tag to play preview video when clicked on preview 
                                 //split :splits the url to array like "http", "youtube" ,"1234" 
                                                // pop removes and returns the last element in the array i.e. "1234"
                                                // this string is stored in videoId as id for that video */}
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
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
          </div>

          {/* div to display course description */}
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              // writing custom css property "rich-text" for description in index.css
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>
        {/* right column */}------
        {/* custom css course-card,custom-card is from tailwind.config.js file */}
        <div
          className="max-w-course-card z-10 shadow-custom-card rounded-t 
        md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]"
        >
          {/* applying playerData state var to play video if it is not null. If null show the thumbnail of the course */}
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-fukk aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                src={assets.time_left_clock_icon}
                alt="time left clock-icon"
              />

              <p className="text-red-500">
                5 days <span cl>left at this price</span>
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>
            {/* div to add no. of lectures, chapters  */}
            <div
              className="flex items-center text-sm md:text-default gap-4 pt-2
              md:pt-4 text-gray-500"
            >
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>
              {/* div to create vertical line */}
              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="star icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              {/* div to create vertical line */}
              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="star icon" />
                <p>{calculateNoOfLectures(courseData)} Lessons</p>
              </div>
            </div>

            {/* enroll now button */}
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            {/* div for right side section what's in the course */}
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quiz to test your knowledge.</li>
                <li>Certificate of completio.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* footer section of courseDetails page */}
      <Footer />
    </>
  ) : (
    <Loading />
  );
  // ---------
};

export default CourseDetails;
