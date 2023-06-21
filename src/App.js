import {useEffect, lazy, Suspense} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Adminlogin from './Components/Adminlogin';

import {useNavigate,Route,Routes} from 'react-router-dom';

import { createContext,useState } from 'react';
import Loadingpage from './Components/smallComponents/Loadingpage';
const Studentlogin = lazy(()=>createDelay(import ('./Components/Studentlogin')));
const Signup = lazy(()=>createDelay(import ('./Components/Signup')));
const Dashboard = lazy(()=>createDelay(import ('./Components/Dashboard')));
const UploadPage = lazy(()=>createDelay(import ('./Components/UploadPage')));

const Viewinfo = lazy(()=>createDelay(import ('./Components/Viewinfo')));

const UserContext = createContext();
function App() {


//for global state management
//there is a problem, need to change from useState to useReducer + useContext

const [isLoggedIn,setLogin] = useState(false);
const Navigate = useNavigate();



 




  return (
    <>
    <UserContext.Provider value={[isLoggedIn,setLogin]}>

    <Navbar />
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

</UserContext.Provider>
     </>
  );
}

//creating a delay for lazy loading
function createDelay(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

export default App;

export {UserContext};
