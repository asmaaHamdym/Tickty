import React, {useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa'
import tickety from '../assets/tickety.png'
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center py-4 md:px-14 text-black'>
      <div className='px-2 ml-8'>
        <img src={tickety} alt ='Logo Icon'></img>
      </div>

      {/* Desktop Menu */}
      <ul className='hidden md:flex'>
        <li className='hover:text-[#1B0E16] text-[#806B77] mr-14'><Link  to="/home" smooth={true} duration={500}>Home</Link></li>
        <li className='hover:text-[#1B0E16] text-[#806B77] mr-14'><Link  to="/events" smooth={true} duration={500}>Events</Link></li>
        <li className='hover:text-[#1B0E16] text-[#806B77]'><Link  to="/faqs" smooth={true} duration={500}>FAQs</Link></li>
      </ul>

      <div className='hidden md:flex'>
        <div className='mr-8'>
          <button className='px-4 py-2 bg-white text-[#412234] font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#412234] focus:ring-opacity-75 border-[#412234] border-2'> Contact Us</button>
        </div>
      
        <div>
          <button className= 'px-4 py-2 bg-[#412234] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75'> Create your next Event</button>
        </div>
        
      </div>
      
      
      {/* Hamburger Menu */}
      <div onClick = {handleClick} className='md:hidden z-10 px-2 cursor-pointer'>
        {!nav ? <FaBars size={35}/> : <FaTimes size={35}/>}
      </div>

      {/* Hamburger Menu Items */}
      <ul className = {!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#2E4052] flex flex-col justify-center items-center'}>
        <li className='hover:text-[#1B0E16] text-[#806B77] py-6 text-4xl'><Link onClick = {handleClick} to="/" smooth={true} duration={500}>Home</Link></li>
        <li className='hover:text-[#1B0E16] text-[#806B77] py-6 text-4xl'><Link onClick = {handleClick} to="/events" smooth={true} duration={500}>Events</Link></li>
        <li className='hover:text-[#1B0E16] text-[#806B77] py-6 text-4xl'><Link onClick = {handleClick} to="/faqs" smooth={true} duration={500}>FAQs</Link></li>
        <li className='hover:text-[#1B0E16] text-[#806B77] py-6 text-4xl'><Link onClick = {handleClick} to="/contact" smooth={true} duration={500}>Contact Us</Link></li>
      </ul>
          
    </div>
  )
}

export default Navbar;