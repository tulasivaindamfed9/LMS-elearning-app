import React from 'react'
import { assets } from '../../assets/assets'

const CourseCard = ({course}) => {
  return (
    <div>
      <img src={course.courseThumbnail} alt ="" />
      <div>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div>
          <p>4.5</p>
          <div>
            {[...Array(5)].map((_,i)=>{
              <img key={i} src={assets.star} alt=''/>
            })}
            </div>
            <p>22</p>
        </div>
        {/* displaying course price with discount and rounded off to two decimal points */}
        <p>{(course.coursePrice - course.discount * coursePrice /100 ).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CourseCard
