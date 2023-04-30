import React, { Component } from 'react'
import { Link,Router } from 'react-router-dom'
import './Studentlogin.css'

export class Adminlogin extends Component {
  render() {
    return (
        <main class="form-signin">
        <form>
          
          <h1 class="h3 mb-3 fw-normal">Admin Login</h1>
      
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput"  maxlength="8" placeholder="32211211"/>
            <label for="floatingInput">Email Id</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>
      
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          
        </form>
  
        <p className='sign-up'>Login as <Link to='student'>Student</Link>/ <Link to='/signup'>Sign Up</Link></p>
      
      </main>
      
    )
  }
}

export default Adminlogin