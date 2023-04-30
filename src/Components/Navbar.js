import React, { Component } from 'react'
import logo from './images/logo.png'
import './Navbar.css'
import {Link} from 'react-router-dom';


export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
          <i><img width="80" src={logo}/></i>
        <a className="navbar-brand" href="#">NIT Kurukshetra<p>Hostel Management System</p></a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/'>Contacts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/'>Hostel</Link>
            </li>             
           
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

export default Navbar