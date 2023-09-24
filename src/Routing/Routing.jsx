import {lazy, Suspense} from 'react';
import Adminlogin from '../Pages/Adminlogin/Adminlogin';
import {Navigate, Route,Routes} from 'react-router-dom';
import Loadingpage from '../Components/smallComponents/Loadingpage/Loadingpage';
import NotLoggedIn from '../Pages/NotLoggedIn/NotLoggedIn';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
const Studentlogin = lazy(() => import ('../Pages/StudentLogin/Studentlogin'));
const Signup = lazy(() => import ('../Pages/SignUp/Signup'));
const Dashboard = lazy(() => import ('../Pages/Dashboard/Dashboard'));
import UploadPage from  '../Pages/Dashboard/UploadPage/UploadPage';
import Viewinfo from '../Pages/Dashboard/Viewinfo/Viewinfo';
import ViewComplaints from '../Pages/Dashboard/ViewComplaints/VeiwComplaints';
import AllotRooms from '../Pages/Dashboard/AllotRooms/AllotRooms';
import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword';
import ProfileSettings from '../Pages/Dashboard/ProfileSettings/ProfileSettings';
import { useSelector } from 'react-redux';

const Routing = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn.value);
    
    if(isLoggedIn){
        return(
            <>
        <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/viewcomplaints" element={<ViewComplaints />} />
        <Route path="/profile_settings" element={<ProfileSettings />} />
        <Route path="/allotrooms" element={<AllotRooms />} />
        <Route path='/uploadpage' element={<Suspense  fallback={<Loadingpage />}><UploadPage/></Suspense>}/>
        <Route path='/viewinfo' element={<Suspense  fallback={<Loadingpage />}><Viewinfo/></Suspense>}/>
        <Route path='/Dashboard' element={<Suspense  fallback={<Loadingpage />}><Dashboard /></Suspense>}/>
        <Route path='/uploadpage' element={<Suspense  fallback={<Loadingpage />}><UploadPage/></Suspense>}/>
        </Routes>
        </>
        )
    }
    else{

    return <>
        <Routes>
            <Route path="*" element={<NotLoggedIn />} />
            <Route path='/' element={<Adminlogin />}/>
            <Route path='/forgetpsd' element={<ForgetPassword/>}/>
            <Route path='/signup' element={<Suspense  fallback={<Loadingpage />}><Signup/></Suspense>}/>
            <Route path='/student' element={<Suspense  fallback={<Loadingpage />}><Studentlogin/></Suspense>}/>
        </Routes>
    </>
    }
}




export default Routing;