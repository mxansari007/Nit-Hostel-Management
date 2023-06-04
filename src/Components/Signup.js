import React, { Component } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import './Signup.css';


const Signup = () => {
  const form = useForm({
    defaultValues: {
      rollno: "",
      firstname: "",
      lastname: "",
      year: "",
      department: "",
      password: "",
      confirmpass: "",
      email: "",
    },
    mode: 'all'
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const onSubmit = (data) => {
    console.log('submitted', data);
  }
  return (
    <main>
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="main-form" noValidate>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">

                <label for="rollno">Roll Number</label>
                <input type="text" className="form-control" id="Rollno" maxLength={10} placeholder="Enter Your Roll Number"  {...register("rollno", {
                  required: { value: true, message: 'rollno is required' },
                  pattern: {
                    value:
                      /\d+$/,
                    message: "Enter Numeric values only",
                  },
                })} />
                <p>{errors.rollno?.message}</p>
              </div>
              <div className="form-group">

                <label for="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="Enter Your First Name" {...register("firstname", { required: { value: true, message: 'FirstName is required' } })} />
                <p>{errors.firstname?.message}</p>
              </div>
              <div className="form-group">

                <label for="year">Year of Study</label>
                <input type="text" className="form-control" id="year" maxLength={4} placeholder="Enter Your Year of Study" {...register("year", {
                  required: { value: true, message: 'year is required' },
                  pattern: {
                    value:
                      /\d+$/,
                    message: "Enter Numeric values only",
                  },
                })} />
                <p>{errors.year?.message}</p>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...register("password", { required: { value: true, message: 'password is required' } })} />
                <p>{errors.password?.message}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">

                <label for="department">Department</label>
                <input type="text" className="form-control" id="department" placeholder="Enter Your Department" {...register("department", { required: { value: true, message: 'department is required' } })} />
                <p>{errors.department?.message}</p>
              </div>

              <div className="form-group">

                <label for="firstName">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Enter Your Last Name" {...register("lastname", { required: { value: true, message: 'Lastname is required' } })} />
                <p>{errors.lastname?.message}</p>
              </div>
              <div className="form-group">

                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Your Email Address" {...register("email", {
                  required: { value: true, message: 'Email is required' },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid Email Address",
                  }
                })} />
                <p>{errors.email?.message}</p>

              </div>
              <div className="form-group">

                <label for="confirmPass">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPass" placeholder="Confrim Your Password" {...register("confirmpass", { required: { value: true, message: 'required' } })} />
                <p>{errors.confirmpass?.message}</p>
              </div>

            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6">
              <button disabled={!isDirty || !isValid || !isSubmitting} type="submit" className="btn btn-primary ">Submit</button>
            </div>
            <div className="col-lg-6">
              <button onClick={() => reset()} type="button" className="btn btn-primary mx-auto">Reset</button>
            </div>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </main>
  );
};
export default Signup