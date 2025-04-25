import React from 'react';
import { Outlet } from 'react-router-dom';

const Educator = () => {
  return (
    <div>
      <h1>Educator page</h1>
      <div>
        {<Outlet/>} //providing the outlet tag here because educator is parent and children are the remaining pages in pages/educator
        {/* we are using nested routing , so providing OUTLET will help in parent child routing */}
      </div>
    </div>
  )
}

export default Educator
