import {useEffect, lazy, Suspense} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Adminlogin from './Components/Adminlogin';
import {useNavigate,Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import { createContext,useState } from 'react';
import Loadingpage from './Components/smallComponents/Loadingpage';
const Studentlogin = lazy(()=>createDelay(import ('./Components/Studentlogin')));
const Signup = lazy(()=>createDelay(import ('./Components/Signup')));
const Dashboard = lazy(()=>createDelay(import ('./Components/Dashboard')));
const UploadPage = lazy(()=>createDelay(import ('./Components/UploadPage')));

const UserContext = createContext();
function App() {

const [isLoggedIn,setLogin] = useState(false);
const Navigate = useNavigate();

useEffect(()=>{

  if((isLoggedIn===false)){
    Navigate('/');
  }

},[isLoggedIn])


const ConditionalDashbaord = ()=>{
  if(isLoggedIn){
    return <Dashboard />
  }
  else{
    
    return <h1>Cannot access</h1>
  }
}




  return (
    <>
    <UserContext.Provider value={[isLoggedIn,setLogin]}>


    <Navbar />

<Routes>
  <Route path='/' element={<Adminlogin />}/>
  
  <Route path='/student' element={<Suspense  fallback={<Loadingpage />}><Studentlogin/></Suspense>}/>
  
  <Route path='/signup' element={<Suspense  fallback={<Loadingpage />}><Signup/></Suspense>}/>
  <Route path='/Dashboard' element={<Suspense  fallback={<Loadingpage />}><ConditionalDashbaord/></Suspense>}/>
  <Route path='/uploadpage' element={<Suspense  fallback={<Loadingpage />}><UploadPage/></Suspense>}/>
  </Routes>

</UserContext.Provider>
     </>
  );
}


function createDelay(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 1500);
  }).then(() => promise);
}

export default App;

export {UserContext};
