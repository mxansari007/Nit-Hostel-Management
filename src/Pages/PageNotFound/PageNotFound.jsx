import React from 'react'
import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux';


const PageNotFound = function() {

const localLogin = localStorage.getItem('localLogin');
const pathHistory = localStorage.getItem('history');
  if(localLogin){

  return (
    <div>
      <Navigate to={pathHistory} replace/>
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