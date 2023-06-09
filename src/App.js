import './App.css';
import Navbar from './Components/Navbar';
import Studentlogin from './Components/Studentlogin';
import Adminlogin from './Components/Adminlogin';
import Signup from './Components/Signup';
import uploadpage from './Components/uploadpage';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './Components/Dashboard';




function App() {
  
  return (
    <>
<Router>
    <Navbar />
 
<Routes>
  <Route path='/' element={<Adminlogin />}/>
  <Route path='/student' element={<Studentlogin/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/uploadpage' element={<uploadpage/>}/>
  <Route path='/Dashboard' element={<Dashboard/>}/>
  </Routes>
</Router>


     </>
  );
}

export default App;


