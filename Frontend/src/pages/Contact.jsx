import React, { useState,useEffect } from 'react'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify'


export default function Services() {

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
});

const { user } = useAuth();

useEffect(() => {
    if (user) {
        setContact({
            name: user.name,
            email: user.email,
            message: ""
        });
    }
    else {
      setContact({
        name: "",
        email: "",
        message: ""
      });
    }
}, [user]);

  const hendleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setContact({
      ...contact,
      [name]:value
    })
  }

  const hendleSubmit= async (e)=>{
    e.preventDefault()
    try {
      const response =await fetch('http://localhost:8000/api/form/contact',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
      body:JSON.stringify(contact)
      });
    
      if(response.ok){
        setContact({
         message:""
        })
        toast.success("Message send successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1 className='text-4xl  flex p-6 font-serif justify-center'>Contact Us </h1>
      <div className='grid grid-cols-2 items-center px-[4vw] py-3 gap-5'>
        {/* img */}
        <div><img src="https://ticketgenie.in/Image/ContactUs/contact.svg" alt="" /></div>
        {/* form */}
        <div>
       <form onSubmit={hendleSubmit} className='flex flex-col items-center gap-5' >
          <div>
            <label className='block' htmlFor="name">Username</label>
            <input className='p-3 rounded-lg w-[400px] border'
            type="text"
            name='name'
            value={contact.name}
            placeholder='username'
            onChange={hendleInput}
            required
            autoComplete='off'
             />
          </div>
          <div>
            <label className='block' htmlFor="email">Email</label>
            <input className='p-3 rounded-lg w-[400px] border'
            type="email"
            name='email'
            value={contact.email}
            placeholder='email'
            onChange={hendleInput}
            required
            autoComplete='off'
             />
          </div>
          <div>
            <label className='block' htmlFor="message">Message</label>
            <textarea className='p-3 rounded-lg w-[400px] border h-[200px]'
            name="message" 
            id="message"
            value={contact.message}
            placeholder='message'
            onChange={hendleInput}
            required
            autoComplete='off'></textarea>
          </div>
          <br />
            <button type='submit' className='p-2 px-4 border bg-red-400 rounded-full'>Submit</button>
       </form>
        </div>
      </div>
    </div>
  )
}
