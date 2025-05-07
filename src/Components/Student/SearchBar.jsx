import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({data}) => {
  const navigate=useNavigate();
  const [input,setInput]=useState(data ? data : "");

const onSearchHandler =(e)=>{
  // whenever we submit this form , prevent defaulter helps us to stop refreshing the page
 e.preventDefault();
 navigate("/coursesList/" + input);
}

  return (
    
     <form onSubmit={onSearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
      <img  src={assets.search_icon} alt="search_icon" 
      className='ms:w-auto w-10 px-3' />

      {/* through this onchnage input,if user enters eg:javaScript in search bar and press search 
      the course list will be displayed where js keyword is present  */}
      <input onChange={e=> setInput(e.target.value)} value={input}
      type='text' placeholder='Search For Courses' 
      className='w-full h-full outline-none text-gray-500/80' />
      <button type='submit' 
      className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>

     </form>
    
  )
}

export default SearchBar
