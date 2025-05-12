import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../../Context/AppContext";

const Navbar = () => {

  const {navigate,isEducator}=useContext(AppContext)

  const isCouselistPage = location.pathname.includes("/coursesList"); //for courseList page the background color should be white, otherwise false
  // to open signin form we use useClerk
  const { openSignIn } = useClerk();
  // to store user details we use useUser
  const { user } = useUser();
  return (
    <div
      className={`flex item-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCouselistPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >

<img
  onClick={() => navigate('/')}
  src={assets.study_online_logo}
  alt="study_online_logo"
  className="w-40 lg:w-48 cursor-pointer p-1 rounded-md hover:opacity-90 transition duration-300 bg-blue-600 rounded"
 
/>


      {/* <img
      // using onclick fun because whenever we click on logo , we should redirect to home page
        onClick={()=>navigate('/')}
        src={assets.study_online_logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
      /> */}
      {/* div for laptop or desktop view */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {/* if the user is login show become educator and my enrollments buttons */}
          {user && (
            <>
              <button onClick={()=>{navigate("/educator")}}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button>|{" "}
              <Link to="/myEnrollments">My Enrollments</Link>
            </>
          )}
        </div>

        {/* when the user is already logged in we display the user button ,otherwise we the create account button  */}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      
      {/* div for phone view */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
               <button onClick={()=>{navigate("/educator")}}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button>|{" "}
              <Link to="/myEnrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
