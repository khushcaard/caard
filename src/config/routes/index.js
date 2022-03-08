import React from 'react';
import {
   Route,
   BrowserRouter as Router,
   Routes
 } from 'react-router-dom';
 import Profile from './../../pages/profile/index';
 
 const PageRoute = () => {
   return (
       <Router>
         <Routes>
           <Route exact path="/:id" element={<Profile/>} />
         </Routes>
       </Router>
   );
 };
 
 export default PageRoute;
 