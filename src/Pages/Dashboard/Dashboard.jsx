import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import { createTheme, ThemeProvider } from '@mui/material';
import DropDown from '../../Components/smallComponents/DropDown';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import './assets/css/Dashboard.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';


const theme = createTheme({
    typography:{
      fontFamily:['Montserrat','Ubuntu','Urbanist','Roboto'].join(',')
    },
  })



function DashBoard(){




return (<Container maxWidth="lg" sx={{mt:'100px'}}>
<ThemeProvider theme={theme}>
<Grid container spacing={2} >
    <Grid  item xs={12} md={4}>
        <Paper className="box">
            <FolderSharedRoundedIcon className="icon" sx={{fontSize:'5rem'}}/>
            <h2>Student Info</h2>
            <DropDown 
            names=
            {[
                {value:'View Info',icon:<VisibilityIcon/>,place:'/viewinfo'},
                {value:'Upload Info',icon:<CloudUploadIcon/>,place:'/uploadpage'},
                {value:'Download Info',icon:<SimCardDownloadRoundedIcon/>,place:''}
                ]}/ >
        </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
        <Paper className="box">
            <MarkEmailUnreadRoundedIcon className="icon" sx={{fontSize:'5rem'}}/>
            <h2>Complaints</h2>
            <DropDown 
            names=
            {[
                {value:'View Complaints',icon:<VisibilityIcon/>,place:'/viewcomplaints'},
                {value:'Download Complaints',icon:<SimCardDownloadRoundedIcon/>,place:''},
                {value:'Edit Complaints',icon:<EditRoundedIcon/>,place:''}
                ]}/ >
        </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
    <Paper className="box">
            <NightShelterIcon className="icon" sx={{fontSize:'5rem'}}/>
            <h2>Rooms Info</h2>
            <DropDown 
            names=
            {[
                {value:'Allot Rooms',icon:<HowToRegRoundedIcon/>,place:''},
                {value:'Room Info',icon:<VisibilityIcon/>,place:''},
                {value:'Upload Info',icon:<CloudUploadIcon/>,place:''}
                ]}/ >
        </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
        <Paper className="box">item4</Paper>
    </Grid>
    <Grid item xs={12} md={4}>
        <Paper className="box">item5</Paper>
    </Grid>
    <Grid item xs={12} md={4}>
        <Paper className="box">item6</Paper>
    </Grid>
    
</Grid>
</ThemeProvider>
</Container>)

}

export default DashBoard;