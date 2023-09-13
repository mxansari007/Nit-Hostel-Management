import LoadingButton from '@mui/lab/LoadingButton';
import {useState} from 'react';
import fileDownloader from "js-file-download";
import axios from 'axios';
import logo from '../../Navbar/assets/images/nit-logo.png';
import { usePDF, Document, Page,Text,StyleSheet, PDFViewer, View, Image,Font} from '@react-pdf/renderer';
import { Button } from '@mui/material';
Font.register({
  family: 'Urbanist',
  fonts:[
    {src: 'https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx4fFpOrS8SlKw.ttf',fontWeight:400},
    {src:'https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDFRkfFpOrS8SlKw.ttf',fontWeight:'bold'}
  ]
});


 

const styles = StyleSheet.create({
 
    section:{color:'black',textAlign:'center',fontSize:'12',padding:'15'},
    photo:{ marginLeft:'30px',width:'100px',height:'130px',border:'1px solid black',borderRadius:'20px'},
    content:{ 
      fontFamily:'Urbanist',
      fontWeight:'400',
      display: 'grid',
      grid: '100px / auto auto auto',
      gridGap: '10px',
      padding: '12px',
      display:'flex',flexDirection:'row',justifyContent:'space-between'},
    logo:{width:'100px',height:'100px' ,margin:'auto'},
    head: { textAlign: 'center' ,marginTop:'5px'},
    head2:{  border:'1px solid #9FE2BF',color:'#097969',padding:'5px',marginTop:'30px',borderStyle:'outset',borderLeftWidth:'thin',borderRightWidth:'thin'},
    title:{marginTop:'10px',fontWeight:'bold',fontSize:'24pt',textAlign:'center',color:'#097969'},
    body: {
      paddingTop:'35',
      paddingBottom:'65',
      paddingHorizontal: '35',
      backgroundImage: 'logo',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
     


});







const DownloadingButton = (props)=>{
    
    const [downloading, setDownloading] = useState(false);
    
    const MyDoc = (
        <Document>
          <Page style={styles.body}>
          <Text style={styles.title}>NIT Kurukshetra</Text>
          <Text style={styles.head}>Hostel Vivekanand</Text>
          <Image style={styles.logo} src={logo} />
            <View style={styles.photo}> </View>
           
            <Text style={styles.head2}> Profile Details</Text>

           <View style={styles.content}>
           <Text style={styles.section}>First Name: {props.row.firstName}</Text>
           <Text style={styles.section}>Last Name:  {props.row.lasttName}; </Text>
           <Text style={styles.section}>Roll No:  {props.row.rollNo}; </Text>
           </View>

           <View style={styles.content}>
           <Text style={styles.section}>Course:  {props.row.Profile.course}; </Text>
           <Text style={styles.section}>Branch:  {props.row.Profile.branch}; </Text>
           <Text style={styles.section}>Department:  {props.row.department}; </Text>
           </View>

           <Text style={styles.head2}> Additional Details</Text>

           <View style={styles.content} >
           <Text style={styles.section}>Semester:  {props.row.Profile.semester}; </Text>
           <Text style={styles.section}>Email:  {props.row.email}; </Text>
           <Text style={styles.section}>Address:  {props.row.Profile.address}; </Text>
           </View>

           <View style={styles.content} >
            <Text  style={styles.section} > State:{props.row.Profile.state}; </Text>
            <Text  style={styles.section} > Blood Group:{props.row.Profile.bloodGroup};</Text>
            <Text  style={styles.section} >Date Of Birth:{props.row.Profile.dateOfBirth};</Text>
           </View>
           
           <View style={styles.content}>
            <Text style={styles.section}>Contact Number:{props.row.Profile.contactNumber};</Text>
            <Text style={styles.section}>Father's Name:{props.row.Profile.fatherName};</Text>
            <Text style={styles.section}>Father's Contact":{props.row.Profile.fatherContact};</Text>
           </View>

          <View style={styles.content}>
             <Text style={styles.section}>Father's Occupation:{props.row.Profile.fatherOccupation};</Text>
             <Text style={styles.section}>Mother's Name:{props.row.Profile.motherName};</Text>
             <Text style={styles.section}>Mother's Occupation:{props.row.Profile.motherOccupation};</Text>
          </View>
            
           <View style={styles.content}>
            <Text style={styles.section}>Gender:{props.row.Profile.gender};</Text>
            <Text style={styles.section}>Identification Mark:{props.row.Profile.identificationMark};</Text>
            <Text style={styles.section}>Secondary Number:{props.row.Profile.secondaryNumber};</Text>
            </View> 




          </Page>
        </Document>
      );

    const [instance, updateInstance] = usePDF({ document: MyDoc });

    if (instance.loading) return <LoadingButton loading variant="conatined" size="small">Loading</LoadingButton>;
  
    if (instance.error) return <div>Something went wrong</div>;



      
      
    
    return <>
    

                        <a href={instance.url} download={`${props.row.rollNo}.pdf`}>
                            <Button variant="contained" size="small">Download</Button>
                        </a>



    </>
}

export default DownloadingButton;