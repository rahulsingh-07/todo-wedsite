import React from 'react'
import Logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function Navbar() {

    const { isLoggedIn } = useAuth();
    return (
        <div>
            <div className='flex justify-around px-6 bg-red-100 items-center'>
                {/* logo */}
                <div className=''>
                    <img className='h-[70px]' src={Logo} alt="" />
                </div>
                {/* routes */}
                <div>
                    <ul className='flex gap-10 font-mono text-2xl '>
                        <li className='border-b-2 border-transparent hover:border-b-2 hover:border-black'>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className='border-b-2 border-transparent hover:border-b-2 hover:border-black'>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li className='border-b-2 border-transparent hover:border-b-2 hover:border-black'>
                            <NavLink to="/contact">Contact us</NavLink>
                        </li >
                        {isLoggedIn ? (
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-black'>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                        ) : (
                            <>
                                <li className='border-b-2 border-transparent hover:border-b-2 hover:border-black'>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li className='border-b-2 border-transparent hover:border-b-2 hover:border-black'>
                                    <NavLink to="/signup">Signup</NavLink>
                                </li></>
                        )}


                    </ul>
                </div>
            </div>
        </div>
    )
}
