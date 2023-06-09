import React from 'react';

 function uploadpage (){

    const handleFile = ()=>{
        let files = document.getElementById('file_upload'); 
    }

    return <>
        <input type="file" id="file_upload"/>
        <button onClick={handleFile}>Upload</button>
    </>


}


export default uploadpage;