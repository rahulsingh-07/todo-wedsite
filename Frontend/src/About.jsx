import React from 'react'
import {useAuth} from './store/auth'



export default function About() {

  const{user}=useAuth()
  return (
    <div>
      <div className='grid grid-cols-2 py-8 px-40 gap-5'>
        <div className=''>
          <h1>Hi {user.name}</h1>
          <h1 className='text-3xl text-blue-700 font-serif font-bold'>Why Choose Us?</h1>
          <p className='pr-8 text-xl leading-relaxed '>
          The To-Do List Application is a versatile and user-friendly task management 
          tool designed to help individuals organize and prioritize their daily activities. 
          Built using modern web technologies, this application provides an intuitive interface
           where users can easily add, edit, delete, and categorize their tasks. 
           Key features include due dates, reminders, and the ability to mark tasks as completed.
            The responsive design ensures seamless usage across various devices, from desktops to smartphones.
             This project showcases proficiency in frontend development with React, state management, 
             and integrating third-party libraries to enhance functionality and user experience.
              By implementing a to-do list application, the aim is to offer a practical solution 
              for personal productivity and time management.
          </p>
        </div>
        <div className=''>
          <img src="https://servodrive.ba/assets/img/about/about-4/about-img.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
