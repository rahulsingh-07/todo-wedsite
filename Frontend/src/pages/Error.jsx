import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <div className='flex flex-col gap-5 justify-center items-center px-[4vw] py-3'> 
    <div className='text-9xl font-serif'>
        404
    </div>
    <div>
     Oops! It seems like the page you're trying to access doesn't exist.
     if you believe there's an issue, feel free to report it, and we'll
     look into it
    </div>
    <div>
        <NavLink className='p-1 px-4 border bg-red-400 rounded-full' to='/'>return home</NavLink>
        <NavLink className='p-1 px-4 border bg-red-400 rounded-full' to='/contact'>report problem</NavLink>
    </div>
      </div>
    </div>
  )
}
