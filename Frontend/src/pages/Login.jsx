import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify'

export default function Login() {

 const [user,setUser]=useState({
    email:"",
    password:""
 });

 const navigate=useNavigate()
 const {storeTokenInLS}=useAuth()
 //handle Input
 const handleInput=(e)=>{
 let name=e.target.name;
 let value=e.target.value;

 setUser({
    ...user,
    [name]:value
 })
 }

 //handle submission
 const handleSubmit= async (e)=>{
    e.preventDefault();
  try {
    const response= await fetch('http://localhost:8000/api/auth/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    });

    const res_data= await response.json()

    if(response.ok){
      storeTokenInLS(res_data.token)
      setUser({email:"",password:""})
      navigate('/')
      toast.success('successfully login')
    
      //to save token
      //console.log("res from server",res_data)
     
      
     
    }
    else{
      toast.error(res_data.message)
    }
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <div className='grid grid-cols-2  justify-center px-[4vw] py-3 gap-5'>
      {/* image section */}
      <div>
        <img className='h-[80vh]' src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png?f=webp" alt="" />
      </div>

      {/* form section */}
      <div>
        <div className='text-4xl  font-mono font-bold flex justify-center mt-5 mb-[6vw]'>Login</div>
        <div>
        <form onSubmit={handleSubmit}
         className='flex flex-col items-center gap-5' >
            <div>
                <label className='block' htmlFor="email">Email</label>
                <input className='p-3 rounded-lg w-[400px] border'
                type="email"
                name='email'
                placeholder='enter your email'
                value={user.email}
                onChange={handleInput}             
                required
                autoComplete='off'
                 />
            </div>
            <div>
                <label className='block' htmlFor="password">Password</label>
                <input className='p-3 rounded-lg w-[400px] border'
                type="password"
                name='password'
                value={user.password}
                onChange={handleInput}
                placeholder='enter your password'
                required
                autoComplete='off'
                 />
            </div>
            <br />
            <button type='submit' className='p-2 px-4 border bg-red-400 rounded-full'>Login</button>
        </form>
      </div>
      </div>
     
    </div>
  )
}
