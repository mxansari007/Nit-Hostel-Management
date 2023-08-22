import Routing from './Routing/Routing';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {initialLogin} from './Store/Reducers/loginSlice';
import {useEffect} from 'react';
import { Snackbar } from '@mui/base';
import { Alert } from '@mui/lab';



function App() {

  // const signedStatus = useSelector(state =>state.signUpProgress.signedUp);

const Dispatch = useDispatch();

  useEffect(()=>{
    sessionStorage.getItem('localLogin')?Dispatch(initialLogin()):null;
},[])



  return (
    <>
    <Navbar />
    <Routing />
    {/* <Snackbar open={signedStatus} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar> */}
     </>
  );
}



export default App;


