import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image
  } from "@react-pdf/renderer";
//register fonts


import React from "react";
import logo from './logo.png';



Font.register({ family: 'Merriweather',fonts:[
    {src:'http://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.ttf',fontWeight:400},
    {src:'http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf',fontWeight:700}
] });

Font.register({family:'Roboto',
fonts:[
    {src:'http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf',fontWeight:100},
    {src:'http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf',fontWeight:300},
    {src:'http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf',fontWeight:500},
    {src:'http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf',fontWeight:700}
]});


  // Create styles
  const styles = StyleSheet.create({

    page: {
      backgroundColor: "#FFFFFF",
      color: "#201E20",
           
    },
    mainContainer:{
        margin:10,
        padding:10,
        border:'2px dashed black',
        height:800
    },
    imageProperties:{
        width: 100,
        height:130,
        marginLeft:40,
        marginTop:80,
        border:'2px solid black'
    },
    imageText:{
        fontFamily:'Roboto',
        fontWeight:300,
        fontSize:20,
        padding:4,
        margin:'auto',
        color: 'gray',
        
    },
    title:{
        fontFamily:"Merriweather",
        fontSize:'25',
        fontWeight:700,
        color:'crimson'
    },
    Header: {
      padding: 10,
      display:'flex',
      flexDirection:'row',
      margin:'0 auto'
      
    },
    subTitle:{
        fontFamily:"Merriweather",
        fontSize:'22',
        fontWeight:400
    },

    Container:{
        display:'flex',
        flexDirection:'row',
 
    },
    info:{
        marginLeft:40,
        marginTop:30,
        
    },
    enterinfo:{
        marginTop:30,
        marginLeft:20
    },
    boldText:{
        fontFamily:'Roboto',
        fontSize:18,
        fontWeight:500,
        padding:2
    },
    normalText:{
        fontFamily:'Roboto',
        fontWeight:300,
        fontSize:18,
        padding:2

    },
    logo:{
      width:'90px',
      float:'left'
    },
    logoText:{
      marginTop:'10px',
      marginLeft:'10px'
    }

  });
  



  // Create Document Component
const  MyDocument = (props)=> {

console.log(props)
    



    return (
        
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
          <View style={styles.mainContainer}>
          <View style={styles.Header}>
             <Image src={logo} style={styles.logo}/>
            <View style={styles.logoText}>
              <Text style={styles.title}>NIT Kurukshetra</Text>
              <Text style={styles.subTitle}>Vivekanand Bhawan Hostel 11</Text>
            </View>
          </View>
            <View style={styles.imageProperties}>
                {/* <Image src='' /> */}
                <Text style={styles.imageText}>Photo</Text>
            </View>
            <View style={styles.Container}>
            <View style={styles.info}>
                <Text style={styles.boldText}>Name:</Text>
                <Text style={styles.boldText}>Roll No:</Text>
                <Text style={styles.boldText}>Department:</Text>
                <Text style={styles.boldText}>Year:</Text>
                <Text style={styles.boldText}>Email:</Text>
            </View>
            <View style={styles.enterinfo}>
              <Text style={styles.normalText}>{props.data.firstName} {props.data.lastName}</Text>
                <Text style={styles.normalText}>{props.data.rollNo}</Text>
                <Text style={styles.normalText}>{props.data.department}</Text>
                <Text style={styles.normalText}>{props.data.year}</Text>
                <Text style={styles.normalText}>{props.data.email}</Text>
            </View>
            </View>
            </View>
          </Page>
        </Document>

    );
  }
  export default MyDocument;