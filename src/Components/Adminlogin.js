import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import './Studentlogin.css'

const Adminlogin = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onTouched'
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const onSubmit = (data) => {
    console.log('submitted', data);
  }
  return (
    <main class="form-signin">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <h1 class="h3 mb-3 fw-normal">Admin Login</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="32211211" {...register("email", {
            required: { value: true, message: 'email is required' },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid Email Address",
            },
          })} />
          <label for="floatingInput">Email Id</label>
          <p>{errors.email?.message}</p>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" {...register("password", { required: { value: true, message: 'password is required' } })} />
          <label for="floatingPassword">Password</label>
          <p>{errors.password?.message}</p>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button disabled={!isDirty || !isValid || !isSubmitting} class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      </form>
      <DevTool control={control} />
      <p className='sign-up'>Login as <Link to='student'>Student</Link>/ <Link to='/signup'>Sign Up</Link></p>

    </main>

  )
};
export default Adminlogin