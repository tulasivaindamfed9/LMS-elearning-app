import React, { useEffect, useState } from 'react'

const Rating = ({initialRating,onRate}) => {

  // state var rating to store initial value as 0 or initial rating
  const [rating,setRating] =useState(initialRating || 0)

  const handleRating =(value) =>{
    setRating(value);
    if(onRate) onRate(value)
  }

  useEffect(() =>{
    if(initialRating){
      setRating(initialRating)
    }
  },[initialRating])
  return (
    <div>
      {/* Array of length 5 is provided as the no. of stars for rating will be 5 */}
      {Array.from({length: 5}, (_,index)=>{
        const starValue = index + 1;
        return(
          // using span tag as rating.jsx will appear side to rate this course heading in player.jsx
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors
          ${starValue <= rating ? 'text-yellow-500' :'text-gray-400'}`}
          onClick={()=>handleRating(starValue)}
          >
            {/* html icon code for star */}
            &#9733;
          </span>
        )
      })}
    </div>
  )
}

export default Rating
