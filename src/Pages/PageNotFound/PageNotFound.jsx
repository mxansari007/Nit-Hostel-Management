import React from 'react'
import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux';


const PageNotFound = function() {

  const isLoggedIn = useSelector(state => state.isLoggedIn.value);

  if(isLoggedIn){
  return (
    <div>
      <Navigate to="/Dashboard" replace/>
    </div>
  )
}else{
  return (
    <div>
      <Navigate to="/" replace/>
    </div>
  )
}
}

export default PageNotFound