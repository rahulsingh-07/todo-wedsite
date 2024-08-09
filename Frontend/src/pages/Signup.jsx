import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify'

export default function Signup() {

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
  });

  //navigate
  const navigate=useNavigate();
 const {storeTokenInLS}=useAuth();
// handling the input values
  const handleInput=(e)=>{
  // console.log(e)
   let name=e.target.name;
   let value=e.target.value;

   setUser({
    ...user,//to store previous value
    [name]:value,
   })
  }
//handle submission
const handleSubmit=async (e)=>{
e.preventDefault();
//console.log(user)
// To fetch data from frontend and store in baskend
try {
  const response = await fetch('http://localhost:8000/api/auth/signup',{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(user)
   });
   //to empty again
   const res_data=await response.json()

 if(response.ok){
  storeTokenInLS(res_data.token)
  setUser({
    name:"",
    email:"",
    password:""
  })
  storeTokenInLS(res_data.token)
  toast.success(res_data.message)
  navigate('/login')
  }
  else{
    toast.error(res_data.message)
  }
} catch (error) {
  console.log("register",error)
}
 
}


  return (
    <div className='grid grid-cols-2 px-[4vw] py-3  justify-center gap-5 items-center '>
      {/* imgae section */}
      <div className=''>
        <img className='w-[35vw]' src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-4922762-4097209.png?f=webp" alt="" />
      </div>

      {/* form section */}
      <div className=' '>
        {/* header */}
        <div className='text-4xl font-mono font-bold flex justify-center'> Registretion From</div>
        <br />
        {/* form */}
        <div className=' p-4'>
          <form onSubmit={handleSubmit}
           className='flex flex-col gap-5 items-center'>
          <div>
            <label className='block' htmlFor="name">username</label>

            <input className='p-3 rounded-lg w-[400px] border' type="name"
                    name='name'
                    placeholder='username'
                    id='name'
                    required
                    value={user.name}
                    onChange={handleInput}
                    autoComplete='off' />
           </div>
           <div>
            <label className='block' htmlFor="email">email</label>
            <input className='p-3  rounded-lg w-[400px] border' type="email"
                    name='email'
                    placeholder='email'
                    id='email'
                    value={user.email}
                    onChange={handleInput}
                    required
                    autoComplete='off' />
           </div>
           <div>
            <label className='block' htmlFor="password">password</label>
            <input className='p-3  rounded-lg w-[400px] border' type="password"
                    name='password'
                    placeholder='enter your password'
                    id='password'
                    value={user.password}
                    onChange={handleInput}
                    required
                    autoComplete='off' />
           </div>
           <br />
           <button type='submit' className='p-2 border bg-red-400 rounded-full'>Register here</button>
          </form>
        </div>
      </div>
    </div>
  )
}
