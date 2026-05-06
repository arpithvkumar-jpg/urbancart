import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-blue-600 px-4 shadow-md sm:px-8'>
      <div className='flex items-center gap-4'>
        <Link to='/' className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <span className='text-2xl font-black tracking-tight text-white'>Urban</span>
              <span className='text-2xl font-black tracking-tight text-blue-200'>Cart</span>
            </div>
            <span className='hidden text-[10px] font-bold uppercase tracking-widest text-blue-200 sm:block mt-1'>Seller Hub</span>
        </Link>
      </div>
      
      <div className='flex items-center gap-4'>
        <div className='hidden flex-col items-end sm:flex'>
          <span className='text-sm font-semibold text-white'>Admin Account</span>
          <span className='text-xs text-blue-200'>Dashboard Access</span>
        </div>
        <div className='h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center border-2 border-blue-400/50 shadow-sm'>
          <span className='text-sm font-bold text-white'>A</span>
        </div>
        <div className='h-6 w-px bg-blue-400/50 mx-1'></div>
        <button 
          onClick={()=>setToken('')} 
          className='rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar