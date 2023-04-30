import React, { Component } from 'react'
import './Signup.css';

export class Signup extends Component {

constructor(props){
  super(props);
  this.state = {
          rollno: '',
          firstName:'',
          lastName:'',
          mobileNumber: '',
          department:'',
          year:'',
          password:'',
          confirmPass:''
  }
}


handleSubmit = (event)=>{
  
}



  render() {
    return (
        <main>
        <div className="container">
    <h1>Sign Up</h1>
    <form onSubmit={this.handleSubmit} className="main-form">
        <div className="row">
       <div className="col-lg-6">
        <div className="form-group">
            
          <label for="rollno">Roll Number</label>
          <input type="number" className="form-control" id="Rollno" name="rollno" placeholder="Enter Your Roll Number"/>
          
        </div>
        <div className="form-group">
            
            <label for="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter Your First Name"/>
            
          </div>
          <div className="form-group">
            
            <label for="firstName">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter Your Last Name"/>
            
          </div>
          <div className="form-group">
            
            <label for="mobileNumber">Mobile Number</label>
            <input type="number" className="form-control" id="mobileNumber" name="mobileNumber" placeholder="Enter Your Mobile Number"/>
            
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            
            <label for="department">Department</label>
            <input type="text" className="form-control" id="department" name="department" placeholder="Enter Your Department"/>
            
          </div>
          <div className="form-group">
            
            <label for="year">Year of Study</label>
            <input type="number" className="form-control" id="year" name="year" placeholder="Enter Your Year of Study"/>
            
          </div>
          
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group">
            
            <label for="confirmPass">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPass" name="confirmPass" placeholder="Confrim Your Password"/>
            
          </div>

    </div>
    </div>
    <div className="d-grid mt-4 col-4 mx-auto">
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
</main>
    )
  }
}

export default Signup