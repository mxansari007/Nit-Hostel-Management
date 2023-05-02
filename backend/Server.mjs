// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { initializeApp } from "firebase/app";
import { getFirestore,collection,doc,setDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNw75cCjh90q05km-ttsYuHiWlTXzCvqk",
  authDomain: "nit-hostel.firebaseapp.com",
  projectId: "nit-hostel",
  storageBucket: "nit-hostel.appspot.com",
  messagingSenderId: "481050434364",
  appId: "1:481050434364:web:3f6ab10079dbf83b275c39",
  measurementId: "G-PJNLNK0ZQX"
};

// Initialize Firebase
const fapp = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(fapp);
const usersCollectionRef = collection(db, 'users');


const express = require('express');
const bp = require('body-parser');
const path = require('path');




const app = express();

app.use(express.json());

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

app.post('/store-data',(req,res)=>{
  console.log(req.body);   

const DocumentRef = doc(db, 'users',req.body.rollno);   
setDoc(DocumentRef,req.body);
})



app.listen(3000,function(){
    console.log("Server is listening on port 3000");
})

