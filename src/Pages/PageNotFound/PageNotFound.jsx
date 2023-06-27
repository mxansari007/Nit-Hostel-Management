import React from 'react'
import { Navigate } from 'react-router-dom'
function PageNotFound() {
  return (
    <div>
    PageNotFound
    <Navigate to="/Dashboard" replace/>
    </div>
    
  )
}

export default PageNotFound