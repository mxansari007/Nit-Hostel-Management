import { Navigate } from "react-router-dom";

const NotLoggedIn = ()=>{
   
   
   return<>
        <h1>You are not logged In</h1>
        <Navigate to="/" replace/>
    </>
}


export default NotLoggedIn;