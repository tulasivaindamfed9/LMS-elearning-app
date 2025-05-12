import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
// importing line tag from rc-progress which is already installed in our project
// used to display the progress bar until where the course has been completed in %
import { Line} from 'rc-progress'
import Footer from "../../Components/Student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);
  // state var to store the no. of lectures completed
  // we are adding dummy data
  const [progressArray, setProgressArray] = useState([
    
      { lectureCompleted: 2, totalLectures: 4 },
      { lectureCompleted: 1, totalLectures: 5 },
      { lectureCompleted: 3, totalLectures: 6 },
      { lectureCompleted: 4, totalLectures: 4 },
      { lectureCompleted: 0, totalLectures: 3 },
      { lectureCompleted: 5, totalLectures: 7 },
      { lectureCompleted: 6, totalLectures: 8 },
      { lectureCompleted: 2, totalLectures: 6},
      { lectureCompleted: 4, totalLectures: 10 },
      { lectureCompleted: 3, totalLectures: 5 },
      { lectureCompleted: 7, totalLectures: 7 },
      { lectureCompleted: 1, totalLectures: 4 },
      { lectureCompleted: 0, totalLectures: 2 },
      { lectureCompleted: 5, totalLectures: 5 },
    ,
  ]);

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          {/* head */}
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Courses</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          {/* body */}
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    {/* displaying progress bar using line */}
                    <Line  strokeWidth={2}
                     percent={progressArray[index] ? (
                      (progressArray[index].lectureCompleted * 100) /progressArray[index].totalLectures ) : 0 }
                     className="bg-gray-300 rounded-full"/>
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                {/* showing no. of lectures completed / total no. of lectures */}
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index] && `${progressArray[index]. lectureCompleted} / ${progressArray[index]. totalLectures}`}<span>Lectures</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  {/* adding onclick property on button tag to go to player page where course is present */}
                  <button
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600
        max-sm:text-xs text-white"
        
        onClick={()=>navigate('/player/' + course._id)}
                  >
                   {progressArray[index] && progressArray[index].lectureCompleted /progressArray[index].totalLectures === 1 ?
                   "Completed" : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* adding footer */}
      <Footer />
    </>
  );
};

export default MyEnrollments;
