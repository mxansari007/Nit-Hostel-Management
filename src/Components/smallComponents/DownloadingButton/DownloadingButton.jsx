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
                        "branch":props.row.Profile.branch,
                        "course":props.row.Profile.course,
                        "semester":props.row.Profile.semester,
                        "image":props.row.Profile.image,
                        "email":props.row.email,
                        "address":props.row.Profile.address,
                        "state":props.row.Profile.state,
                        "bloodGroup":props.row.Profile.bloodGroup,
                        "dateOfBirth":props.row.Profile.dateOfBirth,
                        "contactNumber":props.row.Profile.contactNumber,
                        "fatherContact":props.row.Profile.fatherContact,
                        "fatherName":props.row.Profile.fatherName,
                        "fatherOccupation":props.row.Profile.fatherOccupation,
                        "motherName":props.row.Profile.motherName,
                        "motherOccupation":props.row.Profile.motherOccupation,
                        "gender":props.row.Profile.gender,
                        "identificationMark":props.row.Profile.identificationMark,
                        "officialEmail":props.row.Profile.officialEmail,
                        "secondaryNumber":props.row.Profile.secondaryNumber,
                        },{responseType:'arraybuffer',withCredentials:true}).then((response)=>{
                         console.log(response);
                         fileDownloader(response.data, `${props.row.rollNo}_${props.row.firstName}.pdf`);
                          setDownloading(false);
                       }).catch((err)=>{setDownloading(false);console.log(err);})
                        }}>Download</LoadingButton>
    </>
}

export default DownloadingButton;