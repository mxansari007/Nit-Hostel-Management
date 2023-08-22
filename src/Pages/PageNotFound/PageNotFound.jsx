import React from 'react'
import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux';


const PageNotFound = function() {

const localLogin = sessionStorage.getItem('localLogin');

  if(localLogin){

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