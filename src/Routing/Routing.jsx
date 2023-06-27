import {lazy, Suspense} from 'react';
import Adminlogin from '../Pages/Adminlogin/Adminlogin';
import {Route,Routes} from 'react-router-dom';
import Loadingpage from '../Components/smallComponents/Loadingpage/Loadingpage';
const Studentlogin = lazy(()=>createDelay(import ('../Pages/StudentLogin/Studentlogin')));
const Signup = lazy(()=>createDelay(import ('../Pages/SignUp/Signup')));
const Dashboard = lazy(()=>createDelay(import ('../Pages/Dashboard/Dashboard')));
const UploadPage = lazy(()=>createDelay(import ('../Pages/Dashboard/UploadPage/UploadPage')));
const Viewinfo = lazy(()=>createDelay(import ('../Pages/Dashboard/Viewinfo/Viewinfo')));


const Routing = () => {
    return <>
        <Routes>
  <Route path='/' element={<Adminlogin />}/>

  <Route path='/student' element={<Suspense  fallback={<Loadingpage />}><Studentlogin/></Suspense>}/>
  <Route path='/signup' element={<Suspense  fallback={<Loadingpage />}><Signup/></Suspense>}/>
  <Route path='/uploadpage' element={<Suspense  fallback={<Loadingpage />}><UploadPage/></Suspense>}/>
  <Route path='/viewinfo' element={<Suspense  fallback={<Loadingpage />}><Viewinfo/></Suspense>}/>
  <Route path='/student' element={<Suspense  fallback={<Loadingpage />}><Studentlogin/></Suspense>}/>
  <Route path='/signup' element={<Suspense  fallback={<Loadingpage />}><Signup/></Suspense>}/>
  <Route path='/Dashboard' element={<Suspense  fallback={<Loadingpage />}><Dashboard /></Suspense>}/>
  <Route path='/uploadpage' element={<Suspense  fallback={<Loadingpage />}><UploadPage/></Suspense>}/>

  </Routes>
    </>
}


//creating a delay for lazy loading
function createDelay(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    }).then(() => promise);
  }
  


export default Routing;