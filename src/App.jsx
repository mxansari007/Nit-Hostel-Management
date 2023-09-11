import Routing from './Routing/Routing';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {initialLogin} from './Store/Reducers/loginSlice';
import {useEffect} from 'react';
import { Snackbar } from '@mui/base';
import { Alert } from '@mui/lab';
import axios from 'axios';


function App() {

  // const signedStatus = useSelector(state =>state.signUpProgress.signedUp);

const Dispatch = useDispatch();

  useEffect(()=>{
    localStorage.getItem('localLogin')?Dispatch(initialLogin()):null;
},[])

window.onbeforeunload = ()=>{
  localStorage.setItem('history',window.location.pathname);
}

  return (
    <>
    <Navbar />
    <Routing />
     </>
  );
}



export default App;


