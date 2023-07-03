import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from './assets/images/2.png';
import './assets/css/Navbar.css';
import LoginOptions from '../smallComponents/LoginOptions';
import { useNavigate } from 'react-router-dom';




const pages = ['Home', 'Contact Us', 'About'];


const Navbar=()=> {

  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const Navigator = useNavigate();

  const handleOpenNavMenu = (event) => {
 
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePage = (event) =>{
    
    if(event.target.name === 'Home'||event.target.outerText=== 'Home'){
        Navigator('/');
    }
    else if(event.target.name === 'About'||event.target.outerText=== 'About'){
      Navigator('/about');
  }
  else if(event.target.name==='Contact Us'||event.target.outerText=== 'Contact Us'){
    Navigator('contact');
  }
  }




  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{backgroundColor:'white'}}>
        <Toolbar disableGutters>
        <div className='logo-container'>
          <div>
          <img src={logo} id="logo"/>
          </div>
          <div className="logo-heading">
          <h1>NIT Kurukshetra</h1>
          <p>Hostel Management System</p>
          </div>
          </div>

          <div className='logo-container-small'>
          <div>
          <img src={logo} id="logo"/>
          </div>
          <div className="logo-heading">
          <h1>NIT Kkr</h1>
          <p>HMS</p>
          </div>
          </div>


          <Box className="smallMenu" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} name={page} type="button" onClick={handlePage}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

 
          <Box className="pages" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                name={page}
                onClick={handlePage}
                sx={{ my: 2, color: 'black', display: 'block' }}
                
              >
                {page}
              </Button>
            ))}
          </Box>
         {localStorage.getItem('userId')?<LoginOptions/>:null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}



export default Navbar





// export class Navbar extends Component {
//   render() {
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light ">
//       <div className="container-fluid">
//           <i><img width="80" src={logo}/></i>
//         <a className="navbar-brand" href="#">NIT Kurukshetra<p>Hostel Management System</p></a>
        
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="#">Home</a>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to='/'>Contacts</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to='/'>Hostel</Link>
//             </li>             
           
//           </ul>
//         </div>
//       </div>
//     </nav>
//     )
//   }
// }
