import { useSelector} from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import './assets/css/Step4.css';
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import {setImage} from '../../Store/Reducers/signUpDataSlice';
import SubmitData from './SubmitData';

const Step4 = ()=>{
    // const fileRef = useRef(null);
    const Dispatch = useDispatch();
    const count = useSelector(state => state.signupProgress.count);
    const url = 'https://api.cloudinary.com/v1_1/dzxccevve/image/upload';
    const [imageUrl,setImageUrl] = useState('');
    const allData = useSelector(state => state.signUpData.data);
    const handleChange = (event)=>{
        const file = event.target.files[0];
        
        const fileName = event.target.value;
        console.log(fileName.split('.')[1]);
        if((fileName.split('.')[1]).toString()===("jpg" || "jpeg")){
            const formData = new FormData();
            formData.append('file',file);
            formData.append('cloud_name', 'dzxccevve');
            formData.append("upload_preset", "imdcik15");
    
            fetch(url,{
                method:'POST',
                mode:"cors",
                body:formData
            }).then((response) => {
                return response.json();
              })
              .then((data) => {
                setImageUrl(data.url);
                Dispatch(setImage({image:data.url}));  
              })
              .catch(err=>console.log(err));

        }else{
            alert("Please Upload a Valid Image");
        }
    }

    const handleSubmit = (event)=>{


    }

    return <>
    {count===parseFloat(100)?<div>
<div className="image">
    {imageUrl.length?<img src={imageUrl} />:<div className="no-image">No Image</div>}
</div>
    <form id="file-upload" method="post" enctype="multipart/form-data">
    <div className="upload-container">
        <input onChange={handleChange} type="file" multiple/>
        <LoadingButton
        endIcon={<CloudUploadIcon />}
        variant="contained"
        loading={false}
        type="button"
        onClick={handleSubmit}
        >Upload</LoadingButton>

    </div>
    </form>
    <SubmitData />
    </div>:
    null}
    </>
}


export default Step4;