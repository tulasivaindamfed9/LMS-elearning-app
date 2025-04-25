import React from 'react'
import { assets } from '../../assets/assets';
import {Link} from "react-router-dom";

const Navbar = () => {

const isCouselistPage=location.pathname.includes("/coursesList")

  return (
    <div className={`flex item-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4`}>
     <img src={assets.logo} alt='logo' className='w-28 lg:w-32 cursor-pointer'/>
     {/* div for laptop or desktop view */}
     <div className='hidden md:flex items-center gap-5 text-gray-500'>
      <div>
        <button>Become Educator</button>
        | <Link to="/myEnrollments">My Enrollments</Link>
      </div>
      <button className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
     </div>
     {/* div for mobile view */}
     <div></div>
    </div>
  )
}

export default Navbar
