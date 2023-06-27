import {lazy, Suspense} from 'react';
import Adminlogin from '../Pages/Adminlogin/Adminlogin';
import {Navigate, Route,Routes} from 'react-router-dom';
import Loadingpage from '../Components/smallComponents/Loadingpage/Loadingpage';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotLoggedIn from '../Pages/NotLoggedIn/NotLoggedIn';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
const Studentlogin = lazy(() => import ('../Pages/StudentLogin/Studentlogin'));
const Signup = lazy(() => import ('../Pages/SignUp/Signup'));
const Dashboard = lazy(() => import ('../Pages/Dashboard/Dashboard'));
import UploadPage from  '../Pages/Dashboard/UploadPage/UploadPage';
import Viewinfo from '../Pages/Dashboard/Viewinfo/Viewinfo';


const Routing = () => {

const navigate = useNavigate();


    const isLoggedIn = useSelector(state => state.isLoggedIn.value);
    console.log(isLoggedIn);



    if(isLoggedIn||localStorage.getItem('userId')){
        return(
            <>
        <Routes>
        <Route path="*" element={<PageNotFound />} />
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
            <Route path='/signup' element={<Suspense  fallback={<Loadingpage />}><Signup/></Suspense>}/>
            <Route path='/student' element={<Suspense  fallback={<Loadingpage />}><Studentlogin/></Suspense>}/>
        </Routes>
    </>
    }
}




export default Routing;