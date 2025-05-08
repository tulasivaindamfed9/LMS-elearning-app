import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../Components/Student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();

  // state variable to store the course data
  const [courseData, setCourseData] = useState(null);

  const {
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
  }, []);

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
            Course by <span className="text-blue-600">Free code camp</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter,index)=>(
                <div key={index}>
                  <div>
                    <div>
                      <img src={assets.down_arrow_icon} alt="arrow icon" />
                      <p>{chapter.chapterTitle}</p>
                    </div>
                    <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* right column */}
        <div></div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
