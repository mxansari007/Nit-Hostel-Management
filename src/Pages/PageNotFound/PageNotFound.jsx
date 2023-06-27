import React from 'react'
import { Navigate } from 'react-router-dom'
function PageNotFound() {
  return (
    <div>

    <Navigate to="/Dashboard" replace/>
    </div>
    
  )
}

export default PageNotFound