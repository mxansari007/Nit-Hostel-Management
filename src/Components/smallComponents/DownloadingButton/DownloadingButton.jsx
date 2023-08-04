import LoadingButton from '@mui/lab/LoadingButton';
import {useState} from 'react';
import fileDownloader from "js-file-download";
import axios from 'axios';

const DownloadingButton = (props)=>{
    const [downloading, setDownloading] = useState(false);
    
    return <>
         <LoadingButton size="small" variant="contained" loading={downloading} onClick={
                  ()=>{setDownloading(true);
                        console.log(props.row);
                        axios.post(import.meta.env.VITE_BASE_URL+ '/pdfDownload',{
                        "templateName":"viewInfo",
                        "name":props.row.firstName,
                        "rollNo":props.row.rollNo,
                        "firstName":props.row.firstName,
                        "lastName":props.row.lastName,
                        "year":props.row.year,
                        "department":props.row.department,
                        "email":props.row.email},{responseType:'arraybuffer',withCredentials:true}).then((response)=>{
                         console.log(response);
                         fileDownloader(response.data, `${props.row.rollNo}_${props.row.firstName}.pdf`);
                          setDownloading(false);
                       }).catch((err)=>{setDownloading(false);console.log(err);})
                        }}>Download</LoadingButton>
    </>
}

export default DownloadingButton;